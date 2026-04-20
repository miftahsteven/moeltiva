'use client';

import { useState, useEffect } from 'react';
import adminApi from '@/services/adminApi';

export default function AdminHeroPage() {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    imageUrl: '',
    hashtags: [],
    headerCta: '',
    buttonCta: '',
    buyButtonCta: ''
  });
  const [hashtagInput, setHashtagInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5001";

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const resp = await adminApi.get('/hero');
        if (resp.data) {
          setFormData(resp.data);
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, []);

  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    if (path.startsWith('/uploads')) return `${API_URL}${path}`;
    return path; // Existing files in /public/moeltiva-images/
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setMessage({ type: '', text: '' });
    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const resp = await adminApi.post('/upload', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData(prev => ({ ...prev, imageUrl: resp.data.url }));
      setMessage({ type: 'success', text: 'Image uploaded successfully!' });
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ type: 'error', text: 'Upload failed.' });
    } finally {
      setUploading(false);
    }
  };

  const handleAddHashtag = (e) => {
    e.preventDefault();
    if (hashtagInput && formData.hashtags.length < 5) {
      const cleanTag = hashtagInput.startsWith('#') ? hashtagInput : `#${hashtagInput}`;
      setFormData(prev => ({ ...prev, hashtags: [...prev.hashtags, cleanTag] }));
      setHashtagInput('');
    }
  };

  const removeHashtag = (index) => {
    setFormData(prev => ({
      ...prev,
      hashtags: prev.hashtags.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      await adminApi.put('/hero', formData);
      setMessage({ type: 'success', text: 'Hero data updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update hero data.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div className="admin-card">
      <form onSubmit={handleSave}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
          {/* Left Column: Image */}
          <section>
            <h4 style={{ marginBottom: '20px', borderBottom: '1px solid #f4f5f7', paddingBottom: '10px' }}>Hero Image</h4>
            <div style={{ 
              border: '2px dashed #e1e3ea', 
              padding: '20px', 
              borderRadius: '12px',
              textAlign: 'center',
              background: '#fbfbfb',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {formData.imageUrl ? (
                <div style={{ marginBottom: '15px', width: '100%' }}>
                  <img 
                    src={getImageUrl(formData.imageUrl)} 
                    alt="Hero Preview" 
                    style={{ maxWidth: '100%', maxHeight: '250px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                  />
                </div>
              ) : (
                <div style={{ color: '#a2a3b7', marginBottom: '15px' }}>No image selected</div>
              )}
              
              <input 
                type="file" 
                accept="image/*" 
                id="hero-image-upload" 
                style={{ display: 'none' }} 
                onChange={handleImageUpload}
              />
              <label 
                htmlFor="hero-image-upload" 
                className="admin-btn-primary" 
                style={{ cursor: 'pointer', display: 'inline-block' }}
              >
                {uploading ? 'Uploading...' : formData.imageUrl ? 'Change Image' : 'Upload Image'}
              </label>
              <p style={{ fontSize: '0.8rem', color: '#7e8299', marginTop: '10px' }}>
                Recommended: 1200x800px. Max: 2MB.
              </p>
            </div>
          </section>

          {/* Right Column: Key Content */}
          <section>
            <h4 style={{ marginBottom: '20px', borderBottom: '1px solid #f4f5f7', paddingBottom: '10px' }}>Key Content</h4>
            <div className="admin-form-group">
              <label>Hero Title</label>
              <input 
                type="text" 
                name="title"
                className="admin-input" 
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-group">
              <label>Subtitle</label>
              <input 
                type="text" 
                name="subtitle"
                className="admin-input" 
                value={formData.subtitle}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-group">
              <label>Description</label>
              <textarea 
                name="description"
                className="admin-textarea" 
                rows="3"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </section>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
          {/* Hashtags */}
          <section>
            <h4 style={{ marginBottom: '20px', borderBottom: '1px solid #f4f5f7', paddingBottom: '10px' }}>Hashtags (Max 5)</h4>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <input 
                type="text" 
                className="admin-input" 
                value={hashtagInput}
                onChange={(e) => setHashtagInput(e.target.value)}
                placeholder="e.g. HealthyLife"
                onKeyPress={(e) => e.key === 'Enter' && handleAddHashtag(e)}
                disabled={formData.hashtags.length >= 5}
              />
              <button 
                type="button" 
                className="admin-btn-primary" 
                onClick={handleAddHashtag}
                disabled={formData.hashtags.length >= 5}
              >
                Add
              </button>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {formData.hashtags.map((tag, idx) => (
                <span key={idx} style={{ background: '#eaf4dc', padding: '6px 15px', borderRadius: '20px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #d4e7b8' }}>
                  {tag}
                  <button type="button" onClick={() => removeHashtag(idx)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#f64e60', fontWeight: 'bold' }}>✕</button>
                </span>
              ))}
            </div>
          </section>

          {/* CTA Buttons */}
          <section>
            <h4 style={{ marginBottom: '20px', borderBottom: '1px solid #f4f5f7', paddingBottom: '10px' }}>Call to Actions</h4>
            <div className="admin-form-group">
              <label>Header Badge Text</label>
              <input type="text" name="headerCta" className="admin-input" value={formData.headerCta} onChange={handleChange} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div className="admin-form-group">
                <label>Learn More Label</label>
                <input type="text" name="buttonCta" className="admin-input" value={formData.buttonCta} onChange={handleChange} />
              </div>
              <div className="admin-form-group">
                <label>Buy Now Label</label>
                <input type="text" name="buyButtonCta" className="admin-input" value={formData.buyButtonCta} onChange={handleChange} />
              </div>
            </div>
          </section>
        </div>

        {message.text && (
          <div style={{ 
            padding: '15px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            background: message.type === 'success' ? '#e1fcf0' : '#fff5f8',
            color: message.type === 'success' ? '#1da750' : '#f64e60',
            border: `1px solid ${message.type === 'success' ? '#1da750' : '#f64e60'}`
          }}>
            {message.text}
          </div>
        )}

        <div style={{ borderTop: '1px solid #f4f5f7', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="admin-btn-primary" disabled={saving || uploading} style={{ padding: '12px 40px', fontSize: '1rem' }}>
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
