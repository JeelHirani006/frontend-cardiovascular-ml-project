import { useState } from 'react';
import ProgressIndicator from './ProgressIndicator/ProgressIndicator';
import NavigationControls from './NavigationControls/NavigationControls';
import StepAboutYou from './Steps/StepAboutYou';
import StepBodyMetrics from './Steps/StepBodyMetrics';
import StepCardiovascular from './Steps/StepCardiovascular';
import StepLifestyle from './Steps/StepLifestyle';
import StepReview from './Steps/StepReview';
import styles from './Assessment.module.css';

const STEP_COMPONENTS = [
  StepAboutYou,
  StepBodyMetrics,
  StepCardiovascular,
  StepLifestyle,
  StepReview,
];

export default function Assessment({
  currentStep,
  formData,
  errors,
  onUpdate,
  onNext,
  onBack,
  onSubmit,
  onGoToStep,
}) {
  const [completedSteps] = useState([]);
  const isReview = currentStep === STEP_COMPONENTS.length - 1;
  const StepComponent = STEP_COMPONENTS[currentStep];

  // Track which steps the user has passed through
  const visitedSteps = Array.from({ length: currentStep }, (_, i) => i);

  return (
    <section className={styles.assessment} aria-label="Cardiovascular assessment">
      <div className={styles.inner}>
        <ProgressIndicator
          currentStep={currentStep}
          completedSteps={visitedSteps}
          onGoToStep={onGoToStep}
        />

        <div className={styles.stepWrap} key={currentStep}>
          <StepComponent
            formData={formData}
            errors={errors}
            onUpdate={onUpdate}
          />
        </div>

        <NavigationControls
          onBack={onBack}
          onNext={isReview ? onSubmit : onNext}
          nextLabel={isReview ? 'Analyze cardiovascular risk →' : 'Continue'}
          showBack={currentStep > 0}
        />
      </div>
    </section>
  );
}
