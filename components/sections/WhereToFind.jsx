'use client';

import styles from './WhereToFind.module.css';

const marketplaces = [
  {
    name: 'Shopee',
    handle: 'moeltiva.id',
    link: 'https://shopee.co.id/moeltiva.id',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg'
  },
  {
    name: 'Tokopedia',
    handle: 'moeltiva.id',
    link: 'https://www.tokopedia.com/moeltiva.id',
    logo: '/moeltiva-images/tokopedia.png'
  },
  {
    name: 'Instagram',
    handle: 'moeltiva.id',
    link: 'https://www.instagram.com/moeltiva.id',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg'
  },
  {
    name: 'TikTok',
    handle: '@moeltiva.id',
    link: 'https://www.tiktok.com/@moeltiva.id',
    logo: 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg'
  }
];

export default function WhereToFind() {
  return (
    <section id="find-us" className={styles.section} aria-label="Where to find Moeltiva section">
      <div className={styles.container}>
        <div className={`${styles.header} reveal`}>
          <div className="section-label mb-2">✦ Storefronts</div>
          <h2 className={styles.title}>Where to find?</h2>
          <p className={styles.subtitle}>Dapatkan Moeltiva di marketplace dan media sosial favorit Anda.</p>
        </div>

        <div className={`${styles.cardBlock} reveal`}>
          {/* Marketplaces */}
          <div className={styles.marketRow}>
            {marketplaces.map((item) => (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.marketItem}
              >
                <div className={styles.iconWrap}>
                  <img src={item.logo} alt={item.name} className={styles.marketLogo} />
                </div>
                <span className={styles.marketName}>{item.name}</span>
                {/* <span className={styles.handle}>{item.handle}</span> */}
              </a>
            ))}
          </div>

          {/* Certifications */}
          <div className={styles.certSection}>
            <h3 className={styles.certTitle}>Sertifikasi & Kualitas</h3>
            <div className={styles.certStripWrap}>
              <img
                src="/moeltiva-images/cert.png"
                alt="Moeltiva Certifications: Halal, BPOM, GMP, Tested Lab"
                className={styles.certStrip}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
