'use client';

import { useState, useEffect } from 'react';
import adminApi from '@/services/adminApi';

export default function AdminProductPage() {
  const [sectionData, setSectionData] = useState({ title: '', subtitle: '', imageUrl: '', quote: '', description: '' });
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStat, setEditingStat] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resp = await adminApi.get('/products');
      setSectionData({ 
        title: resp.data.title, 
        subtitle: resp.data.subtitle,
        imageUrl: resp.data.imageUrl,
        quote: resp.data.quote,
        description: resp.data.description
      });
      setStats(resp.data.stats || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSection = async (e) => {
    e.preventDefault();
    try {
      await adminApi.put('/products/section', sectionData);
      setMessage({ type: 'success', text: 'Product section updated!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Update failed.' });
    }
  };

  const handleSaveStat = async (e) => {
    e.preventDefault();
    try {
      await adminApi.post('/products/stats', editingStat);
      setEditingStat(null);
      fetchData();
      setMessage({ type: 'success', text: 'Stat saved!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Save failed.' });
    }
  };

  const handleDeleteStat = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await adminApi.delete(`/products/stats/${id}`);
      fetchData();
      setMessage({ type: 'success', text: 'Stat deleted!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Delete failed.' });
    }
  };

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div>
      <div className="admin-card">
        <h3>Product Details & Story</h3>
        <form onSubmit={handleSaveSection} style={{ marginTop: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="admin-form-group">
              <label>Title</label>
              <input type="text" className="admin-input" value={sectionData.title} onChange={(e) => setSectionData({ ...sectionData, title: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label>Subtitle</label>
              <input type="text" className="admin-input" value={sectionData.subtitle} onChange={(e) => setSectionData({ ...sectionData, subtitle: e.target.value })} />
            </div>
          </div>
          <div className="admin-form-group">
            <label>Quote</label>
            <textarea className="admin-textarea" rows="2" value={sectionData.quote} onChange={(e) => setSectionData({ ...sectionData, quote: e.target.value })}></textarea>
          </div>
          <div className="admin-form-group">
            <label>Large Description</label>
            <textarea className="admin-textarea" rows="3" value={sectionData.description} onChange={(e) => setSectionData({ ...sectionData, description: e.target.value })}></textarea>
          </div>
          <button type="submit" className="admin-btn-primary">Update Section</button>
        </form>
      </div>

      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>Product Statistics</h3>
          <button 
            className="admin-btn-primary" 
            onClick={() => setEditingStat({ value: '', unit: '', label: '' })}
          >
            + Add New Stat
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #f4f5f7' }}>
              <th style={{ padding: '12px' }}>Value</th>
              <th style={{ padding: '12px' }}>Unit</th>
              <th style={{ padding: '12px' }}>Label</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat) => (
              <tr key={stat.id} style={{ borderBottom: '1px solid #f4f5f7' }}>
                <td style={{ padding: '12px', fontWeight: '700', fontSize: '1.2rem' }}>{stat.value}</td>
                <td style={{ padding: '12px' }}>{stat.unit}</td>
                <td style={{ padding: '12px', color: '#7e8299' }}>{stat.label}</td>
                <td style={{ padding: '12px', display: 'flex', gap: '10px' }}>
                  <button className="admin-btn-primary" style={{ padding: '5px 12px', fontSize: '0.8rem' }} onClick={() => setEditingStat(stat)}>Edit</button>
                  <button className="admin-btn-primary" style={{ padding: '5px 12px', fontSize: '0.8rem', background: '#f64e60' }} onClick={() => handleDeleteStat(stat.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingStat && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyCenter: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="admin-card" style={{ maxWidth: '500px', width: '100%', margin: 'auto' }}>
            <h3>{editingStat.id ? 'Edit' : 'Add'} Stat</h3>
            <form onSubmit={handleSaveStat} style={{ marginTop: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="admin-form-group">
                  <label>Value</label>
                  <input type="text" className="admin-input" value={editingStat.value} onChange={(e) => setEditingStat({ ...editingStat, value: e.target.value })} required />
                </div>
                <div className="admin-form-group">
                  <label>Unit</label>
                  <input type="text" className="admin-input" value={editingStat.unit} onChange={(e) => setEditingStat({ ...editingStat, unit: e.target.value })} />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Label</label>
                <input type="text" className="admin-input" value={editingStat.label} onChange={(e) => setEditingStat({ ...editingStat, label: e.target.value })} required />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="admin-btn-primary">Save Stat</button>
                <button type="button" className="admin-btn-primary" style={{ background: '#7e8299' }} onClick={() => setEditingStat(null)}>Cancel</button>
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
