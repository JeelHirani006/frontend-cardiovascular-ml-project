import SelectField from '../SelectField/SelectField';
import styles from './Step.module.css';

const YES_NO = [
  { value: '1', label: 'Yes' },
  { value: '0', label: 'No' },
];

const ACTIVE_OPTIONS = [
  { value: '1', label: 'Physically active', description: 'Regular exercise or physically demanding work' },
  { value: '0', label: 'Sedentary', description: 'Little or no regular physical activity' },
];

export default function StepLifestyle({ formData, errors, onUpdate }) {
  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <span className={styles.stepNumber}>04</span>
        <div>
          <h2 className={styles.stepTitle}>Lifestyle</h2>
          <p className={styles.stepDesc}>Behavioral factors that influence long-term cardiovascular health.</p>
        </div>
      </div>
      <div className={styles.fields}>
        <SelectField
          id="smoking"
          label="Smoking"
          options={YES_NO}
          value={formData.smoking}
          onChange={val => onUpdate('smoking', val)}
          error={errors.smoking}
          hint="Current tobacco use"
        />
        <SelectField
          id="alcohol"
          label="Alcohol consumption"
          options={YES_NO}
          value={formData.alcohol}
          onChange={val => onUpdate('alcohol', val)}
          error={errors.alcohol}
          hint="Regular alcohol use"
        />
        <SelectField
          id="active"
          label="Physical activity"
          options={ACTIVE_OPTIONS}
          value={formData.active}
          onChange={val => onUpdate('active', val)}
          error={errors.active}
        />
      </div>
    </div>
  );
}
