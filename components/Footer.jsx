'use client';

import { useState, useEffect } from 'react';
import { FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa6';
import api from '@/services/api';
import styles from './Footer.module.css';

export default function Footer() {
  const [footerData, setFooterData] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    Promise.all([
      api.get(`/footer`),
      api.get(`/profile`)
    ]).then(([footerRes, profileRes]) => {
      setFooterData(footerRes.data);
      setProfileData(profileRes.data);
    }).catch(err => console.error(err));
  }, []);

  if (!footerData || !profileData) return null;

  const socials = [
    { name: 'Instagram', icon: <FaInstagram />, href: profileData.instagramUrl },
    { name: 'TikTok', icon: <FaTiktok />, href: profileData.tiktokUrl },
    { name: 'Facebook', icon: <FaFacebook />, href: profileData.facebookUrl },
  ].filter(s => s.href);

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brandCol}>
            <div className={styles.logo}>
              <span>🥑</span>
              <strong>{profileData.companyName || 'Moeltiva'}</strong>
            </div>
            <p className={styles.tagline}>
              {footerData.subtitle}
            </p>
            <p className={styles.desc}>
              {footerData.description}
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
                <a href={`tel:${profileData.phone}`} className={styles.link}>{profileData.phone}</a>
              </li>
              <li>
                <span className={styles.contactIcon}>📧</span>
                <a href={`mailto:${profileData.email}`} className={styles.link}>{profileData.email}</a>
              </li>
              <li>
                <span className={styles.contactIcon}>📍</span>
                <span className={styles.linkText}>{profileData.address}</span>
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
            © {new Date().getFullYear()} {profileData.companyName}. All rights reserved. Made with 🥑 in Indonesia.
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
