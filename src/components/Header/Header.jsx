import { useEffect, useState } from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.css';

export default function Header({ theme, onToggleTheme, onLogoClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
      <div className={styles.inner}>
        <button
          className={styles.logo}
          onClick={onLogoClick}
          aria-label="Cardiosense — Return to home"
        >
          <div className={styles.logoIcon} aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M2 11 L5 11 L6.5 6 L8 16 L9.5 4 L11 18 L12.5 9 L14 13 L15.5 11 L20 11"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoWordmark}>CARDIO<em>SENSE</em></span>
          </div>
        </button>

        <nav className={styles.nav} role="navigation" aria-label="Primary navigation">
          <button
            className={styles.navLink}
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
          >
            How it works
          </button>
          <div className={styles.statusBadge} aria-label="System status: operational">
            <span className={styles.statusDot} aria-hidden="true" />
            <span className={styles.statusText}>System online</span>
          </div>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </nav>
      </div>
    </header>
  );
}
