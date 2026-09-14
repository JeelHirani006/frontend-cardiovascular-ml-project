import { useState, useCallback } from 'react';
import { validateStep } from '../utils/validators';
import { predictCardiovascularRisk } from '../services/predictionService';

export const INITIAL_FORM_DATA = {
  age: '',
  gender: '',
  height: '',
  weight: '',
  systolicBP: '',
  diastolicBP: '',
  cholesterol: '',
  glucose: '',
  smoking: '',
  alcohol: '',
  active: '',
};

export const STEPS = [
  { id: 'about',        label: 'About you',    number: '01' },
  { id: 'body',         label: 'Body metrics',  number: '02' },
  { id: 'cardiovascular', label: 'Cardiovascular', number: '03' },
  { id: 'lifestyle',    label: 'Lifestyle',     number: '04' },
  { id: 'review',       label: 'Review',        number: '05' },
];

export function useAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | assessing | loading | result | error
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState(null);

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: null }));
  }, []);

  const goToStep = useCallback((step) => {
    setCurrentStep(step);
    setErrors({});
  }, []);

  const nextStep = useCallback(() => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return false;
    }
    setErrors({});
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    return true;
  }, [currentStep, formData]);

  const prevStep = useCallback(() => {
    setErrors({});
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const startAssessment = useCallback(() => {
    setStatus('assessing');
    setCurrentStep(0);
    setFormData(INITIAL_FORM_DATA);
    setResult(null);
    setErrors({});
    setApiError(null);
  }, []);

  const submitAssessment = useCallback(async () => {
    setStatus('loading');
    setApiError(null);
    try {
      const prediction = await predictCardiovascularRisk(formData);
      setResult(prediction);
      setStatus('result');
    } catch (err) {
      console.error('Prediction failed:', err);
      setApiError(err.message || 'An unexpected error occurred.');
      setStatus('error');
    }
  }, [formData]);

  const retryAssessment = useCallback(() => {
    setStatus('assessing');
    setCurrentStep(STEPS.length - 1); // back to review
    setApiError(null);
  }, []);

  const resetToHome = useCallback(() => {
    setStatus('idle');
    setCurrentStep(0);
    setFormData(INITIAL_FORM_DATA);
    setResult(null);
    setErrors({});
    setApiError(null);
  }, []);

  return {
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
  };
}
