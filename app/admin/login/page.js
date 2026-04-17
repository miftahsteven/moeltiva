'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import adminApi from '@/services/adminApi';
import '../admin.css';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaToken, setMfaToken] = useState('');
  const [showMfa, setShowMfa] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const resp = await adminApi.post('/auth/login', { 
        email, 
        password,
        token: showMfa ? mfaToken : undefined
      });

      if (resp.data.mfaRequired) {
        setShowMfa(true);
        setLoading(false);
        return;
      }

      localStorage.setItem('adminToken', resp.data.accessToken);
      localStorage.setItem('adminUser', JSON.stringify(resp.data.user));

      if (resp.data.mfaSetupRequired) {
        router.push('/admin/mfa-setup');
      } else {
        router.push('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-card">
      <div className="admin-login-header">
        <img src="/logo.png" alt="Moeltiva Logo" />
        <h2>Moeltiva Admin</h2>
        <p>Enter your credentials to access the panel</p>
      </div>

      <form onSubmit={handleLogin} className="admin-login-form">
        {!showMfa ? (
          <>
            <div className="admin-form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                className="admin-input" 
                placeholder="admin@moeltiva.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="admin-form-group">
              <label>Password</label>
              <input 
                type="password" 
                className="admin-input" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </>
        ) : (
          <div className="admin-form-group">
            <label>MFA Token (Google Authenticator)</label>
            <input 
              type="text" 
              className="admin-input" 
              placeholder="000000"
              value={mfaToken}
              onChange={(e) => setMfaToken(e.target.value)}
              required
              autoFocus
            />
          </div>
        )}

        {error && <div className="admin-login-error">{error}</div>}

        <button type="submit" className="admin-btn-primary" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Processing...' : (showMfa ? 'Verify & Login' : 'Sign In')}
        </button>
      </form>

      <style jsx>{`
        .admin-login-card {
          width: 100%;
          max-width: 450px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          padding: 40px;
        }
        .admin-login-header {
          text-align: center;
          margin-bottom: 30px;
        }
        .admin-login-header img {
          height: 50px;
          margin-bottom: 15px;
        }
        .admin-login-header h2 {
          margin-top: 10px;
          font-weight: 700;
          color: #181c32;
        }
        .admin-login-header p {
          color: #7e8299;
          font-size: 0.95rem;
        }
        .admin-login-error {
          padding: 12px;
          background: #fff5f8;
          color: #f64e60;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 0.9rem;
          border: 1px solid #f64e6022;
        }
        .admin-login-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: #f4f5f7;
        }
      `}</style>
    </div>
  );
}
