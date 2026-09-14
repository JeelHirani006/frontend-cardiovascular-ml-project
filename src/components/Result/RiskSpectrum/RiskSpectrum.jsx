import { useEffect, useRef } from 'react';
import styles from './RiskSpectrum.module.css';

export default function RiskSpectrum({ probability, riskLevel }) {
  const markerRef = useRef(null);
  const pct = Math.round((probability || 0) * 100);

  useEffect(() => {
    if (!markerRef.current) return;
    const t = setTimeout(() => {
      if (markerRef.current) {
        markerRef.current.style.transition = 'left 1.0s cubic-bezier(0.22, 1, 0.36, 1)';
        markerRef.current.style.left = `calc(${pct}% - 8px)`;
      }
    }, 300);
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <div className={styles.spectrum}>
      <div className={styles.header}>
        <span className={styles.label}>RISK SPECTRUM</span>
        <span className={styles.value}>{pct}th percentile</span>
      </div>

      <div className={styles.track} role="img" aria-label={`Risk level: ${riskLevel}, ${pct}%`}>
        <div className={styles.gradient} />
        <div
          ref={markerRef}
          className={styles.marker}
          style={{ left: '0px' }}
          aria-hidden="true"
        >
          <span className={styles.markerDot} />
          <span className={styles.markerLabel}>{pct}%</span>
        </div>
      </div>

      <div className={styles.legend}>
        <span className={styles.legendLow}>Low</span>
        <span className={styles.legendMod}>Moderate</span>
        <span className={styles.legendHigh}>High</span>
      </div>
    </div>
  );
}
