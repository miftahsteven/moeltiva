'use client';

import { useState, useEffect } from 'react';
import adminApi from '@/services/adminApi';

export default function AdminFindUsPage() {
  const [sectionData, setSectionData] = useState({ title: '', subtitle: '' });
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPlatform, setEditingPlatform] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  const platformOptions = ['Instagram', 'Tokopedia', 'Shopee', 'TikTok', 'Lazada', 'Facebook'];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resp = await adminApi.get('/find-us');
      setSectionData({ title: resp.data.title, subtitle: resp.data.subtitle });
      setPlatforms(resp.data.platforms || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSection = async (e) => {
    e.preventDefault();
    try {
      await adminApi.put('/find-us/section', sectionData);
      setMessage({ type: 'success', text: 'Section header updated!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Update failed.' });
    }
  };

  const handleSavePlatform = async (e) => {
    e.preventDefault();
    try {
      await adminApi.post('/find-us/platforms', editingPlatform);
      setEditingPlatform(null);
      fetchData();
      setMessage({ type: 'success', text: 'Platform saved!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Save failed.' });
    }
  };

  const handleDeletePlatform = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await adminApi.delete(`/find-us/platforms/${id}`);
      fetchData();
      setMessage({ type: 'success', text: 'Platform deleted!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Delete failed.' });
    }
  };

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div>
      <div className="admin-card">
        <h3>Section Header</h3>
        <form onSubmit={handleSaveSection} style={{ marginTop: '20px' }}>
          <div className="admin-form-group">
            <label>Title</label>
            <input type="text" className="admin-input" value={sectionData.title} onChange={(e) => setSectionData({ ...sectionData, title: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label>Subtitle</label>
            <textarea className="admin-textarea" value={sectionData.subtitle} onChange={(e) => setSectionData({ ...sectionData, subtitle: e.target.value })}></textarea>
          </div>
          <button type="submit" className="admin-btn-primary">Update Header</button>
        </form>
      </div>

      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>Where to Find Platforms</h3>
          <button 
            className="admin-btn-primary" 
            onClick={() => setEditingPlatform({ platform: 'Tokopedia', title: '', description: '', link: '#', imageUrl: '' })}
          >
            + Add New Platform
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {platforms.map((p) => (
            <div key={p.id} className="admin-card" style={{ marginBottom: '0', border: '1px solid #ebedf3', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span style={{ 
                  background: '#eaf4dc', 
                  padding: '4px 12px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  fontWeight: '600',
                  color: '#215737'
                }}>
                  {p.platform}
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => setEditingPlatform(p)}>✏️</button>
                  <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleDeletePlatform(p.id)}>🗑️</button>
                </div>
              </div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>{p.title}</h4>
              <p style={{ color: '#7e8299', fontSize: '0.9rem', marginBottom: '15px' }}>{p.description}</p>
              <a href={p.link} target="_blank" style={{ fontSize: '0.85rem', color: '#6993ff', textDecoration: 'none' }}>{p.link}</a>
            </div>
          ))}
        </div>
      </div>

      {editingPlatform && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyCenter: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="admin-card" style={{ maxWidth: '500px', width: '100%', margin: 'auto' }}>
            <h3>{editingPlatform.id ? 'Edit' : 'Add'} Platform</h3>
            <form onSubmit={handleSavePlatform} style={{ marginTop: '20px' }}>
              <div className="admin-form-group">
                <label>Platform</label>
                <select 
                  className="admin-select"
                  value={editingPlatform.platform}
                  onChange={(e) => setEditingPlatform({ ...editingPlatform, platform: e.target.value })}
                >
                  {platformOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div className="admin-form-group">
                <label>Title</label>
                <input type="text" className="admin-input" value={editingPlatform.title} onChange={(e) => setEditingPlatform({ ...editingPlatform, title: e.target.value })} required />
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <textarea className="admin-textarea" value={editingPlatform.description} onChange={(e) => setEditingPlatform({ ...editingPlatform, description: e.target.value })} required></textarea>
              </div>
              <div className="admin-form-group">
                <label>Link URL</label>
                <input type="text" className="admin-input" value={editingPlatform.link} onChange={(e) => setEditingPlatform({ ...editingPlatform, link: e.target.value })} required />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="admin-btn-primary">Save Platform</button>
                <button type="button" className="admin-btn-primary" style={{ background: '#7e8299' }} onClick={() => setEditingPlatform(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {message.text && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', padding: '15px 25px', borderRadius: '8px', zIndex: 2000, background: message.type === 'success' ? '#1da750' : '#f64e60', color: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          {message.text}
        </div>
      )}
    </div>
  );
}
