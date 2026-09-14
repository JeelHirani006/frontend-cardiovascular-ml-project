import { useEffect, useRef } from 'react';
import SignalVisualization from '../SignalVisualization/SignalVisualization';
import styles from './Hero.module.css';

export default function Hero({ onStart }) {
  const headingRef = useRef(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    const t = setTimeout(() => {
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.vizContainer} aria-hidden="true">
        <SignalVisualization variant="hero" />
        <div className={styles.vizFade} />
      </div>

      <div className={styles.content} ref={headingRef}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowLine} />
          <span className={styles.eyebrowText}>CARDIOVASCULAR RISK INTELLIGENCE</span>
          <span className={styles.eyebrowLine} />
        </div>

        <h1 id="hero-heading" className={styles.heading}>
          Understand the signals
          <br />
          <em className={styles.headingAccent}>behind cardiovascular</em>
          <br />
          risk.
        </h1>

        <p className={styles.subheading}>
          A machine-learning assessment interface that analyzes key cardiovascular
          and lifestyle indicators to estimate your individual risk profile.
        </p>

        <div className={styles.actions}>
          <button
            id="start-assessment-btn"
            className={styles.primaryCta}
            onClick={onStart}
          >
            <span>Begin assessment</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
          <button
            className={styles.secondaryCta}
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
          >
            How it works
          </button>
        </div>

        <div className={styles.metrics}>
          <div className={styles.metric}>
            <span className={styles.metricValue}>11</span>
            <span className={styles.metricLabel}>Health indicators</span>
          </div>
          <div className={styles.metricDivider} />
          <div className={styles.metric}>
            <span className={styles.metricValue}>4</span>
            <span className={styles.metricLabel}>Assessment stages</span>
          </div>
          <div className={styles.metricDivider} />
          <div className={styles.metric}>
            <span className={styles.metricValue}>~2min</span>
            <span className={styles.metricLabel}>To complete</span>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.scrollLine} />
        <span className={styles.scrollLabel}>Scroll</span>
      </div>
    </section>
  );
}
