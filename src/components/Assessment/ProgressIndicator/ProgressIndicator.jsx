import styles from './ProgressIndicator.module.css';
import { STEPS } from '../../../hooks/useAssessment';

export default function ProgressIndicator({ currentStep, onGoToStep, completedSteps }) {
  return (
    <nav className={styles.nav} aria-label="Assessment progress">
      <ol className={styles.list}>
        {STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isActive = index === currentStep;
          const isClickable = isCompleted && index !== currentStep;

          return (
            <li key={step.id} className={styles.item}>
              <button
                className={`${styles.step} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}
                onClick={() => isClickable && onGoToStep(index)}
                disabled={!isClickable && !isActive}
                aria-label={`Step ${step.number}: ${step.label}${isCompleted ? ' (completed)' : isActive ? ' (current)' : ''}`}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className={styles.number}>{isCompleted ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : step.number}</span>
                <span className={styles.label}>{step.label}</span>
              </button>
              {index < STEPS.length - 1 && (
                <div
                  className={`${styles.connector} ${isCompleted ? styles.connectorFilled : ''}`}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
