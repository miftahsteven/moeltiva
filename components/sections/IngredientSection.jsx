'use client';

import { useState, useEffect } from 'react';
import api from '@/services/api';
import styles from './IngredientSection.module.css';

// Cache-buster: 2026-04-16T13:54
export default function IngredientSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/ingredients`)
      .then(res => setData(res.data))
      .catch(err => console.error('IngredientSection API Error:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (!data) return null;

  const leftIngredients = data.items?.slice(0, 3) || [];
  const rightIngredients = data.items?.slice(3, 6) || [];

  return (
    <section id="produk" className={styles.section} aria-label="Ingredient section">
      <div className="container">
        <div className={`text-center mb-5 reveal`}>
          <div className="section-label mb-2">✦ Our Ingredients</div>
          <h2 className="section-title">{data.title}</h2>
          <p className="section-subtitle">{data.subtitle}</p>
        </div>

        <div className={styles.layout}>
          <div className={`${styles.ingredientCol} reveal-left`}>
            {leftIngredients.map((item, i) => (
              <div key={i} className={`${styles.ingredientItem} ${styles.itemRight} reveal-delay-${i + 1}`}>
                <div className={styles.itemContent} style={{ textAlign: 'right' }}>
                  <h4 className={styles.itemName}>{item.name}</h4>
                  <p className={styles.itemDesc}>{item.description}</p>
                </div>
                <div className={styles.itemIcon}>{item.icon}</div>
              </div>
            ))}
          </div>

          <div className={`${styles.centerCol} reveal`}>
            <div className={styles.imageContainer}>
              <div className={styles.ringOuter} aria-hidden="true" />
              <div className={styles.ringInner} aria-hidden="true" />
              <img
                src="/ingredient.png"
                alt="Moeltiva Ingredients"
                className={styles.centerImg}
              />
            </div>
          </div>

          <div className={styles.ingredientCol}>
            {rightIngredients.map((item, i) => (
              <div key={i} className={`${styles.ingredientItem} reveal-delay-${i + 1}`}>
                <div className={styles.itemIcon}>{item.icon}</div>
                <div className={styles.itemContent}>
                  <h4 className={styles.itemName}>{item.name}</h4>
                  <p className={styles.itemDesc}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
