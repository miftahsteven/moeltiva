'use client';

import styles from './TrustSection.module.css';

const logos = [
  { name: 'Health Magazine', icon: '📰' },
  { name: 'Wellness ID', icon: '💚' },
  { name: 'Natural Living', icon: '🌿' },
  { name: 'Green Lifestyle', icon: '🍃' },
  { name: 'Sehat Indonesia', icon: '🏥' },
];

export default function TrustSection() {
  return (
    <section className={styles.section} aria-label="Trust and social proof">
      <div className="container">
        <div className={`${styles.inner} reveal`}>
          <p className={styles.label}>Dipercaya oleh gaya hidup sehat modern</p>
          <div className={styles.logosRow} aria-label="Featured in media">
            {logos.map((logo, i) => (
              <div key={i} className={styles.logoChip} aria-label={logo.name}>
                <span className={styles.logoIcon} aria-hidden="true">{logo.icon}</span>
                <span className={styles.logoName}>{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
