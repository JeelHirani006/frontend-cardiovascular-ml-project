/**
 * Cardiovascular Risk Prediction Service
 *
 * Connected to the FastAPI backend at POST /predict.
 * To change the backend URL, update API_BASE_URL below.
 */
  const apiUrl = import.meta.env.VITE_API_KEY;
const API_BASE_URL=apiUrl; 
// ─── Field value mappings (internal form → backend expectation) ───────────────
const GENDER_MAP = {
  '1': 'female',
  '2': 'male',
};

const CHOLESTEROL_MAP = {
  '1': 'normal',
  '2': 'above normal',
  '3': 'well above normal',
};

const GLUCOSE_MAP = {
  '1': 'normal',
  '2': 'above normal',
  '3': 'well above normal',
};

/**
 * Maps internal form state to the exact JSON payload the FastAPI backend expects.
 *
 * Backend schema (POST /predict):
 * {
 *   age:         number,
 *   gender:      "male" | "female",
 *   height:      number  (cm),
 *   weight:      number  (kg),
 *   ap_hi:       number  (mmHg),
 *   ap_lo:       number  (mmHg),
 *   cholesterol: "normal" | "above normal" | "well above normal",
 *   gluc:        "normal" | "above normal" | "well above normal",
 *   smoke:       boolean,
 *   alco:        boolean,
 *   active:      boolean,
 * }
 *
 * @param {Object} formData - Internal form state
 * @returns {Object} - API-ready payload
 */
export function mapFormDataToApiPayload(formData) {
  return {
    age:         Number(formData.age),
    gender:      GENDER_MAP[String(formData.gender)],
    height:      Number(formData.height),
    weight:      Number(formData.weight),
    ap_hi:       Number(formData.systolicBP),
    ap_lo:       Number(formData.diastolicBP),
    cholesterol: CHOLESTEROL_MAP[String(formData.cholesterol)],
    gluc:        GLUCOSE_MAP[String(formData.glucose)],
    smoke:       formData.smoking  === '1',
    alco:        formData.alcohol  === '1',
    active:      formData.active   === '1',
  };
}

/**
 * Calls the FastAPI prediction endpoint.
 *
 * Returns: { prediction: 0 | 1 }
 *   0 → No cardiovascular risk detected
 *   1 → Cardiovascular risk detected
 *
 * @param {Object} formData - Internal form state
 * @returns {Promise<{ prediction: 0 | 1 }>}
 */
export async function predictCardiovascularRisk(formData) {
  const payload = mapFormDataToApiPayload(formData);

  const response = await fetch(`${API_BASE_URL}/predict`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => 'Unknown error');
    throw new Error(`Prediction failed (${response.status}): ${detail}`);
  }

  const result = await response.json();
  // result = { prediction: 0 | 1 }
  return result;
}
