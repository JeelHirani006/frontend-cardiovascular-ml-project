import InputField from '../InputField/InputField';
import SelectField from '../SelectField/SelectField';
import styles from './Step.module.css';

const GENDER_OPTIONS = [
  { value: '2', label: 'Male' },
  { value: '1', label: 'Female' },
];

export default function StepAboutYou({ formData, errors, onUpdate }) {
  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <span className={styles.stepNumber}>01</span>
        <div>
          <h2 className={styles.stepTitle}>About you</h2>
          <p className={styles.stepDesc}>Basic personal information to establish your baseline profile.</p>
        </div>
      </div>
      <div className={styles.fields}>
        <InputField
          id="age"
          label="Age"
          type="number"
          value={formData.age}
          onChange={val => onUpdate('age', val)}
          unit="yrs"
          placeholder="42"
          min={1}
          max={120}
          error={errors.age}
          autoFocus
        />
        <SelectField
          id="gender"
          label="Biological sex"
          options={GENDER_OPTIONS}
          value={formData.gender}
          onChange={val => onUpdate('gender', val)}
          error={errors.gender}
          hint="Used as a statistical baseline indicator."
        />
      </div>
    </div>
  );
}
