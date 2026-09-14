import styles from './StepReview.module.css';

const CHOLESTEROL_LABELS = { '1': 'Normal', '2': 'Above normal', '3': 'Well above normal' };
const GLUCOSE_LABELS    = { '1': 'Normal', '2': 'Above normal', '3': 'Well above normal' };
const GENDER_LABELS     = { '1': 'Female', '2': 'Male' };

function ReviewRow({ label, value }) {
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <span className={styles.rowValue}>{value || '—'}</span>
    </div>
  );
}

function ReviewSection({ title, children }) {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <div className={styles.sectionBody}>{children}</div>
    </div>
  );
}

export default function StepReview({ formData }) {
  const height = Number(formData.height);
  const weight = Number(formData.weight);
  const bmi = height > 0 && weight > 0 ? (weight / ((height / 100) ** 2)).toFixed(1) : null;

  return (
    <div className={styles.review}>
      <div className={styles.header}>
        <span className={styles.stepNumber}>05</span>
        <div>
          <h2 className={styles.title}>Ready to analyze</h2>
          <p className={styles.desc}>Review your information before generating the assessment. You can go back to edit any section.</p>
        </div>
      </div>

      <div className={styles.grid}>
        <ReviewSection title="Personal">
          <ReviewRow label="Age" value={formData.age ? `${formData.age} yrs` : null} />
          <ReviewRow label="Gender" value={GENDER_LABELS[formData.gender]} />
        </ReviewSection>

        <ReviewSection title="Body metrics">
          <ReviewRow label="Height" value={formData.height ? `${formData.height} cm` : null} />
          <ReviewRow label="Weight" value={formData.weight ? `${formData.weight} kg` : null} />
          {bmi && <ReviewRow label="BMI" value={bmi} />}
        </ReviewSection>

        <ReviewSection title="Cardiovascular">
          <ReviewRow
            label="Blood pressure"
            value={(formData.systolicBP && formData.diastolicBP) ? `${formData.systolicBP} / ${formData.diastolicBP} mmHg` : null}
          />
          <ReviewRow label="Cholesterol" value={CHOLESTEROL_LABELS[formData.cholesterol]} />
          <ReviewRow label="Glucose" value={GLUCOSE_LABELS[formData.glucose]} />
        </ReviewSection>

        <ReviewSection title="Lifestyle">
          <ReviewRow label="Smoking" value={formData.smoking === '1' ? 'Yes' : formData.smoking === '0' ? 'No' : null} />
          <ReviewRow label="Alcohol" value={formData.alcohol === '1' ? 'Yes' : formData.alcohol === '0' ? 'No' : null} />
          <ReviewRow label="Physical activity" value={formData.active === '1' ? 'Active' : formData.active === '0' ? 'Sedentary' : null} />
        </ReviewSection>
      </div>

      <div className={styles.notice}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>The analysis uses a machine-learning model. Results are indicative only.</span>
      </div>
    </div>
  );
}
