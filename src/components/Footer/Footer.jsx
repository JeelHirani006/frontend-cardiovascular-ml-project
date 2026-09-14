import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.brand}>
          <svg width="16" height="16" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path
              d="M2 11 L5 11 L6.5 6 L8 16 L9.5 4 L11 18 L12.5 9 L14 13 L15.5 11 L20 11"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
          <span className={styles.brandName}>CARDIOSENSE</span>
        </div>
        <p className={styles.disclaimer}>
          For informational use only. Not a medical device. Not a diagnostic tool.
        </p>
        <p className={styles.copy}>&copy; {year} Cardiosense Intelligence</p>
      </div>
    </footer>
  );
}
