'use client';

import { useState, useEffect } from 'react';
import api from '@/services/api';
import styles from './HeroSection.module.css';

// Cache-buster: 2026-04-16T15:32
export default function HeroSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/hero`)
      .then(res => setData(res.data))
      .catch(err => console.error('HeroSection API Error:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleScroll = (href) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  if (loading) return <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  if (!data) return null;

  return (
    <section id="home" className={styles.hero} aria-label="Hero section">
      <div className={`${styles.blob} ${styles.blob1}`} aria-hidden="true" />
      <div className={`${styles.blob} ${styles.blob2}`} aria-hidden="true" />

      <div className="container">
        <div className={styles.grid}>
          <div className={`${styles.textCol} reveal-left`}>
            <div className="badge-green mb-3">{data.headerCta}</div>
            <h1 className={styles.headline}>{data.title}</h1>
            <p className={styles.subheadline}>{data.subtitle}</p>
            <div className={styles.badges}>
              {data.hashtags?.map((tag, idx) => (
                <span key={idx} className={styles.badge}>
                  <span className={styles.badgeIcon}>✓</span> {tag}
                </span>
              ))}
            </div>
            <div className={styles.ctas}>
              <button
                id="hero-buy-btn"
                className="btn-moeltiva-primary pulse-yellow"
                onClick={() => handleScroll('#find-us')}
              >
                {data.buyButtonCta}
              </button>
              <button
                id="hero-learn-btn"
                className="btn-moeltiva-outline"
                onClick={() => handleScroll('#manfaat')}
              >
                {data.buttonCta}
              </button>
            </div>
          </div>
          <div className={`${styles.imageCol} reveal-right`}>
            <div className={styles.imageBg} aria-hidden="true" />
            <div className={`${styles.imageWrap} float-anim`}>
              <img
                src="/moeltiva-images/hero1.JPG"
                alt="Moeltiva Avocado Powder Drink"
                className={styles.productImg}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
