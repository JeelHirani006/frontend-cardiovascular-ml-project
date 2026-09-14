import styles from './NavigationControls.module.css';

export default function NavigationControls({ onBack, onNext, nextLabel = 'Continue', showBack = true, isLoading = false, disabled = false }) {
  return (
    <div className={styles.controls}>
      {showBack && (
        <button className={styles.backBtn} onClick={onBack} type="button" aria-label="Go to previous step">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          <span>Back</span>
        </button>
      )}
      <button
        className={`${styles.nextBtn} ${isLoading ? styles.loading : ''}`}
        onClick={onNext}
        type="button"
        disabled={disabled || isLoading}
        aria-label={nextLabel}
      >
        {isLoading ? (
          <>
            <span className={styles.spinner} aria-hidden="true" />
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            <span>{nextLabel}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </>
        )}
      </button>
    </div>
  );
}
