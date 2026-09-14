/**
 * Form validation utilities.
 * Each validator returns null (valid) or a human-readable error string.
 */

export const validators = {
  age: (value) => {
    const num = Number(value);
    if (!value && value !== 0) return 'Age is required.';
    if (isNaN(num) || !Number.isInteger(num)) return 'Please enter a whole number for age.';
    if (num < 1 || num > 120) return 'Please enter an age between 1 and 120.';
    return null;
  },

  gender: (value) => {
    if (!value) return 'Please select a gender.';
    return null;
  },

  height: (value) => {
    const num = Number(value);
    if (!value && value !== 0) return 'Height is required.';
    if (isNaN(num)) return 'Please enter a valid height in centimetres.';
    if (num < 50 || num > 250) return 'Please enter a height between 50 and 250 cm.';
    return null;
  },

  weight: (value) => {
    const num = Number(value);
    if (!value && value !== 0) return 'Weight is required.';
    if (isNaN(num)) return 'Please enter a valid weight in kilograms.';
    if (num < 10 || num > 400) return 'Please enter a weight between 10 and 400 kg.';
    return null;
  },

  systolicBP: (value) => {
    const num = Number(value);
    if (!value && value !== 0) return 'Systolic blood pressure is required.';
    if (isNaN(num) || !Number.isInteger(num)) return 'Please enter a whole number.';
    if (num < 50 || num > 250) return 'Please enter a systolic pressure between 50 and 250 mmHg.';
    return null;
  },

  diastolicBP: (value) => {
    const num = Number(value);
    if (!value && value !== 0) return 'Diastolic blood pressure is required.';
    if (isNaN(num) || !Number.isInteger(num)) return 'Please enter a whole number.';
    if (num < 30 || num > 150) return 'Please enter a diastolic pressure between 30 and 150 mmHg.';
    return null;
  },

  cholesterol: (value) => {
    if (!value) return 'Please select a cholesterol level.';
    return null;
  },

  glucose: (value) => {
    if (!value) return 'Please select a glucose level.';
    return null;
  },

  smoking: (value) => {
    if (value === null || value === undefined || value === '') return 'Please indicate smoking status.';
    return null;
  },

  alcohol: (value) => {
    if (value === null || value === undefined || value === '') return 'Please indicate alcohol consumption.';
    return null;
  },

  active: (value) => {
    if (value === null || value === undefined || value === '') return 'Please indicate physical activity level.';
    return null;
  },
};

/**
 * Validates a specific step's fields.
 * @param {number} step - 0-indexed step
 * @param {Object} formData
 * @returns {Object} - { fieldName: errorString | null }
 */
export function validateStep(step, formData) {
  const errors = {};

  const stepFields = [
    ['age', 'gender'],                                          // Step 0: About You
    ['height', 'weight'],                                       // Step 1: Body Metrics
    ['systolicBP', 'diastolicBP', 'cholesterol', 'glucose'],    // Step 2: Cardiovascular
    ['smoking', 'alcohol', 'active'],                           // Step 3: Lifestyle
  ];

  const fields = stepFields[step] || [];
  for (const field of fields) {
    const error = validators[field]?.(formData[field]);
    if (error) errors[field] = error;
  }

  return errors;
}

/**
 * Validates all fields at once (for review step).
 * @param {Object} formData
 * @returns {Object} - all errors
 */
export function validateAll(formData) {
  const errors = {};
  for (const [field, validator] of Object.entries(validators)) {
    const error = validator(formData[field]);
    if (error) errors[field] = error;
  }
  return errors;
}
