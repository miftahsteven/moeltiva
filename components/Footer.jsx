import styles from './Footer.module.css';

const socials = [
  { name: 'Instagram', icon: '📸', href: 'https://instagram.com/moeltiva' },
  { name: 'TikTok', icon: '🎵', href: 'https://tiktok.com/@moeltiva' },
  { name: 'Facebook', icon: '📘', href: 'https://facebook.com/moeltiva' },
];

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brandCol}>
            <div className={styles.logo}>
              <span>🥑</span>
              <strong>Moeltiva</strong>
            </div>
            <p className={styles.tagline}>
              Hidup sehat dari alam, lebih mudah.
            </p>
            <p className={styles.desc}>
              Moeltiva adalah minuman serbuk ekstrak alpukat premium untuk energi alami harianmu.
              100% bahan alami, vegan friendly, tanpa pengawet.
            </p>
            <div className={styles.socials}>
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label={`Moeltiva di ${s.name}`}
                  id={`footer-social-${s.name.toLowerCase()}`}
                >
                  <span>{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* About */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Tentang Moeltiva</h4>
            <ul className={styles.linkList}>
              <li><a href="#home" className={styles.link}>Beranda</a></li>
              <li><a href="#produk" className={styles.link}>Produk Kami</a></li>
              <li><a href="#manfaat" className={styles.link}>Manfaat</a></li>
              <li><a href="#testimoni" className={styles.link}>Testimoni</a></li>
              <li><a href="#order" className={styles.link}>Pemesanan</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Hubungi Kami</h4>
            <ul className={styles.contactList}>
              <li>
                <span className={styles.contactIcon}>📞</span>
                <a href="tel:+6281234567890" className={styles.link}>+62 812-3456-7890</a>
              </li>
              <li>
                <span className={styles.contactIcon}>📧</span>
                <a href="mailto:hello@moeltiva.id" className={styles.link}>hello@moeltiva.id</a>
              </li>
              <li>
                <span className={styles.contactIcon}>📍</span>
                <span className={styles.linkText}>Jakarta, Indonesia</span>
              </li>
              <li>
                <span className={styles.contactIcon}>⏰</span>
                <span className={styles.linkText}>Senin–Sabtu, 08.00–17.00 WIB</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} Moeltiva. All rights reserved. Made with 🥑 in Indonesia.
          </p>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>Kebijakan Privasi</a>
            <span className={styles.sep}>·</span>
            <a href="#" className={styles.bottomLink}>Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
