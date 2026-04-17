'use client';

import styles from './ProductShowcase.module.css';

const stats = [
  { value: '10', unit: 'Sachet', label: 'per Box' },
  { value: '100%', unit: '', label: 'Real Avocado' },
  { value: '1rb+', unit: '', label: 'Petani Lokal' },
];

export default function ProductShowcase() {
  return (
    <section id="story" className={styles.section} aria-label="Product Showcase">
      {/* <div className={styles.topWave} aria-hidden="true" /> */}

      <div className="container">
        {/* Header */}
        <div className={`text-center mb-5 reveal`}>
          <div className="section-label mb-2">✦ Story Behind</div>
          <h2 className="section-title">Kenalan dengan Moeltiva</h2>
          <p className="section-subtitle">
            Kisah ketulusan dari kebun alpukat pilihan untuk kesehatan Anda.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left side content */}
          <div className={`${styles.leftCol} reveal-left`}>
            <div className={styles.lifestyleWrap}>
              <img
                src="/moeltiva-images/farmer-avocado.png"
                alt="Petani alpukat Moeltiva sedang memanen buah alpukat segar di kebun"
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

          {/* Right side */}
          <div className={`${styles.rightCol} reveal-right`}>
            <div className={styles.storyCard}>
              <span className={styles.storyQuote}>“</span>
              <p className={styles.storyDescription}>
                Di balik rasa Moeltiva, ada kisah petani yang menanam dengan cinta dan panen dengan harapan.
                Setiap teguk adalah jembatan antara Anda dan mereka, sebuah kontribusi kecil untuk perubahan besar.
                Moeltiva, lebih dari rasa.
              </p>
            </div>

            {/* Stats */}
            <div className={styles.statsRow}>
              {stats.map((s, i) => (
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
