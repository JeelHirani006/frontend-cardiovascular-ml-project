import { useEffect, useState } from 'react';
import SignalVisualization from '../SignalVisualization/SignalVisualization';
import styles from './AnalysisLoading.module.css';

const PHASES = [
  { label: 'Collecting health signals', duration: 500 },
  { label: 'Evaluating cardiovascular indicators', duration: 600 },
  { label: 'Processing lifestyle factors', duration: 500 },
  { label: 'Generating risk assessment', duration: 600 },
];

export default function AnalysisLoading() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let elapsed = 0;
    const timers = PHASES.map((p, i) => {
      const t = setTimeout(() => setPhase(i), elapsed);
      elapsed += p.duration;
      return t;
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className={styles.container} role="status" aria-live="polite" aria-label="Analyzing cardiovascular data">
      <div className={styles.vizWrap} aria-hidden="true">
        <SignalVisualization variant="loading" />
      </div>

      <div className={styles.content}>
        <div className={styles.pulseRing} aria-hidden="true">
          <span /><span /><span />
        </div>

        <div className={styles.phaseList}>
          {PHASES.map((p, i) => (
            <div
              key={p.label}
              className={`${styles.phaseItem} ${i < phase ? styles.done : ''} ${i === phase ? styles.active : ''}`}
            >
              <span className={styles.phaseIcon} aria-hidden="true">
                {i < phase ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : i === phase ? (
                  <span className={styles.dotPulse} />
                ) : (
                  <span className={styles.dotEmpty} />
                )}
              </span>
              <span className={styles.phaseLabel}>{p.label}</span>
            </div>
          ))}
        </div>

        <p className={styles.caption}>This may take a moment</p>
      </div>
    </div>
  );
}
