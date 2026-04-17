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
    <div className="login-page-container">
      <div className="login-background-overlay"></div>
      
      <div className="login-content">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="logo-container">
              <img src="/logo-moeltiva.png" alt="Moeltiva Logo" />
            </div>
            <h2>Admin Portal</h2>
            <p>Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={handleLogin} className="admin-login-form">
            {!showMfa ? (
              <>
                <div className="admin-form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    className="admin-input" 
                    placeholder="name@example.com"
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
                <label>MFA Token</label>
                <p className="mfa-hint">Enter the 6-digit code from Google Authenticator</p>
                <input 
                  type="text" 
                  className="admin-input mfa-input" 
                  placeholder="000000"
                  value={mfaToken}
                  onChange={(e) => setMfaToken(e.target.value)}
                  required
                  autoFocus
                  maxLength={6}
                />
              </div>
            )}

            {error && (
              <div className="admin-login-error">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <button type="submit" className="admin-login-btn" disabled={loading}>
              {loading ? (
                <span className="loader-span">Processing...</span>
              ) : (
                showMfa ? 'Verify Token' : 'Sign In'
              )}
            </button>

            {!showMfa && (
              <div className="login-footer-links">
                <a href="#" className="forgot-pass">Forgot password?</a>
              </div>
            )}
          </form>
        </div>
        
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} Moeltiva. All rights reserved.
        </div>
      </div>

      <style jsx>{`
        .login-page-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: url('/moeltiva-images/farmer-avocado.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 1000;
        }

        .login-background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(26, 69, 43, 0.9) 0%, rgba(246, 220, 67, 0.2) 100%);
          z-index: 1;
        }

        .login-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 440px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .admin-login-card {
          width: 100%;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .admin-login-header {
          text-align: center;
          margin-bottom: 35px;
        }

        .logo-container {
          width: 70px;
          height: 70px;
          background: #fff;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
        }

        .logo-container img {
          width: 80%;
          object-fit: contain;
        }

        .admin-login-header h2 {
          font-size: 1.75rem;
          font-weight: 800;
          color: #1a452b;
          margin-bottom: 8px;
        }

        .admin-login-header p {
          color: #64748b;
          font-size: 0.95rem;
        }

        .admin-form-group {
          margin-bottom: 24px;
        }

        .admin-form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 0.85rem;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .admin-input {
          width: 100%;
          height: 52px;
          padding: 0 16px;
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          color: #1e293b;
          transition: all 0.2s ease;
        }

        .admin-input:focus {
          outline: none;
          background: #fff;
          border-color: #1a452b;
          box-shadow: 0 0 0 4px rgba(26, 69, 43, 0.1);
        }

        .mfa-hint {
          font-size: 0.8rem;
          color: #64748b;
          margin-bottom: 12px;
        }

        .mfa-input {
          text-align: center;
          letter-spacing: 0.5em;
          font-weight: 700;
          font-size: 1.25rem;
        }

        .admin-login-error {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px;
          background: #fff1f2;
          border: 1px solid #fecaca;
          color: #e11d48;
          border-radius: 12px;
          margin-bottom: 24px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .admin-login-btn {
          width: 100%;
          height: 52px;
          background: #1a452b;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .admin-login-btn:hover:not(:disabled) {
          background: #143521;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(26, 69, 43, 0.25);
        }

        .admin-login-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .admin-login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .login-footer-links {
          margin-top: 20px;
          text-align: center;
        }

        .forgot-pass {
          color: #1a452b;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .forgot-pass:hover {
          color: #f6dc43;
        }

        .footer-copyright {
          margin-top: 30px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.85rem;
        }

        @media (max-width: 480px) {
          .login-content {
            padding: 15px;
          }
          
          .admin-login-card {
            padding: 30px 20px;
            border-radius: 0;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            border-top-left-radius: 30px;
            border-top-right-radius: 30px;
          }

          .login-background-overlay {
            background: linear-gradient(to bottom, rgba(26, 69, 43, 0.4) 0%, rgba(26, 69, 43, 0.9) 100%);
          }

          .footer-copyright {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
