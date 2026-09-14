import InputField from '../InputField/InputField';
import SelectField from '../SelectField/SelectField';
import styles from './Step.module.css';

const CHOLESTEROL_OPTIONS = [
  { value: '1', label: 'Normal', description: 'Within healthy range' },
  { value: '2', label: 'Above normal', description: 'Slightly elevated' },
  { value: '3', label: 'Well above normal', description: 'Significantly elevated' },
];

const GLUCOSE_OPTIONS = [
  { value: '1', label: 'Normal', description: 'Within healthy range' },
  { value: '2', label: 'Above normal', description: 'Slightly elevated' },
  { value: '3', label: 'Well above normal', description: 'Significantly elevated' },
];

export default function StepCardiovascular({ formData, errors, onUpdate }) {
  const systolic = Number(formData.systolicBP);
  const diastolic = Number(formData.diastolicBP);
  let bpCategory = null;
  if (systolic > 0 && diastolic > 0) {
    if (systolic < 120 && diastolic < 80) bpCategory = { label: 'Normal', color: 'success' };
    else if (systolic < 130 && diastolic < 80) bpCategory = { label: 'Elevated', color: 'warning' };
    else if (systolic < 140 || diastolic < 90) bpCategory = { label: 'Stage 1 Hypertension', color: 'warning' };
    else bpCategory = { label: 'Stage 2 Hypertension', color: 'danger' };
  }

  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <span className={styles.stepNumber}>03</span>
        <div>
          <h2 className={styles.stepTitle}>Cardiovascular signals</h2>
          <p className={styles.stepDesc}>Blood pressure and metabolic markers are primary cardiovascular indicators.</p>
        </div>
      </div>
      <div className={styles.fields}>
        <div className={styles.bpGroup}>
          <InputField
            id="systolicBP"
            label="Systolic pressure"
            type="number"
            value={formData.systolicBP}
            onChange={val => onUpdate('systolicBP', val)}
            unit="mmHg"
            placeholder="120"
            min={50}
            max={250}
            error={errors.systolicBP}
            hint="Upper number when taking blood pressure"
            autoFocus
          />
          <InputField
            id="diastolicBP"
            label="Diastolic pressure"
            type="number"
            value={formData.diastolicBP}
            onChange={val => onUpdate('diastolicBP', val)}
            unit="mmHg"
            placeholder="80"
            min={30}
            max={150}
            error={errors.diastolicBP}
            hint="Lower number when taking blood pressure"
          />
        </div>
        {bpCategory && (
          <div className={`${styles.bpBadge} ${styles[bpCategory.color]}`}>
            <span className={styles.bpDot} />
            <span>{formData.systolicBP} / {formData.diastolicBP} mmHg — {bpCategory.label}</span>
          </div>
        )}
        <SelectField
          id="cholesterol"
          label="Cholesterol level"
          options={CHOLESTEROL_OPTIONS}
          value={formData.cholesterol}
          onChange={val => onUpdate('cholesterol', val)}
          error={errors.cholesterol}
          hint="Based on your most recent blood test result"
        />
        <SelectField
          id="glucose"
          label="Glucose level"
          options={GLUCOSE_OPTIONS}
          value={formData.glucose}
          onChange={val => onUpdate('glucose', val)}
          error={errors.glucose}
          hint="Fasting blood glucose measurement"
        />
      </div>
    </div>
  );
}
