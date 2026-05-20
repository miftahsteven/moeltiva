'use client';

import { useState, useEffect } from 'react';
import api from '@/services/api';
import styles from './Header.module.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Produk', href: '#produk' },
  { label: 'Manfaat', href: '#manfaat' },
  // { label: 'Testimoni', href: '#testimoni' },
  { label: 'Story', href: '#story' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Find Us', href: '#find-us' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  const [profile, setProfile] = useState(null);
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

    api.get(`/profile`).then(res => setProfile(res.data));
    api.get(`/hero`).then(res => setHero(res.data));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (e, href) => {
    if (!href || !href.startsWith('#')) {
      // Allow default link behavior for external/non-anchor links
      return;
    }
    e.preventDefault();
    setMenuOpen(false);
    setActive(href);
    const target = document.querySelector(href);
    if (target) {
      const headerH = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} id="header">
      <nav className={`container ${styles.nav}`} aria-label="Main navigation">
        {/* Logo */}
        <a href="#home" className={styles.logo} onClick={(e) => handleNav(e, '#home')}>
          <img
            src="/logo.png"
            alt="Moeltiva Logo"
            className={styles.logoImg}
          />
        </a>

        {/* Desktop Links */}
        <ul className={styles.navLinks} role="menubar">
          {navLinks.map((link) => (
            <li key={link.href} role="none">
              <a
                href={link.href}
                role="menuitem"
                className={`${styles.navLink} ${active === link.href ? styles.navLinkActive : ''}`}
                onClick={(e) => handleNav(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={hero?.buyButtonLink || '#order'}
          className={`btn-moeltiva-primary ${styles.headerCta}`}
          onClick={(e) => handleNav(e, hero?.buyButtonLink || '#order')}
          id="header-cta-btn"
          target={hero?.buyButtonLink && !hero.buyButtonLink.startsWith('#') ? '_blank' : undefined}
          rel={hero?.buyButtonLink && !hero.buyButtonLink.startsWith('#') ? 'noopener noreferrer' : undefined}
          style={{
            backgroundColor: hero?.buyButtonBg || undefined,
            color: hero?.buyButtonTextColor || undefined,
            boxShadow: hero?.buyButtonBg ? `0 4px 20px ${hero.buyButtonBg}66` : undefined
          }}
        >
          {hero?.buyButtonCta || '🛒 Beli Sekarang'}
        </a>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          id="hamburger-btn"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`} role="menu" aria-label="Mobile navigation">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            role="menuitem"
            className={styles.mobileLink}
            onClick={(e) => handleNav(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <a
          href={hero?.buyButtonLink || '#order'}
          className={`btn-moeltiva-primary mt-3 ${styles.mobileCta}`}
          onClick={(e) => handleNav(e, hero?.buyButtonLink || '#order')}
          target={hero?.buyButtonLink && !hero.buyButtonLink.startsWith('#') ? '_blank' : undefined}
          rel={hero?.buyButtonLink && !hero.buyButtonLink.startsWith('#') ? 'noopener noreferrer' : undefined}
          style={{
            backgroundColor: hero?.buyButtonBg || undefined,
            color: hero?.buyButtonTextColor || undefined,
            boxShadow: hero?.buyButtonBg ? `0 4px 20px ${hero.buyButtonBg}66` : undefined
          }}
        >
          {hero?.buyButtonCta || '🛒 Beli Sekarang'}
        </a>
      </div>
    </header>
  );
}
