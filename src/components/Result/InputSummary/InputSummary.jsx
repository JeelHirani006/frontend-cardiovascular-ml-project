import styles from './InputSummary.module.css';

const CHOLESTEROL_LABELS = { '1': 'Normal', '2': 'Above normal', '3': 'Well above normal' };
const GLUCOSE_LABELS    = { '1': 'Normal', '2': 'Above normal', '3': 'Well above normal' };
const GENDER_LABELS     = { '1': 'Female', '2': 'Male' };

function SignalRow({ label, value, status }) {
  const statusColors = {
    good:    { color: 'var(--success-text)',  bg: 'var(--success-dim)' },
    caution: { color: 'var(--warning-text)', bg: 'var(--warning-dim)' },
    alert:   { color: 'var(--danger-text)',  bg: 'var(--danger-dim)' },
    neutral: { color: 'var(--text-tertiary)', bg: 'transparent' },
  };
  const s = statusColors[status] || statusColors.neutral;
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <span className={styles.rowValue} style={{ color: s.color, background: s.bg }}>
        {value}
      </span>
    </div>
  );
}

export default function InputSummary({ formData }) {
  const systolic  = Number(formData.systolicBP);
  const diastolic = Number(formData.diastolicBP);
  const bpStatus  = systolic >= 140 || diastolic >= 90 ? 'alert'
                  : systolic >= 120 ? 'caution'
                  : 'good';
  const cholStatus = formData.cholesterol === '3' ? 'alert'
                   : formData.cholesterol === '2' ? 'caution'
                   : 'good';
  const glucStatus = formData.glucose === '3' ? 'alert'
                   : formData.glucose === '2' ? 'caution'
                   : 'good';

  const height = Number(formData.height) / 100;
  const weight = Number(formData.weight);
  const bmi    = height > 0 && weight > 0 ? (weight / (height * height)).toFixed(1) : '—';
  const bmiStatus = bmi >= 30 ? 'alert' : bmi >= 25 ? 'caution' : 'good';

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        Input signals reviewed
      </h3>
      <p className={styles.disclaimer}>These are the values you entered. Status indicators reflect general health guidelines, not model weights.</p>

      <div className={styles.groups}>
        <div className={styles.group}>
          <span className={styles.groupLabel}>Personal</span>
          <SignalRow label="Age" value={`${formData.age} yrs`} status="neutral" />
          <SignalRow label="Gender" value={GENDER_LABELS[formData.gender] || '—'} status="neutral" />
        </div>

        <div className={styles.group}>
          <span className={styles.groupLabel}>Body</span>
          <SignalRow label="Height" value={`${formData.height} cm`} status="neutral" />
          <SignalRow label="Weight" value={`${formData.weight} kg`} status="neutral" />
          <SignalRow label="BMI" value={bmi} status={bmiStatus} />
        </div>

        <div className={styles.group}>
          <span className={styles.groupLabel}>Cardiovascular</span>
          <SignalRow
            label="Blood pressure"
            value={`${formData.systolicBP} / ${formData.diastolicBP} mmHg`}
            status={bpStatus}
          />
          <SignalRow label="Cholesterol" value={CHOLESTEROL_LABELS[formData.cholesterol] || '—'} status={cholStatus} />
          <SignalRow label="Glucose"     value={GLUCOSE_LABELS[formData.glucose] || '—'}         status={glucStatus} />
        </div>

        <div className={styles.group}>
          <span className={styles.groupLabel}>Lifestyle</span>
          <SignalRow
            label="Smoking"
            value={formData.smoking === '1' ? 'Yes' : 'No'}
            status={formData.smoking === '1' ? 'alert' : 'good'}
          />
          <SignalRow
            label="Alcohol"
            value={formData.alcohol === '1' ? 'Yes' : 'No'}
            status={formData.alcohol === '1' ? 'caution' : 'good'}
          />
          <SignalRow
            label="Physical activity"
            value={formData.active === '1' ? 'Active' : 'Sedentary'}
            status={formData.active === '0' ? 'caution' : 'good'}
          />
        </div>
      </div>
    </div>
  );
}
