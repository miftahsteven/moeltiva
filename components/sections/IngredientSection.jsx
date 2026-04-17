'use client';

import styles from './IngredientSection.module.css';

const leftIngredients = [
  { icon: '🧡', name: 'Avocado fruit extract', desc: 'Terbuat dari ekstrak alpukat pilihan' },
  { icon: '🌾', name: 'Fish Collagen', desc: 'Membantu menjaga kesehatan kulit' },
  { icon: '🛡️', name: 'Spinach Extract', desc: 'Ekstrak bayam yang baik untuk tubuh' },
];

const rightIngredients = [
  { icon: '💚', name: 'High Fiber', desc: 'Mengandung serat alami' },
  { icon: '⚡', name: 'With Stevia', desc: 'Cocok untuk penderita diabetes' },
  { icon: '🥑', name: 'With Vitamin', desc: 'Vitamin C, vitamin B kompleks, vitamin D, and Zinc' },
];

export default function IngredientSection() {
  return (
    <section id="produk" className={styles.section} aria-label="Ingredient section">
      <div className="container">
        {/* Header */}
        <div className={`text-center mb-5 reveal`}>
          <div className="section-label mb-2">✦ Our Ingredients</div>
          <h2 className="section-title">Premium Ingredients from Nature </h2>
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
                <span>Real</span>
                <span>Fruit</span>
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
