'use client';

import { useState, useEffect } from 'react';
import api from '@/services/api';
import { getImageUrl } from '@/utils/urlHelper';
import styles from './WhereToFind.module.css';

// Cache-buster: 2026-04-16T13:54
export default function WhereToFind() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/find-us`)
      .then(res => setData(res.data))
      .catch(err => console.error('WhereToFind API Error:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (!data) return null;

  return (
    <section id="find-us" className={styles.section} aria-label="Where to find Moeltiva section">
      <div className={styles.container}>
        <div className={`${styles.header} reveal`}>
          <div className="section-label mb-2">✦ Storefronts</div>
          <h2 className={styles.title}>{data.title}</h2>
          <p className={styles.subtitle}>{data.subtitle}</p>
        </div>

        <div className={`${styles.cardBlock} reveal`}>
          <div className={styles.marketRow}>
            {data.platforms?.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.marketItem}
              >
                <div className={styles.iconWrap}>
                  <img 
                    src={getImageUrl(item.imageUrl) || `https://logo.clearbit.com/${item.platform.toLowerCase()}.com`} 
                    alt={item.platform} 
                    className={styles.marketLogo} 
                    onError={(e) => {
                      if (item.platform === 'Tokopedia') e.target.src = '/moeltiva-images/tokopedia.png';
                      else if (item.platform === 'Shopee') e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg';
                      else if (item.platform === 'Instagram') e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg';
                      else if (item.platform === 'TikTok') e.target.src = 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg';
                    }}
                  />
                </div>
                <span className={styles.marketName}>{item.platform}</span>
              </a>
            ))}
          </div>

          <div className={styles.certSection}>
            <h3 className={styles.certTitle}>Sertifikasi & Kualitas</h3>
            <div className={styles.certStripWrap}>
              <img
                src="/moeltiva-images/cert.png"
                alt="Moeltiva Certifications"
                className={styles.certStrip}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
