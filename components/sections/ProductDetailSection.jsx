'use client';

import styles from './ProductDetailSection.module.css';

const details = [
  { icon: '📦', label: '1 Box', value: '10 Sachet' },
  { icon: '🌱', label: 'Vegan', value: 'Friendly' },
  { icon: '🚫', label: 'Tanpa', value: 'Pengawet' },
  { icon: '🇮🇩', label: 'Made in', value: 'Indonesia' },
];

export default function ProductDetailSection() {
  const handleOrder = () => {
    const el = document.querySelector('#order');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.section} aria-label="Product Detail">
      <div className={styles.bgDecor} aria-hidden="true" />

      <div className="container">
        <div className={styles.card}>
          {/* Badge */}
          <div className={`${styles.featuredBadge} reveal`}>
            ⭐ Produk Unggulan
          </div>

          <div className={styles.grid}>
            {/* Image */}
            <div className={`${styles.imageCol} reveal-left`}>
              <div className={styles.imageWrap}>
                <img
                  src="/product-hero.png"
                  alt="Moeltiva Avocado Powder Drink box — 10 sachet per box"
                  className={styles.prodImg}
                />
              </div>
            </div>

            {/* Content */}
            <div className={`${styles.contentCol} reveal-right`}>
              <div className="section-label mb-2">✦ Detail Produk</div>
              <h2 className={styles.prodTitle}>Moeltiva Avocado<br />Powder Drink</h2>
              <p className={styles.prodDesc}>
                Minuman serbuk ekstrak alpukat premium dengan kandungan vitamin E, serat alami, dan antioksidan tinggi.
                Formulasi khusus untuk energi alami harianmu tanpa bahan kimia tambahan.
              </p>

              {/* Detail Grid */}
              <div className={styles.detailGrid}>
                {details.map((d, i) => (
                  <div key={i} className={styles.detailItem}>
                    <span className={styles.detailIcon}>{d.icon}</span>
                    <div>
                      <span className={styles.detailLabel}>{d.label}</span>
                      <strong className={styles.detailValue}>{d.value}</strong>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className={styles.priceRow}>
                <div>
                  <div className={styles.priceOld}>Rp 150.000</div>
                  <div className={styles.price}>Rp 125.000</div>
                  <div className={styles.priceNote}>/ box (10 sachet)</div>
                </div>
                <div className={styles.discBadge}>HEMAT<br />17%</div>
              </div>

              {/* CTA */}
              <div className={styles.ctaRow}>
                <button
                  id="product-buy-btn"
                  className={`btn-moeltiva-primary ${styles.ctaBtn}`}
                  onClick={handleOrder}
                >
                  👉 Beli Sekarang
                </button>
                <a
                  href={`https://wa.me/6281234567890?text=Halo, saya ingin memesan Moeltiva!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-moeltiva-outline ${styles.waBtn}`}
                  id="product-wa-btn"
                >
                  💬 Tanya via WA
                </a>
              </div>

              <p className={styles.shippingNote}>
                🚚 Gratis ongkir untuk pembelian 2 box atau lebih
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
