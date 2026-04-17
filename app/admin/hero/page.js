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
  const [message, setMessage] = useState({ type: '', text: '' });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddHashtag = (e) => {
    e.preventDefault();
    if (hashtagInput && formData.hashtags.length < 5) {
      setFormData(prev => ({ ...prev, hashtags: [...prev.hashtags, hashtagInput] }));
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
        <div className="admin-form-group">
          <label>Hero Title</label>
          <input 
            type="text" 
            name="title"
            className="admin-input" 
            value={formData.title}
            onChange={handleChange}
            placeholder="Moeltiva Easy healthy, Glow Naturally."
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

        <div className="admin-form-group">
          <label>Hashtags (Max 5)</label>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input 
              type="text" 
              className="admin-input" 
              value={hashtagInput}
              onChange={(e) => setHashtagInput(e.target.value)}
              placeholder="e.g. #HealthyLife"
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
              <span key={idx} style={{ background: '#eaf4dc', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {tag}
                <button type="button" onClick={() => removeHashtag(idx)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#f64e60' }}>✕</button>
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
          <div className="admin-form-group">
            <label>Header CTA Badge</label>
            <input 
              type="text" 
              name="headerCta"
              className="admin-input" 
              value={formData.headerCta}
              onChange={handleChange}
            />
          </div>
          <div className="admin-form-group">
            <label>Learn More CTA</label>
            <input 
              type="text" 
              name="buttonCta"
              className="admin-input" 
              value={formData.buttonCta}
              onChange={handleChange}
            />
          </div>
          <div className="admin-form-group">
            <label>Buy Now CTA</label>
            <input 
              type="text" 
              name="buyButtonCta"
              className="admin-input" 
              value={formData.buyButtonCta}
              onChange={handleChange}
            />
          </div>
        </div>

        {message.text && (
          <div style={{ 
            padding: '15px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            background: message.type === 'success' ? '#e1fcf0' : '#fff5f8',
            color: message.type === 'success' ? '#1da750' : '#f64e60'
          }}>
            {message.text}
          </div>
        )}

        <button type="submit" className="admin-btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
