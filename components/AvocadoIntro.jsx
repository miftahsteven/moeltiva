'use client';

import { useState, useEffect } from 'react';
import styles from './AvocadoIntro.module.css';

const SESSION_KEY = 'moeltiva_avocado_seen';

const PARTICLES = [
  { icon: '🌿', left: '8%',  delay: '0s',   dur: '14s' },
  { icon: '🥑', left: '20%', delay: '2s',   dur: '11s' },
  { icon: '✨', left: '35%', delay: '5s',   dur: '13s' },
  { icon: '🌿', left: '52%', delay: '1s',   dur: '16s' },
  { icon: '🍃', left: '67%', delay: '3.5s', dur: '12s' },
  { icon: '🥑', left: '80%', delay: '6s',   dur: '15s' },
  { icon: '✨', left: '92%', delay: '0.5s', dur: '10s' },
];

const STATS = [
  { icon: '💚', value: '20+ Nutrisi', label: 'Alami' },
  { icon: '🫀', value: 'Jantung',     label: 'Sehat' },
  { icon: '✨', value: 'Antioksidan', label: 'Tinggi' },
  { icon: '🧠', value: 'Otak',        label: 'Vitality' },
];

export default function AvocadoIntro() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Show only once per browser session
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (!seen) {
      setVisible(true);
      // Lock body scroll while overlay is open
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleDismiss = () => {
    setExiting(true);
    document.body.style.overflow = '';
    sessionStorage.setItem(SESSION_KEY, '1');
    // Wait for exit animation to finish before unmounting
    setTimeout(() => setVisible(false), 850);
  };

  if (!visible) return null;

  return (
    <div
      className={`${styles.overlay} ${exiting ? styles.exit : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Kenali Alpukat — Natural Superfood"
    >
      {/* Animated blobs */}
      <div className={`${styles.blob} ${styles.blobTop}`}    aria-hidden="true" />
      <div className={`${styles.blob} ${styles.blobBottom}`} aria-hidden="true" />
      <div className={`${styles.blob} ${styles.blobCenter}`} aria-hidden="true" />

      {/* Grid texture */}
      <div className={styles.grid} aria-hidden="true" />

      {/* Floating particles */}
      <div className={styles.particles} aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={styles.particle}
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.dur,
              fontSize: i % 2 === 0 ? '1.2rem' : '1.6rem',
            }}
          >
            {p.icon}
          </span>
        ))}
      </div>

      {/* Skip button */}
      <button
        id="avocado-intro-skip"
        className={styles.skip}
        onClick={handleDismiss}
        aria-label="Lewati intro"
      >
        Lewati ✕
      </button>

      {/* Main content */}
      <div className={styles.content}>
        {/* Hero emoji */}
        <span className={styles.emojiHero} role="img" aria-label="Alpukat">🥑</span>

        {/* Label chip */}
        <div className={styles.chip}>
          <span>🌿</span>
          Natural Superfood Sejati
        </div>

        {/* Headline */}
        <h2 className={styles.headline}>
          Alam Menciptakan<br />
          <span className={styles.headlineAccent}>Mahakarya Sempurna</span>
        </h2>

        {/* Divider */}
        <div className={styles.divider} aria-hidden="true" />

        {/* Body text */}
        <p className={styles.body}>
          Buah istimewa dengan kandungan{' '}
          <span className={styles.bodyBold}>lemak tak jenuh dan antioksidan</span>{' '}
          yang mampu menjaga kesehatan jantung serta kulit secara alami.
          Sebagai superfood sejati, buah ini memberikan{' '}
          <span className={styles.bodyBold}>nutrisi padat yang jarang ditemukan</span>{' '}
          pada buah lain — investasi kesehatan sempurna dalam setiap gigitan.
          <br /><br />
          Fleksibilitasnya dalam berbagai hidangan tidak hanya memanjakan lidah,
          tetapi juga memberikan{' '}
          <span className={styles.bodyBold}>rasa kenyang lebih lama</span>{' '}
          untuk metabolisme yang stabil — mendukung vitalitas otak dan kebugaran fisik jangka panjang.
        </p>

        {/* Stats row */}
        <div className={styles.stats}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statIcon}>{s.icon}</span>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          id="avocado-intro-cta"
          className={styles.btn}
          onClick={handleDismiss}
        >
          Kenali Produk Kami
          <span className={styles.btnArrow}>→</span>
        </button>
      </div>

      {/* Bottom progress bar (visual countdown) */}
      <div
        className={styles.progressBar}
        style={{ '--progress-duration': '14s' }}
        aria-hidden="true"
      />
    </div>
  );
}
