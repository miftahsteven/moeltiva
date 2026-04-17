'use client';

import { useState, useEffect } from 'react';
import adminApi from '@/services/adminApi';

export default function AdminFaqPage() {
  const [sectionData, setSectionData] = useState({ title: '', subtitle: '' });
  const [upgrades, setUpgrades] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUpgrade, setEditingUpgrade] = useState(null);
  const [editingFaq, setEditingFaq] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resp = await adminApi.get('/faq');
      setSectionData({ title: resp.data.title, subtitle: resp.data.subtitle });
      setUpgrades(resp.data.upgrades || []);
      setFaqs(resp.data.faqs || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSection = async (e) => {
    e.preventDefault();
    try {
      await adminApi.put('/faq/section', sectionData);
      setMessage({ type: 'success', text: 'FAQ header updated!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Update failed.' });
    }
  };

  const handleSaveUpgrade = async (e) => {
    e.preventDefault();
    try {
      await adminApi.post('/faq/upgrades', editingUpgrade);
      setEditingUpgrade(null);
      fetchData();
      setMessage({ type: 'success', text: 'Upgrade item saved!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Save failed.' });
    }
  };

  const handleSaveFaq = async (e) => {
    e.preventDefault();
    try {
      await adminApi.post('/faq/faqs', editingFaq);
      setEditingFaq(null);
      fetchData();
      setMessage({ type: 'success', text: 'FAQ item saved!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Save failed.' });
    }
  };

  const handleDeleteUpgrade = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await adminApi.delete(`/faq/upgrades/${id}`);
      fetchData();
      setMessage({ type: 'success', text: 'Upgrade item deleted!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Delete failed.' });
    }
  };

  const handleDeleteFaq = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await adminApi.delete(`/faq/faqs/${id}`);
      fetchData();
      setMessage({ type: 'success', text: 'FAQ item deleted!' });
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Upgrade Items */}
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3>Upgrade Benefits</h3>
            <button className="admin-btn-primary" style={{ padding: '8px 15px' }} onClick={() => setEditingUpgrade({ icon: '🥑', title: '', description: '', link: '#' })}>+ Add</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {upgrades.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', border: '1px solid #ebedf3', borderRadius: '8px' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: '600' }}>{item.title}</div>
                    <div style={{ fontSize: '0.85rem', color: '#7e8299' }}>{item.description}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => setEditingUpgrade(item)}>✏️</button>
                  <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleDeleteUpgrade(item.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3>FAQs</h3>
            <button className="admin-btn-primary" style={{ padding: '8px 15px' }} onClick={() => setEditingFaq({ question: '', answer: '' })}>+ Add</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {faqs.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', border: '1px solid #ebedf3', borderRadius: '8px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600' }}>{item.question}</div>
                  <div style={{ fontSize: '0.85rem', color: '#7e8299', marginTop: '5px' }}>{item.answer}</div>
                </div>
                <div style={{ display: 'flex', gap: '5px', marginLeft: '10px' }}>
                  <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => setEditingFaq(item)}>✏️</button>
                  <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleDeleteFaq(item.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upgrade Edit Modal */}
      {editingUpgrade && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyCenter: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="admin-card" style={{ maxWidth: '500px', width: '100%', margin: 'auto' }}>
            <h3>{editingUpgrade.id ? 'Edit' : 'Add'} Upgrade</h3>
            <form onSubmit={handleSaveUpgrade} style={{ marginTop: '20px' }}>
              <div className="admin-form-group">
                <label>Icon (Emoji)</label>
                <input type="text" className="admin-input" value={editingUpgrade.icon} onChange={(e) => setEditingUpgrade({ ...editingUpgrade, icon: e.target.value })} />
              </div>
              <div className="admin-form-group">
                <label>Title</label>
                <input type="text" className="admin-input" value={editingUpgrade.title} onChange={(e) => setEditingUpgrade({ ...editingUpgrade, title: e.target.value })} required />
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <textarea className="admin-textarea" value={editingUpgrade.description} onChange={(e) => setEditingUpgrade({ ...editingUpgrade, description: e.target.value })} required></textarea>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="admin-btn-primary">Save</button>
                <button type="button" className="admin-btn-primary" style={{ background: '#7e8299' }} onClick={() => setEditingUpgrade(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FAQ Edit Modal */}
      {editingFaq && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyCenter: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="admin-card" style={{ maxWidth: '500px', width: '100%', margin: 'auto' }}>
            <h3>{editingFaq.id ? 'Edit' : 'Add'} FAQ</h3>
            <form onSubmit={handleSaveFaq} style={{ marginTop: '20px' }}>
              <div className="admin-form-group">
                <label>Question</label>
                <input type="text" className="admin-input" value={editingFaq.question} onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })} required />
              </div>
              <div className="admin-form-group">
                <label>Answer</label>
                <textarea className="admin-textarea" value={editingFaq.answer} onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })} required></textarea>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="admin-btn-primary">Save</button>
                <button type="button" className="admin-btn-primary" style={{ background: '#7e8299' }} onClick={() => setEditingFaq(null)}>Cancel</button>
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
