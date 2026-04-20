'use client';

import { useState, useEffect } from 'react';
import api from '@/services/api';
import { getImageUrl } from '@/utils/urlHelper';
import styles from './ProductShowcase.module.css';

// Cache-buster: 2026-04-16T13:54
export default function ProductShowcase() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/products`)
      .then(res => setData(res.data))
      .catch(err => console.error('ProductShowcase API Error:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (!data) return null;

  return (
    <section id="story" className={styles.section} aria-label="Product Showcase">
      <div className="container">
        <div className={`text-center mb-5 reveal`}>
          <div className="section-label mb-2">✦ Story Behind</div>
          <h2 className="section-title">{data.title}</h2>
          <p className="section-subtitle">{data.subtitle}</p>
        </div>

        <div className={styles.grid}>
          <div className={`${styles.leftCol} reveal-left`}>
            <div className={styles.lifestyleWrap}>
              <img
                src={getImageUrl(data.imageUrl) || "/moeltiva-images/farmer-avocado.png"}
                alt="Moeltiva Life"
                className={styles.lifestyleImg}
              />
              <div className={styles.overlayCard}>
                <div className={styles.overlayIcon}>🥑</div>
                <div>
                  <strong>Rasa Enak & Creamy</strong>
                  <p>Seperti alpukat segar setiap hari</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.rightCol} reveal-right`}>
            <div className={styles.storyCard}>
              <span className={styles.storyQuote}>“</span>
              <p className={styles.storyDescription}>
                {data.quote}
                <br />
                {data.description}
              </p>
            </div>

            <div className={styles.statsRow}>
              {data.stats?.map((s, i) => (
                <div key={i} className={styles.statItem}>
                  <div className={styles.statValue}>{s.value}<span className={styles.statUnit}>{s.unit}</span></div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
