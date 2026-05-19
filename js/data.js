export const unitsMap = {
  phosphate: ["mgdl", "mmol"],
  magnesium: ["mgdl", "mmol"],
  uric_acid: ["mgdl", "umol", "mmol"],
  chol_hdl_ratio: ["ratio"]
};

export const unitLabels = {
  mgdl: "mg/dL",
  mmol: "mmol/L",
  umol: "µmol/L"
};

export const standardUnits = {
  phosphate: "mmol/L",
  magnesium: "mmol/L",
  uric_acid: "µmol/L"
};

export const conversionFactors = {
  phosphate: 0.323,
  magnesium: 0.411
};

export const referenceRanges = {
  phosphate: { min: 0.80, max: 1.50 },
  magnesium: { min: 0.75, max: 0.95 },
   uric_acid: { min: 150, max: 420 }
};

export const criticalRanges = {
  phosphate: { low: 0.50, high: 2.50 },
  magnesium: { low: 0.50, high: 1.50 },
  uric_acid: { low: 100, high: 600 }
};

export const interpretations = {
  phosphate: {
    Low: "Possible hypophosphatemia...",
    Normal: "Normal phosphate level.",
    High: "Possible hyperphosphatemia..."
  },
  magnesium: {
    Low: "Possible hypomagnesemia...",
    Normal: "Normal magnesium level.",
    High: "Possible hypermagnesemia..."
  },
  uric_acid: {
    Low: "Low uric acid...",
    Normal: "Normal uric acid.",
    High: "Possible hyperuricemia..."
  }
};

export function interpretRatio(ratio) {
  if (ratio < 3.5) return { text: "Low risk", color: "text-green-600" };
  if (ratio < 5) return { text: "Moderate risk", color: "text-yellow-600" };
  if (ratio < 6) return { text: "High risk", color: "text-orange-600" };
  return { text: "Very high risk", color: "text-red-700 font-bold" };
}