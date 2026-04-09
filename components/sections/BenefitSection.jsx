'use client';

import styles from './BenefitSection.module.css';

const benefits = [
  {
    icon: '🌾',
    title: 'Tinggi Serat',
    desc: 'Membantu rasa kenyang lebih lama dan menjaga kesehatan pencernaan, sehingga cocok dikonsumsi sebagai minuman fungsional.',
    color: '#F6DC43',
  },
  {
    icon: '🌱',
    title: '+1000 mg kolagen',
    desc: 'Memberikan manfaat tambahan untuk kesehatan kulit dan jaringan tubuh. (fungsi yang tidak ditemukan secara alami pada alpukat segar).',
    color: '#A2C472',
  },
  {
    icon: '⚡',
    title: 'Vitamin C, vitamin B kompleks, vitamin D, dan Zinc',
    desc: 'Mendukung daya tahan tubuh dan metabolisme harian, terutama untuk konsumen dengan aktivitas tinggi dan waktu makan yang terbatas, serta membantu penyerapan kolagen lebih optimal.',
    color: '#215737',
  },
  // {
  //   icon: '😋',
  //   title: 'Rasa Enak & Creamy',
  //   desc: 'Rasa alpukat asli yang lezat dan creamy — seperti minum alpukat segar setiap hari.',
  //   color: '#F6DC43',
  // },
  // {
  //   icon: '🌱',
  //   title: '100% Bahan Alami',
  //   desc: 'Tidak ada bahan pengawet, pewarna buatan, atau pemanis sintetis. Murni kebaikan dari alam.',
  //   color: '#A2C472',
  // },
];

export default function BenefitSection() {
  return (
    <section id="manfaat" className={styles.section} aria-label="Benefits of Moeltiva">
      <div className="container">
        {/* Header */}
        <div className={`text-center mb-5 reveal`}>
          <div className="section-label mb-2">✦ Manfaat</div>
          <h2 className="section-title">Kenapa Pilih Moeltiva?</h2>
          <p className="section-subtitle">
            Lebih dari sekadar minuman — Moeltiva adalah komitmen untuk gaya hidupmu yang lebih sehat.
          </p>
        </div>

        {/* Benefits grid */}
        <div className={styles.benefitsGrid}>
          {benefits.map((b, i) => (
            <div
              key={i}
              className={`${styles.benefitCard} reveal reveal-delay-${(i % 4) + 1}`}
              id={`benefit-card-${i + 1}`}
              style={{ '--accent': b.color }}
            >
              <div className={styles.cardIcon} style={{ background: `${b.color}22` }}>
                <span>{b.icon}</span>
              </div>
              <div className={styles.cardNumber}>0{i + 1}</div>
              <h3 className={styles.cardTitle}>{b.title}</h3>
              <p className={styles.cardDesc}>{b.desc}</p>
              <div className={styles.cardLine} style={{ background: b.color }} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-5 reveal`}>
          <a href="#order" className="btn-moeltiva-primary" id="benefit-cta-btn">
            🥑 Coba Moeltiva Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}
