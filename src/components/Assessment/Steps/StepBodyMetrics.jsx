import InputField from '../InputField/InputField';
import styles from './Step.module.css';

export default function StepBodyMetrics({ formData, errors, onUpdate }) {
  const height = Number(formData.height);
  const weight = Number(formData.weight);
  const bmi = height > 0 && weight > 0 ? (weight / ((height / 100) ** 2)).toFixed(1) : null;

  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <span className={styles.stepNumber}>02</span>
        <div>
          <h2 className={styles.stepTitle}>Body metrics</h2>
          <p className={styles.stepDesc}>Your height and weight help calculate body composition indicators.</p>
        </div>
      </div>
      <div className={styles.fields}>
        <InputField
          id="height"
          label="Height"
          type="number"
          value={formData.height}
          onChange={val => onUpdate('height', val)}
          unit="cm"
          placeholder="172"
          min={50}
          max={250}
          error={errors.height}
          autoFocus
        />
        <InputField
          id="weight"
          label="Weight"
          type="number"
          value={formData.weight}
          onChange={val => onUpdate('weight', val)}
          unit="kg"
          placeholder="71"
          min={10}
          max={400}
          error={errors.weight}
        />
      </div>
      {bmi && (
        <div className={styles.bmiCard}>
          <span className={styles.bmiLabel}>CALCULATED BMI</span>
          <span className={styles.bmiValue}>{bmi}</span>
          <span className={styles.bmiCategory}>
            {bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal range' : bmi < 30 ? 'Overweight' : 'Obese'}
          </span>
        </div>
      )}
    </div>
  );
}
