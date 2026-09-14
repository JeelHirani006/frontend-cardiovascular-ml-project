import styles from './InputField.module.css';

export default function InputField({
  id,
  label,
  value,
  onChange,
  type = 'number',
  unit,
  placeholder,
  error,
  min,
  max,
  hint,
  autoFocus,
}) {
  return (
    <div className={`${styles.field} ${error ? styles.hasError : ''}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {hint && <span className={styles.hint}>{hint}</span>}
      <div className={styles.inputWrapper}>
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={styles.input}
          placeholder={placeholder}
          min={min}
          max={max}
          autoFocus={autoFocus}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
        />
        {unit && <span className={styles.unit} aria-label={unit}>{unit}</span>}
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
