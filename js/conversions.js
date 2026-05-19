import { conversionFactors } from "./data.js";

const URIC_MGDL_TO_UMOL = 59.48;
const URIC_MMOL_TO_UMOL = 1000;

/**
 * Convert ANY uric acid input
 * to its standardized internal unit
 */
export function toStandardUnit(value, unit, test) {
  if (test === "uric_acid") {
    if (unit === "mgdl") return value * URIC_MGDL_TO_UMOL;
    if (unit === "mmol") return value * URIC_MMOL_TO_UMOL;
    if (unit === "umol") return value;
  }

  const factor = conversionFactors[test];

  return unit === "mgdl"
    ? value * factor
    : value;
}

/**
 * Display conversions
 */
export function convertValue(value, unit, test) {
  if (test === "uric_acid") {
    let umol;

    if (unit === "mgdl") {
      umol = value * URIC_MGDL_TO_UMOL;

      return {
        primary: `${value.toFixed(2)} mg/dL`,
        secondary: `${umol.toFixed(2)} µmol/L`
      };
    }

    if (unit === "mmol") {
      umol = value * URIC_MMOL_TO_UMOL;

      return {
        primary: `${value.toFixed(2)} mmol/L`,
        secondary: `${umol.toFixed(2)} µmol/L`
      };
    }

    // already standardized
    return {
      primary: `${value.toFixed(2)} µmol/L`,
      secondary: "Already in standard unit"
    };
  }

  const factor = conversionFactors[test];

  if (unit === "mgdl") {
    return {
      primary: `${value.toFixed(2)} mg/dL`,
      secondary: `${(value * factor).toFixed(2)} mmol/L`
    };
  }

  return {
    primary: `${value.toFixed(2)} mmol/L`,
    secondary: `${(value / factor).toFixed(2)} mg/dL`
  };
}