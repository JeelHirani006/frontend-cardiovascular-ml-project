import styles from './RiskScore.module.css';

const CONFIG = {
  0: {
    label:    'No Risk Detected',
    sublabel: 'Low cardiovascular risk',
    icon:     (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    colorVar: 'var(--success)',
    bgVar:    'var(--success-dim)',
    textVar:  'var(--success-text)',
  },
  1: {
    label:    'Risk Detected',
    sublabel: 'Elevated cardiovascular risk',
    icon:     (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    colorVar: 'var(--danger)',
    bgVar:    'var(--danger-dim)',
    textVar:  'var(--danger-text)',
  },
};

export default function RiskScore({ prediction }) {
  const cfg = CONFIG[prediction] ?? CONFIG[0];

  return (
    <div className={styles.wrap} role="img" aria-label={cfg.label}>
      <div
        className={styles.iconRing}
        style={{ color: cfg.colorVar, background: cfg.bgVar, borderColor: cfg.colorVar }}
      >
        {cfg.icon}
      </div>

      <div className={styles.labels}>
        <span
          className={styles.verdict}
          style={{ color: cfg.textVar }}
        >
          {cfg.label}
        </span>
        <span className={styles.sublabel}>{cfg.sublabel}</span>
      </div>

      <div
        className={styles.badge}
        style={{ background: cfg.bgVar, color: cfg.textVar, borderColor: cfg.colorVar }}
      >
        {prediction === 0 ? 'Prediction: Negative (0)' : 'Prediction: Positive (1)'}
      </div>
    </div>
  );
}
