'use client';

import { useState, useEffect } from 'react';
import adminApi from '@/services/adminApi';

export default function AdminIngredientsPage() {
  const [sectionData, setSectionData] = useState({ title: '', subtitle: '' });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resp = await adminApi.get('/ingredients');
      setSectionData({ title: resp.data.title, subtitle: resp.data.subtitle });
      setItems(resp.data.items || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSection = async (e) => {
    e.preventDefault();
    try {
      await adminApi.put('/ingredients/section', sectionData);
      setMessage({ type: 'success', text: 'Section header updated!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Update failed.' });
    }
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    try {
      await adminApi.post('/ingredients/items', editingItem);
      setEditingItem(null);
      fetchData();
      setMessage({ type: 'success', text: 'Item saved!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Save failed.' });
    }
  };

  const handleDeleteItem = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await adminApi.delete(`/ingredients/items/${id}`);
      fetchData();
      setMessage({ type: 'success', text: 'Item deleted!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Delete failed.' });
    }
  };

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div>
      {/* Section Header */}
      <div className="admin-card">
        <h3>Section Header</h3>
        <form onSubmit={handleSaveSection} style={{ marginTop: '20px' }}>
          <div className="admin-form-group">
            <label>Title</label>
            <input 
              type="text" 
              className="admin-input" 
              value={sectionData.title}
              onChange={(e) => setSectionData({ ...sectionData, title: e.target.value })}
            />
          </div>
          <div className="admin-form-group">
            <label>Subtitle</label>
            <textarea 
              className="admin-textarea" 
              value={sectionData.subtitle}
              onChange={(e) => setSectionData({ ...sectionData, subtitle: e.target.value })}
            ></textarea>
          </div>
          <button type="submit" className="admin-btn-primary">Update Header</button>
        </form>
      </div>

      {/* Items List */}
      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>Ingredient Items</h3>
          <button 
            className="admin-btn-primary" 
            onClick={() => setEditingItem({ name: '', description: '', icon: '🥑', link: '#' })}
          >
            + Add New Item
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #f4f5f7' }}>
              <th style={{ padding: '12px' }}>Icon</th>
              <th style={{ padding: '12px' }}>Name</th>
              <th style={{ padding: '12px' }}>Description</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f4f5f7' }}>
                <td style={{ padding: '12px', fontSize: '1.5rem' }}>{item.icon}</td>
                <td style={{ padding: '12px', fontWeight: '600' }}>{item.name}</td>
                <td style={{ padding: '12px', color: '#7e8299' }}>{item.description}</td>
                <td style={{ padding: '12px', display: 'flex', gap: '10px' }}>
                  <button className="admin-btn-primary" style={{ padding: '5px 12px', fontSize: '0.8rem' }} onClick={() => setEditingItem(item)}>Edit</button>
                  <button className="admin-btn-primary" style={{ padding: '5px 12px', fontSize: '0.8rem', background: '#f64e60' }} onClick={() => handleDeleteItem(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal (Simple overlay for now) */}
      {editingItem && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyCenter: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="admin-card" style={{ maxWidth: '500px', width: '100%', margin: 'auto' }}>
            <h3>{editingItem.id ? 'Edit' : 'Add'} Ingredient</h3>
            <form onSubmit={handleSaveItem} style={{ marginTop: '20px' }}>
              <div className="admin-form-group">
                <label>Icon (Emoji)</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  value={editingItem.icon}
                  onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  required
                />
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <textarea 
                  className="admin-textarea" 
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  required
                ></textarea>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="admin-btn-primary">Save Item</button>
                <button type="button" className="admin-btn-primary" style={{ background: '#7e8299' }} onClick={() => setEditingItem(null)}>Cancel</button>
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
