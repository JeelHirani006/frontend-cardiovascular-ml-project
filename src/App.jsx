import { useTheme } from './hooks/useTheme';
import { useAssessment } from './hooks/useAssessment';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Assessment from './components/Assessment/Assessment';
import AnalysisLoading from './components/AnalysisLoading/AnalysisLoading';
import Result from './components/Result/Result';
import ErrorState from './components/Result/ErrorState/ErrorState';
import Footer from './components/Footer/Footer';
import './App.css';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const {
    currentStep,
    formData,
    errors,
    status,
    result,
    apiError,
    updateField,
    goToStep,
    nextStep,
    prevStep,
    startAssessment,
    submitAssessment,
    retryAssessment,
    resetToHome,
  } = useAssessment();

  const handleLogoClick = () => {
    if (status !== 'idle') {
      resetToHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="app" data-status={status}>
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onLogoClick={handleLogoClick}
      />

      <main id="main-content">
        {status === 'idle' && (
          <>
            <Hero onStart={startAssessment} />
            <HowItWorks />
          </>
        )}

        {status === 'assessing' && (
          <Assessment
            currentStep={currentStep}
            formData={formData}
            errors={errors}
            onUpdate={updateField}
            onNext={nextStep}
            onBack={prevStep}
            onSubmit={submitAssessment}
            onGoToStep={goToStep}
          />
        )}

        {status === 'loading' && <AnalysisLoading />}

        {status === 'result' && result && (
          <Result
            result={result}
            formData={formData}
            onRestart={resetToHome}
          />
        )}

        {status === 'error' && (
          <ErrorState
            message={apiError}
            onRetry={retryAssessment}
            onRestart={resetToHome}
          />
        )}
      </main>

      {(status === 'idle') && <Footer />}
    </div>
  );
}
