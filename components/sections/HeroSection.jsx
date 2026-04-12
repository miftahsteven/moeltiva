'use client';

import styles from './HeroSection.module.css';

export default function HeroSection() {
  const handleScroll = (href) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={styles.hero} aria-label="Hero section">
      {/* Decorative blobs */}
      <div className={`${styles.blob} ${styles.blob1}`} aria-hidden="true" />
      <div className={`${styles.blob} ${styles.blob2}`} aria-hidden="true" />

      <div className="container">
        <div className={styles.grid}>
          {/* Left — Text */}
          <div className={`${styles.textCol} reveal-left`}>
            <div className="badge-green mb-3">🌿 100% Real Fruit</div>

            <h1 className={styles.headline}>
              Moeltiva<br />
              <span className={styles.highlight}>Easy healthy,</span><br />
              Glow Naturally.
            </h1>

            <p className={styles.subheadline}>
              Daily fruit juice made from real fruit, enriched with fiber,
              collagen, vitamin C, & zinc

            </p>

            {/* Badges */}
            <div className={styles.badges}>
              <span className={styles.badge}><span className={styles.badgeIcon}>✓</span> Avocado fruit extract</span>
              <span className={styles.badge}><span className={styles.badgeIcon}>✓</span> Collagen</span>
              <span className={styles.badge}><span className={styles.badgeIcon}>✓</span> Fiber</span>
              <span className={styles.badge}><span className={styles.badgeIcon}>✓</span> Vitamin C</span>
              <span className={styles.badge}><span className={styles.badgeIcon}>✓</span> Zinc</span>
            </div>

            {/* CTAs */}
            <div className={styles.ctas}>
              <button
                id="hero-buy-btn"
                className="btn-moeltiva-primary pulse-yellow"
                onClick={() => handleScroll('#find-us')}
              >
                🛒 Beli Sekarang
              </button>
              <button
                id="hero-learn-btn"
                className="btn-moeltiva-outline"
                onClick={() => handleScroll('#manfaat')}
              >
                Pelajari Lebih Lanjut
              </button>
            </div>

            {/* Social proof mini */}
            <div className={styles.miniProof}>
              {/* <div className={styles.avatarRow}>
                {['🙋‍♀️', '🙋‍♂️', '🙋‍♀️'].map((e, i) => (
                  <span key={i} className={styles.avatar}>{e}</span>
                ))}
              </div>
              <div>
                <p className={styles.proofText}><strong>2.000+</strong> pelanggan puas</p>
                <div className={styles.stars}>★★★★★ 4.9</div>
              </div> */}
            </div>
          </div>

          {/* Right — Product Image */}
          <div className={`${styles.imageCol} reveal-right`} aria-label="Moeltiva product image">
            <div className={styles.imageBg} aria-hidden="true" />
            <div className={`${styles.imageWrap} float-anim`}>
              <img
                src="/moeltiva-images/hero1.JPG"
                alt="Moeltiva Avocado Powder Drink — produk minuman serbuk ekstrak alpukat premium"
                className={styles.productImg}
              />
            </div>

            {/* Floating info cards */}
            <div className={`${styles.floatCard} ${styles.floatCard1} float-slow`}>
              <span className={styles.floatIcon}>🥑</span>
              <div>
                <strong>+1000 mg kolagen</strong>
                <p>Hidrasi & elastisitas kulit</p>
              </div>
            </div>

            <div className={`${styles.floatCard} ${styles.floatCard2} float-slow`} style={{ animationDelay: '1.5s' }}>
              <span className={styles.floatIcon}>⚡</span>
              <div>
                <strong>Tinggi serat</strong>
                <p>Mengandung serat alami</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Arrow scroll indicator */}
      <div className={styles.scrollIndicator} aria-label="Scroll down">
        <div className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll</span>
      </div>
    </section>
  );
}
