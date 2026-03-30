'use client';

import { useState } from 'react';
import styles from './TestimonialSection.module.css';

const testimonials = [
  {
    name: 'Rina Pratiwi',
    age: 28,
    role: 'Ibu Rumah Tangga',
    avatar: '👩',
    rating: 5,
    text: 'Sejak minum Moeltiva, badan lebih segar tiap hari. Nggak nyangka dari minuman serbuk alpukat bisa terasa segini enaknya!',
    location: 'Jakarta',
  },
  {
    name: 'Budi Santoso',
    age: 35,
    role: 'Profesional',
    avatar: '👨',
    rating: 5,
    text: 'Saya minum Moeltiva setiap pagi sebelum kerja. Energi lebih stabil dan nggak ngantuk di tengah hari. Highly recommended!',
    location: 'Surabaya',
  },
  {
    name: 'Maya Dewi',
    age: 24,
    role: 'Mahasiswi',
    avatar: '👩‍🎓',
    rating: 5,
    text: 'Tas baru saya adalah Moeltiva! Sejak program diet saya yang healthy, Moeltiva jadi partner setia. Rasa creamynya enak banget!',
    location: 'Bandung',
  },
  {
    name: 'Hendra Kurniawan',
    age: 42,
    role: 'Pengusaha',
    avatar: '👨‍💼',
    rating: 5,
    text: 'Sudah 3 bulan langganan dan merasakan perubahan nyata. Kolesterol lebih terkontrol dan perut lebih sehat. Terima kasih Moeltiva!',
    location: 'Medan',
  },
  {
    name: 'Sarah Amalia',
    age: 30,
    role: 'Fitness Enthusiast',
    avatar: '👩‍🦰',
    rating: 5,
    text: 'Perfect post-workout drink! Lemak sehat dari alpukat membantu recovery otot lebih cepat. Formula yang mantap sekali.',
    location: 'Yogyakarta',
  },
  {
    name: 'Dian Puspita',
    age: 26,
    role: 'Content Creator',
    avatar: '🧖‍♀️',
    rating: 5,
    text: 'Kulit makin glowing setelah rutin minum Moeltiva! Vitamin E-nya kerasa banget. Sekarang selalu stok di rumah.',
    location: 'Bali',
  },
];

export default function TestimonialSection() {
  const [active, setActive] = useState(0);
  const visibleCount = 3;
  const total = testimonials.length;

  const prev = () => setActive(a => (a - 1 + total) % total);
  const next = () => setActive(a => (a + 1) % total);

  const getVisible = () => {
    return Array.from({ length: visibleCount }, (_, i) => testimonials[(active + i) % total]);
  };

  return (
    <section id="testimoni" className={styles.section} aria-label="Customer testimonials">
      <div className="container">
        {/* Header */}
        <div className={`text-center mb-5 reveal`}>
          <div className="section-label mb-2">✦ Kata Mereka</div>
          <h2 className="section-title">Dipercaya Ribuan Pelanggan</h2>
          <p className="section-subtitle">
            Bergabunglah dengan keluarga besar Moeltiva yang sudah merasakan manfaatnya.
          </p>
        </div>

        {/* Rating summary */}
        <div className={`${styles.ratingSummary} reveal`}>
          <div className={styles.ratingScore}>4.9</div>
          <div>
            <div className={styles.ratingStars}>★★★★★</div>
            <div className={styles.ratingCount}>dari 2.000+ ulasan</div>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className={styles.cardsGrid} role="list" aria-label="Testimonial list">
          {getVisible().map((t, i) => (
            <div
              key={`${active}-${i}`}
              className={`${styles.card} ${i === 1 ? styles.cardFeatured : ''} reveal reveal-delay-${i + 1}`}
              role="listitem"
              aria-label={`Testimoni dari ${t.name}`}
            >
              <div className={styles.cardHeader}>
                <div className={styles.avatar}>{t.avatar}</div>
                <div>
                  <div className={styles.name}>{t.name}, {t.age}</div>
                  <div className={styles.role}>{t.role} • {t.location}</div>
                </div>
                <div className={styles.stars}>{'★'.repeat(t.rating)}</div>
              </div>
              <blockquote className={styles.quote}>
                <span className={styles.quoteIcon}>"</span>
                {t.text}
              </blockquote>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className={`${styles.navRow} reveal`}>
          <button
            className={styles.navBtn}
            onClick={prev}
            aria-label="Previous testimonial"
            id="testimonial-prev-btn"
          >←</button>
          <div className={styles.dots} role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                onClick={() => setActive(i)}
                role="tab"
                aria-selected={i === active}
                aria-label={`Testimonial ${i + 1}`}
                id={`testimonial-dot-${i}`}
              />
            ))}
          </div>
          <button
            className={styles.navBtn}
            onClick={next}
            aria-label="Next testimonial"
            id="testimonial-next-btn"
          >→</button>
        </div>
      </div>
    </section>
  );
}
