'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import adminApi from '@/services/adminApi';
import '../admin.css';

export default function MfaSetupPage() {
  const [step, setStep] = useState(1); // 1: QR Code, 2: OTP Verification
  const [data, setData] = useState(null);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchQrCode();
  }, []);

  const fetchQrCode = async () => {
    try {
      setLoading(true);
      const resp = await adminApi.post('/auth/setup-mfa');
      setData(resp.data);
    } catch (err) {
      setError('Failed to generate QR Code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyMfa = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await adminApi.post('/auth/verify-mfa', { token });
      // Update local storage user data
      const user = JSON.parse(localStorage.getItem('adminUser') || '{}');
      user.mfaEnabled = true;
      localStorage.setItem('adminUser', JSON.stringify(user));
      
      router.push('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid token. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !data) return <div className="admin-loading">Generating QR Code...</div>;

  return (
    <div className="admin-login-wrapper" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f5f7' }}>
      <div className="admin-login-card" style={{ maxWidth: '480px', background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontWeight: 700, color: '#181c32' }}>🔐 Required: MFA Setup</h2>
          <p style={{ color: '#7e8299', fontSize: '0.95rem' }}>
            To keep your account secure, Google Authenticator is now mandatory for all users.
          </p>
        </div>

        {step === 1 && data && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '20px', fontSize: '0.9rem' }}>Scan the QR code below using your Google Authenticator app:</p>
            <div style={{ background: '#f4f5f7', padding: '20px', borderRadius: '8px', display: 'inline-block' }}>
              <img src={data.qrCodeUrl} alt="MFA QR Code" style={{ width: '200px', height: '200px' }} />
            </div>
            <div style={{ marginTop: '20px', padding: '10px', background: '#fff8dd', borderRadius: '8px', border: '1px solid #ffc70044' }}>
              <p style={{ fontSize: '0.8rem', color: '#ffc700', marginBottom: '5px', fontWeight: 600 }}>Manual Key:</p>
              <code style={{ fontSize: '1rem', letterSpacing: '2px', fontWeight: 700 }}>{data.secret}</code>
            </div>
            <button 
              className="admin-btn-primary" 
              style={{ width: '100%', marginTop: '30px' }}
              onClick={() => setStep(2)}
            >
              I have scanned it. Next Step.
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={verifyMfa}>
            <p style={{ marginBottom: '20px', fontSize: '0.9rem', textAlign: 'center' }}>
              Enter the 6-digit code from your app to verify the setup:
            </p>
            <div className="admin-form-group">
              <input 
                type="text" 
                className="admin-input" 
                style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '5px' }}
                placeholder="000000"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                maxLength={6}
                required
                autoFocus
              />
            </div>
            {error && <div style={{ color: '#f64e60', background: '#fff5f8', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.85rem', textAlign: 'center' }}>{error}</div>}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" className="admin-btn-primary" style={{ background: '#7e8299' }} onClick={() => setStep(1)} disabled={loading}>Back</button>
              <button type="submit" className="admin-btn-primary" style={{ flex: 1 }} disabled={loading}>
                {loading ? 'Verifying...' : 'Complete Setup'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
