'use client';

import { useState, useEffect } from 'react';
import adminApi from '@/services/adminApi';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  const roleOptions = ['ADMIN', 'EDITOR', 'VIEWER'];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const resp = await adminApi.get('/auth/users');
      setUsers(resp.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage({ type: 'error', text: 'Failed to fetch users from server.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      if (editingUser.id) {
        // Update existing user (role only for now)
        await adminApi.put(`/auth/users/${editingUser.id}`, { role: editingUser.role });
        setMessage({ type: 'success', text: 'User role updated successfully!' });
      } else {
        // Create new user
        const password = e.target.querySelector('input[type="password"]').value;
        await adminApi.post('/auth/users', { 
          email: editingUser.email, 
          password: password, 
          role: editingUser.role 
        });
        setMessage({ type: 'success', text: 'New user created successfully!' });
      }
      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Action failed.';
      setMessage({ type: 'error', text: errMsg });
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await adminApi.delete(`/auth/users/${id}`);
      setMessage({ type: 'success', text: 'User deleted successfully!' });
      fetchUsers();
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Delete failed.';
      setMessage({ type: 'error', text: errMsg });
    }
  };

  const handleResetMfa = async (id) => {
    if (!window.confirm('Are you sure you want to reset MFA for this user? They will be forced to scan a new QR code upon next login.')) return;

    try {
      await adminApi.post(`/auth/users/${id}/reset-mfa`);
      setMessage({ type: 'success', text: 'MFA has been reset for this user.' });
      fetchUsers();
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Reset failed.';
      setMessage({ type: 'error', text: errMsg });
    }
  };

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div className="admin-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>User Management</h3>
        <button className="admin-btn-primary" onClick={() => setEditingUser({ email: '', role: 'VIEWER' })}>+ Add Admin User</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #f4f5f7' }}>
            <th style={{ padding: '12px' }}>Email</th>
            <th style={{ padding: '12px' }}>Role</th>
            <th style={{ padding: '12px' }}>MFA Status</th>
            <th style={{ padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: '1px solid #f4f5f7' }}>
              <td style={{ padding: '12px' }}>{user.email}</td>
              <td style={{ padding: '12px' }}>
                <span style={{ 
                  background: user.role === 'ADMIN' ? '#e1fcf0' : '#f4f5f7', 
                  color: user.role === 'ADMIN' ? '#1da750' : '#3f4254',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {user.role}
                </span>
              </td>
              <td style={{ padding: '12px' }}>
                {user.mfaEnabled ? '✅ Enabled' : '❌ Disabled'}
              </td>
              <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
                <button className="admin-btn-primary" style={{ padding: '5px 8px', fontSize: '0.75rem' }} onClick={() => setEditingUser(user)}>Edit</button>
                <button className="admin-btn-primary" style={{ padding: '5px 8px', fontSize: '0.75rem', background: '#3f4254' }} onClick={() => handleResetMfa(user.id)} title="Reset Google Authenticator">Reset MFA</button>
                <button className="admin-btn-primary" style={{ padding: '5px 8px', fontSize: '0.75rem', background: '#f64e60' }} onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyCenter: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="admin-card" style={{ maxWidth: '450px', width: '100%', margin: 'auto' }}>
            <h3>{editingUser.id ? 'Edit User' : 'Add User'}</h3>
            <form onSubmit={handleSaveUser} style={{ marginTop: '20px' }}>
              <div className="admin-form-group">
                <label>Email Address</label>
                <input type="email" className="admin-input" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} required />
              </div>
              <div className="admin-form-group">
                <label>Role</label>
                <select className="admin-select" value={editingUser.role} onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}>
                  {roleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              {!editingUser.id && (
                <div className="admin-form-group">
                  <label>Initial Password</label>
                  <input type="password" className="admin-input" required />
                </div>
              )}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="admin-btn-primary">Save User</button>
                <button type="button" className="admin-btn-primary" style={{ background: '#7e8299' }} onClick={() => setEditingUser(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
