import styles from './ErrorState.module.css';

export default function ErrorState({ message, onRetry, onRestart }) {
  return (
    <section className={styles.container} role="alert" aria-label="Assessment error">
      <div className={styles.inner}>
        <div className={styles.iconWrap} aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h2 className={styles.title}>Assessment unavailable</h2>
        <p className={styles.message}>
          We couldn't complete the assessment. This may be a temporary issue.
        </p>
        {message && (
          <p className={styles.detail}>{message}</p>
        )}
        <div className={styles.actions}>
          <button className={styles.retryBtn} onClick={onRetry}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="1 4 1 10 7 10"/>
              <path d="M3.51 15a9 9 0 1 0 .49-3.11"/>
            </svg>
            Try again
          </button>
          <button className={styles.homeBtn} onClick={onRestart}>
            Return to home
          </button>
        </div>
      </div>
    </section>
  );
}
