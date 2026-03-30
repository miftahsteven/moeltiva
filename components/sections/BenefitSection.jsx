'use client';

import styles from './BenefitSection.module.css';

const benefits = [
  {
    icon: '⚡',
    title: 'Energi Alami Tanpa Efek Samping',
    desc: 'Nikmati energi sepanjang hari dari lemak sehat alpukat — tanpa kafein, tanpa jantung berdebar.',
    color: '#F6DC43',
  },
  {
    icon: '🥗',
    title: 'Mendukung Diet Sehat',
    desc: 'Kandungan serat dan lemak baik membantu menjaga rasa kenyang lebih lama dan mendukung manajemen berat badan.',
    color: '#A2C472',
  },
  {
    icon: '⏱️',
    title: 'Praktis & Cepat',
    desc: 'Cukup larutkan satu sachet dalam air dan minuman sehatmu sudah siap dalam hitungan detik.',
    color: '#215737',
  },
  {
    icon: '😋',
    title: 'Rasa Enak & Creamy',
    desc: 'Rasa alpukat asli yang lezat dan creamy — seperti minum alpukat segar setiap hari.',
    color: '#F6DC43',
  },
  {
    icon: '🌱',
    title: '100% Bahan Alami',
    desc: 'Tidak ada bahan pengawet, pewarna buatan, atau pemanis sintetis. Murni kebaikan dari alam.',
    color: '#A2C472',
  },
];

export default function BenefitSection() {
  return (
    <section id="manfaat" className={styles.section} aria-label="Benefits of Moeltiva">
      <div className="container">
        {/* Header */}
        <div className={`text-center mb-5 reveal`}>
          <div className="section-label mb-2">✦ Mengapa Moeltiva?</div>
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
