'use client';

import { useState, useEffect } from 'react';
import api from '@/services/api';
import styles from './BenefitSection.module.css';

// Cache-buster: 2026-04-16T13:54
export default function BenefitSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/benefits`)
      .then(res => setData(res.data))
      .catch(err => console.error('BenefitSection API Error:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (!data) return null;

  return (
    <section id="manfaat" className={styles.section} aria-label="Benefits of Moeltiva">
      <div className="container">
        <div className={`text-center mb-5 reveal`}>
          <div className="section-label mb-2">✦ Manfaat</div>
          <h2 className="section-title">{data.title}</h2>
          <p className="section-subtitle">{data.subtitle}</p>
        </div>

        <div className={styles.benefitsGrid}>
          {data.items?.map((b, i) => (
            <div
              key={i}
              className={`${styles.benefitCard} reveal reveal-delay-${(i % 4) + 1}`}
              id={`benefit-card-${i + 1}`}
              style={{ '--accent': '#F6DC43' }}
            >
              <div className={styles.cardIcon} style={{ background: `#F6DC4322` }}>
                <span>{b.icon}</span>
              </div>
              <div className={styles.cardNumber}>0{i + 1}</div>
              <h3 className={styles.cardTitle}>{b.title}</h3>
              <p className={styles.cardDesc}>{b.description}</p>
              <div className={styles.cardLine} style={{ background: '#F6DC43' }} />
            </div>
          ))}
        </div>

        <div className={`text-center mt-5 reveal`}>
          <a href={data.ctaLink} className="btn-moeltiva-primary" id="benefit-cta-btn">
            {data.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
