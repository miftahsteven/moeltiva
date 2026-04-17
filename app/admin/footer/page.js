'use client';

import { useState, useEffect } from 'react';
import adminApi from '@/services/adminApi';

export default function AdminFooterPage() {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    ctaText: '',
    ctaLink: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const resp = await adminApi.get('/footer');
        if (resp.data) {
          setFormData(resp.data);
        }
      } catch (error) {
        console.error('Error fetching footer:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFooter();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      await adminApi.put('/footer', formData);
      setMessage({ type: 'success', text: 'Footer updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update footer.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div className="admin-card">
      <form onSubmit={handleSave}>
        <div className="admin-form-group">
          <label>Footer Title</label>
          <input type="text" name="title" className="admin-input" value={formData.title} onChange={handleChange} />
        </div>
        <div className="admin-form-group">
          <label>Subtitle</label>
          <input type="text" name="subtitle" className="admin-input" value={formData.subtitle} onChange={handleChange} />
        </div>
        <div className="admin-form-group">
          <label>Description</label>
          <textarea name="description" className="admin-textarea" rows="4" value={formData.description} onChange={handleChange}></textarea>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="admin-form-group">
            <label>CTA Button Text</label>
            <input type="text" name="ctaText" className="admin-input" value={formData.ctaText} onChange={handleChange} />
          </div>
          <div className="admin-form-group">
            <label>CTA Button Link</label>
            <input type="text" name="ctaLink" className="admin-input" value={formData.ctaLink} onChange={handleChange} />
          </div>
        </div>

        {message.text && (
          <div style={{ 
            padding: '15px', 
            borderRadius: '8px', 
            margin: '20px 0',
            background: message.type === 'success' ? '#e1fcf0' : '#fff5f8',
            color: message.type === 'success' ? '#1da750' : '#f64e60'
          }}>
            {message.text}
          </div>
        )}

        <button type="submit" className="admin-btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Update Footer'}
        </button>
      </form>
    </div>
  );
}
