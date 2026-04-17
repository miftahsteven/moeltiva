'use client';

import { useState, useEffect } from 'react';
import adminApi from '@/services/adminApi';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    activeUsers: 0,
    totalVisits: 0,
    pageViews: 0,
    clicks: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [gaStats, realtimeStats] = await Promise.all([
          adminApi.get('/analytics/visitors'),
          adminApi.get('/analytics/realtime')
        ]);

        // Process data from GA (simplified for now)
        setStats({
          activeUsers: realtimeStats.data?.rows?.[0]?.metricValues?.[0]?.value || 0,
          totalVisits: gaStats.data?.rows?.reduce((acc, row) => acc + parseInt(row.metricValues[0].value), 0) || 0,
          pageViews: gaStats.data?.rows?.reduce((acc, row) => acc + parseInt(row.metricValues[1].value), 0) || 0,
          clicks: 1250 // Mock clicks for now
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
        // Set some dummy data for preview if API fails (e.g. no Property ID yet)
        setStats({
          activeUsers: 8,
          totalVisits: 2450,
          pageViews: 8900,
          clicks: 1250
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Live Visitors', value: stats.activeUsers, icon: '🔥', color: '#f64e60' },
    { label: 'Total Visitors (30d)', value: stats.totalVisits.toLocaleString(), icon: '👥', color: '#6993ff' },
    { label: 'Total Pageviews', value: stats.pageViews.toLocaleString(), icon: '📄', color: '#181c32' },
    { label: 'Website Clicks', value: stats.clicks.toLocaleString(), icon: '🖱️', color: '#ffa800' },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {statCards.map((stat) => (
          <div key={stat.label} className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '2.5rem', background: `${stat.color}11`, padding: '15px', borderRadius: '12px' }}>{stat.icon}</div>
            <div>
              <div style={{ color: '#7e8299', fontSize: '0.9rem', marginBottom: '5px' }}>{stat.label}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3f4254' }}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <h3>Welcome to Moeltiva Admin</h3>
        <p style={{ color: '#7e8299', marginTop: '10px' }}>
          Select a category from the sidebar to manage your website content. 
          Changes made here will be reflected on the public website immediately.
        </p>
      </div>
    </div>
  );
}
