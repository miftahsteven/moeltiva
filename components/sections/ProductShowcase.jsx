'use client';

import styles from './ProductShowcase.module.css';

const stats = [
  { value: '10', unit: 'Sachet', label: 'per Box' },
  { value: '100%', unit: '', label: 'Bahan Alami' },
  { value: '2rb+', unit: '', label: 'Pelanggan Puas' },
];

export default function ProductShowcase() {
  return (
    <section id="produk" className={styles.section} aria-label="Product Showcase">
      <div className={styles.topWave} aria-hidden="true" />

      <div className="container">
        {/* Header */}
        <div className={`text-center mb-5 reveal`}>
          <div className="section-label mb-2">✦ Produk Kami</div>
          <h2 className="section-title">Kenalan dengan Moeltiva</h2>
          <p className="section-subtitle">
            Dibuat dari alpukat pilihan, diproses dengan teknologi modern untuk menjaga kandungan nutrisinya.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left side content */}
          <div className={`${styles.leftCol} reveal-left`}>
            <div className={styles.lifestyleWrap}>
              <img
                src="/drink-lifestyle.png"
                alt="Segelas minuman Moeltiva avocado powder drink yang segar dan creamy"
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
            <div className={styles.productFeatures}>
              {[
                { icon: '🌿', title: 'Tanpa Pengawet', desc: 'Formula alami tanpa bahan kimia berbahaya' },
                { icon: '🐾', title: 'Vegan Friendly', desc: 'Cocok untuk semua gaya hidup sehat' },
                { icon: '🇮🇩', title: 'Made in Indonesia', desc: 'Produk lokal berkualitas premium' },
                { icon: '⚡', title: 'Siap Saji', desc: 'Cukup larutkan dalam air, langsung nikmati' },
              ].map((f, i) => (
                <div key={i} className={`${styles.featureItem} reveal reveal-delay-${i + 1}`}>
                  <div className={styles.featureIcon}>{f.icon}</div>
                  <div>
                    <h4 className={styles.featureTitle}>{f.title}</h4>
                    <p className={styles.featureDesc}>{f.desc}</p>
                  </div>
                </div>
              ))}
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
