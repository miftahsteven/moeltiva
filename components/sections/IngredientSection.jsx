'use client';

import styles from './IngredientSection.module.css';

const leftIngredients = [
  { icon: '🧡', name: 'Vitamin E', desc: 'Antioksidan kuat untuk kesehatan kulit & jantung' },
  { icon: '🌾', name: 'Serat Alami', desc: 'Mendukung pencernaan yang sehat' },
  { icon: '🛡️', name: 'Antioksidan', desc: 'Melindungi sel dari kerusakan bebas' },
];

const rightIngredients = [
  { icon: '💚', name: 'Lemak Sehat', desc: 'Omega-9 & omega-6 untuk jantung sehat' },
  { icon: '⚡', name: 'Mineral Penting', desc: 'Kalium & magnesium untuk energi' },
  { icon: '🥑', name: 'Ekstrak Alpukat', desc: 'Nutrisi lengkap dari buah pilihan' },
];

export default function IngredientSection() {
  return (
    <section className={styles.section} aria-label="Ingredient section">
      <div className="container">
        {/* Header */}
        <div className={`text-center mb-5 reveal`}>
          <div className="section-label mb-2">✦ Komposisi</div>
          <h2 className="section-title">Kandungan Premium dari Alam</h2>
          <p className="section-subtitle">
            Setiap sachet Moeltiva mengandung nutrisi pilihan yang bekerja sinergis untuk kesehatan optimalmu.
          </p>
        </div>

        <div className={styles.layout}>
          {/* Left */}
          <div className={`${styles.ingredientCol} reveal-left`}>
            {leftIngredients.map((item, i) => (
              <div key={i} className={`${styles.ingredientItem} ${styles.itemRight} reveal-delay-${i + 1}`}>
                <div className={styles.itemContent} style={{ textAlign: 'right' }}>
                  <h4 className={styles.itemName}>{item.name}</h4>
                  <p className={styles.itemDesc}>{item.desc}</p>
                </div>
                <div className={styles.itemIcon}>{item.icon}</div>
              </div>
            ))}
          </div>

          {/* Center Image */}
          <div className={`${styles.centerCol} reveal`}>
            <div className={styles.imageContainer}>
              <div className={styles.ringOuter} aria-hidden="true" />
              <div className={styles.ringInner} aria-hidden="true" />
              <img
                src="/ingredient.png"
                alt="Serbuk alpukat Moeltiva — bahan alami premium dalam setiap sachet"
                className={styles.centerImg}
              />
              <div className={styles.centerBadge}>
                <span>100%</span>
                <small>Natural</small>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className={`${styles.ingredientCol} reveal-right`}>
            {rightIngredients.map((item, i) => (
              <div key={i} className={`${styles.ingredientItem} reveal-delay-${i + 1}`}>
                <div className={styles.itemIcon}>{item.icon}</div>
                <div className={styles.itemContent}>
                  <h4 className={styles.itemName}>{item.name}</h4>
                  <p className={styles.itemDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
