'use client';

import { useState, useEffect } from 'react';
import api from '@/services/api';
import styles from './UpgradeFAQSection.module.css';

// Cache-buster: 2026-04-16T13:54
export default function UpgradeFAQSection() {
  const [data, setData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/faq`)
      .then(res => setData(res.data))
      .catch(err => console.error('UpgradeFAQSection API Error:', err))
      .finally(() => setLoading(false));
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) return null;
  if (!data) return null;

  return (
    <section id="faq" className={styles.section} aria-label="Upgrade and FAQ section">
      <div className="container">
        <div className={styles.upgradeRow}>
          <div className={`${styles.upgradeContent} reveal-left`}>
            <h2 className={styles.title}>
              {data.title?.split('\n').map((line, i) => (
                <span key={i}>
                  {line} {i === 0 && <br />}
                </span>
              ))}
            </h2>

            <div className={styles.solutionPoints}>
              <div className={styles.solutionLabel}>Dengan Moeltiva...</div>
              <div className={styles.solutionGrid}>
                {data.upgrades?.map((item) => (
                  <div key={item.id} className={styles.solutionChip}>
                    <span className={styles.solutionCheck}>✓</span>
                    <span className={styles.solutionIcon}>{item.icon}</span>
                    <span className={styles.solutionText}>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.painPointsDesktop}>
              <div className={styles.painLabel}>Tidak lagi...</div>
              <div className={styles.painGrid}>
                {[
                  { icon: '⏳', text: 'Menunggu musim' },
                  { icon: '🛒', text: 'Repot pilih buah' },
                  { icon: '🗑️', text: 'Takut busuk' },
                  { icon: '🔪', text: 'Proses ribet' },
                ].map((item) => (
                  <div key={item.text} className={styles.painChip}>
                    <span className={styles.painX}>✕</span>
                    <span className={styles.painIcon}>{item.icon}</span>
                    <span className={styles.painText}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`${styles.imageCol} reveal-right`}>
            <div className={styles.imageWrap}>
              <img
                src="/moeltiva-images/faq2.JPG"
                alt="Moeltiva premium avocado powder drink packaging"
                className={styles.productImg}
              />
            </div>
          </div>
        </div>

        <div className={styles.faqRow}>
          <div className={`${styles.faqHeader} reveal-left`}>
            <div className="section-label mb-2">✦ FAQ</div>
            <h2>{data.title}</h2>
            <p>{data.subtitle}</p>
          </div>

          <div className={`${styles.faqList} reveal-right`}>
            <div className={styles.accordion}>
              {data.faqs?.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.accordionItem} ${activeIndex === index ? styles.active : ''}`}
                >
                  <button
                    className={styles.accordionHeader}
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={activeIndex === index}
                  >
                    <span className={styles.question}>{item.question}</span>
                    <span className={styles.icon} />
                  </button>
                  <div className={styles.accordionContent}>
                    <p className={styles.answer}>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
