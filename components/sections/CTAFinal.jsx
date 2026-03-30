'use client';

import styles from './CTAFinal.module.css';

export default function CTAFinal() {
  const handleOrder = () => {
    const el = document.querySelector('#order');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.section} aria-label="Final call to action">
      {/* Decorative elements */}
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />

      <div className="container">
        <div className={`${styles.inner} reveal`}>
          <div className={styles.leafDecor} aria-hidden="true">🍃</div>
          <div className="section-label mb-2" style={{ color: 'rgba(162,196,114,0.9)' }}>✦ Siap Memulai?</div>
          <h2 className={styles.headline}>
            Mulai Hidup Sehat<br />
            <span className={styles.highlight}>Hari Ini.</span>
          </h2>
          <p className={styles.subtext}>
            Ribuan orang sudah merasakan perbedaannya. Sekarang giliran kamu.
            Coba Moeltiva dan rasakan energi alami dari alam Indonesia.
          </p>

          <div className={styles.ctas}>
            <button
              id="cta-final-btn"
              className={`btn-moeltiva-primary ${styles.mainCta}`}
              onClick={handleOrder}
            >
              🛒 Beli Sekarang — Rp 125.000
            </button>
            <a
              href={`https://wa.me/6281234567890?text=Halo, saya tertarik dengan Moeltiva!`}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-moeltiva-white ${styles.waCta}`}
              id="cta-final-wa-btn"
            >
              💬 Konsultasi Gratis
            </a>
          </div>

          <div className={styles.guarantees}>
            <span>✅ Pengiriman Cepat</span>
            <span>✅ Garansi Uang Kembali 7 Hari</span>
            <span>✅ Gratis Ongkir 2 Box+</span>
          </div>
        </div>
      </div>
    </section>
  );
}
