import styles from './BeatingHeart.module.css';

/**
 * BeatingHeart — animated SVG heart with realistic lub-dub cardiac rhythm.
 * Color adapts to the prediction result.
 *
 * @param {0|1} prediction - 0 = no risk (calm green), 1 = risk detected (red)
 */
export default function BeatingHeart({ prediction }) {
  const isRisk = prediction === 1;

  return (
    <div
      className={styles.wrap}
      aria-hidden="true"
      data-risk={isRisk}
    >
      {/* Ripple rings that pulse outward on each beat */}
      <span className={`${styles.ring} ${styles.ring1}`} />
      <span className={`${styles.ring} ${styles.ring2}`} />
      <span className={`${styles.ring} ${styles.ring3}`} />

      {/* The heart SVG */}
      <div className={styles.heart}>
        <svg
          viewBox="0 0 100 90"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svg}
        >
          {/* Gradient fill */}
          <defs>
            <radialGradient id="heartGradRisk" cx="50%" cy="40%" r="60%">
              <stop offset="0%"   stopColor="#ff6b7a" />
              <stop offset="100%" stopColor="#c0002a" />
            </radialGradient>
            <radialGradient id="heartGradSafe" cx="50%" cy="40%" r="60%">
              <stop offset="0%"   stopColor="#2dd4a4" />
              <stop offset="100%" stopColor="#0f7a5e" />
            </radialGradient>
            <filter id="heartGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Heart path — classic anatomical curve */}
          <path
            d="M50 82
               C50 82 8 55 8 28
               C8 14 18 6 30 6
               C38 6 45 11 50 18
               C55 11 62 6 70 6
               C82 6 92 14 92 28
               C92 55 50 82 50 82Z"
            fill={isRisk ? 'url(#heartGradRisk)' : 'url(#heartGradSafe)'}
            filter="url(#heartGlow)"
          />

          {/* Subtle highlight sheen */}
          <ellipse
            cx="38" cy="24" rx="12" ry="8"
            fill="white"
            opacity="0.18"
            transform="rotate(-20 38 24)"
          />
        </svg>
      </div>
    </div>
  );
}
