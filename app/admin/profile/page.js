'use client';

import { useState, useEffect } from 'react';
import adminApi from '@/services/adminApi';

export default function AdminProfilePage() {
  const [formData, setFormData] = useState({
    companyName: '',
    companyDesc: '',
    founderName: '',
    founderDesc: '',
    phone: '',
    whatsapp: '',
    address: '',
    email: '',
    logoUrl: '',
    faviconUrl: '',
    instagramUrl: '',
    tiktokUrl: '',
    tokopediaUrl: '',
    shopeeUrl: '',
    facebookUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const resp = await adminApi.get('/profile');
        if (resp.data) {
          setFormData(resp.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
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
      await adminApi.put('/profile', formData);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div className="admin-card">
      <form onSubmit={handleSave}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <section>
            <h4 style={{ marginBottom: '20px', borderBottom: '1px solid #f4f5f7', paddingBottom: '10px' }}>Company Information</h4>
            <div className="admin-form-group">
              <label>Company Name</label>
              <input type="text" name="companyName" className="admin-input" value={formData.companyName || ''} onChange={handleChange} />
            </div>
            <div className="admin-form-group">
              <label>Company Description</label>
              <textarea name="companyDesc" className="admin-textarea" rows="4" value={formData.companyDesc || ''} onChange={handleChange}></textarea>
            </div>
            <div className="admin-form-group">
              <label>Founder Name</label>
              <input type="text" name="founderName" className="admin-input" value={formData.founderName || ''} onChange={handleChange} />
            </div>
            <div className="admin-form-group">
              <label>Founder Description</label>
              <textarea name="founderDesc" className="admin-textarea" rows="3" value={formData.founderDesc || ''} onChange={handleChange}></textarea>
            </div>
          </section>

          <section>
            <h4 style={{ marginBottom: '20px', borderBottom: '1px solid #f4f5f7', paddingBottom: '10px' }}>Contact & Social</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div className="admin-form-group">
                <label>Phone</label>
                <input type="text" name="phone" className="admin-input" value={formData.phone || ''} onChange={handleChange} />
              </div>
              <div className="admin-form-group">
                <label>WhatsApp</label>
                <input type="text" name="whatsapp" className="admin-input" value={formData.whatsapp || ''} onChange={handleChange} />
              </div>
            </div>
            <div className="admin-form-group">
              <label>Email</label>
              <input type="email" name="email" className="admin-input" value={formData.email || ''} onChange={handleChange} />
            </div>
            <div className="admin-form-group">
              <label>Address</label>
              <input type="text" name="address" className="admin-input" value={formData.address || ''} onChange={handleChange} />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div className="admin-form-group">
                <label>Instagram URL</label>
                <input type="text" name="instagramUrl" className="admin-input" value={formData.instagramUrl || ''} onChange={handleChange} />
              </div>
              <div className="admin-form-group">
                <label>TikTok URL</label>
                <input type="text" name="tiktokUrl" className="admin-input" value={formData.tiktokUrl || ''} onChange={handleChange} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div className="admin-form-group">
                <label>Tokopedia URL</label>
                <input type="text" name="tokopediaUrl" className="admin-input" value={formData.tokopediaUrl || ''} onChange={handleChange} />
              </div>
              <div className="admin-form-group">
                <label>Shopee URL</label>
                <input type="text" name="shopeeUrl" className="admin-input" value={formData.shopeeUrl || ''} onChange={handleChange} />
              </div>
            </div>
          </section>
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

        <button type="submit" className="admin-btn-primary" disabled={saving} style={{ marginTop: '20px' }}>
          {saving ? 'Saving...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}
