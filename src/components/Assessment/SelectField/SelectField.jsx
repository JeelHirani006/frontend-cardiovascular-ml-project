import styles from './SelectField.module.css';

export default function SelectField({ id, label, options, value, onChange, error, hint }) {
  return (
    <div className={`${styles.field} ${error ? styles.hasError : ''}`}>
      <label className={styles.label}>{label}</label>
      {hint && <span className={styles.hint}>{hint}</span>}
      <div className={styles.options} role="radiogroup" aria-labelledby={`${id}-label`} aria-describedby={error ? `${id}-error` : undefined}>
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`${styles.option} ${String(value) === String(opt.value) ? styles.selected : ''}`}
            htmlFor={`${id}-${opt.value}`}
          >
            <input
              type="radio"
              id={`${id}-${opt.value}`}
              name={id}
              value={opt.value}
              checked={String(value) === String(opt.value)}
              onChange={() => onChange(opt.value)}
              className={styles.radio}
              aria-label={opt.label}
            />
            <span className={styles.optionDot} aria-hidden="true" />
            <span className={styles.optionContent}>
              <span className={styles.optionLabel}>{opt.label}</span>
              {opt.description && <span className={styles.optionDesc}>{opt.description}</span>}
            </span>
            {opt.icon && <span className={styles.optionIcon} aria-hidden="true">{opt.icon}</span>}
          </label>
        ))}
      </div>
      {error && (
        <span id={`${id}-error`} className={styles.error} role="alert">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}
