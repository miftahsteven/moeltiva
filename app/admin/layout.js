'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import './admin.css';

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else if (token && pathname === '/admin/login') {
      router.push('/admin');
    }
    
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, [pathname, router]);

  if (isLoading) return <div className="admin-loading">Loading Moeltiva Admin...</div>;

  if (!isAuthenticated && pathname !== '/admin/login') {
    return null; // Redirecting
  }

  if (pathname === '/admin/login') {
    return <div className="admin-login-wrapper">{children}</div>;
  }

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Profile', path: '/admin/profile', icon: '🏢' },
    { name: 'Hero', path: '/admin/hero', icon: '✨' },
    { name: 'Ingredients', path: '/admin/ingredients', icon: '🥑' },
    { name: 'Benefits', path: '/admin/benefits', icon: '💡' },
    { name: 'Product', path: '/admin/product', icon: '📦' },
    { name: 'Upgrade & FAQ', path: '/admin/faq', icon: '❓' },
    { name: 'Where to Find', path: '/admin/find-us', icon: '📍' },
    { name: 'Footer', path: '/admin/footer', icon: '🗺️' },
    { name: 'User Management', path: '/admin/users', icon: '👥' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <img src="/logo.png" alt="Moeltiva Logo" />
          <span>Admin Panel</span>
        </div>
        <nav className="admin-nav">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`nav-item ${pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="admin-footer-nav">
          <button onClick={handleLogout} className="btn-logout">
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>{menuItems.find(m => m.path === pathname)?.name || 'Admin'}</h1>
          <div className="admin-user-info">
            <span>Welcome, Admin</span>
          </div>
        </header>
        <section className="admin-content">
          {children}
        </section>
      </main>
    </div>
  );
}
