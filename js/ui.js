import { unitsMap, unitLabels } from "./data.js";
import { state } from "./state.js";

export function updateUnits() {
  const unitSelect = document.getElementById("unit");
  unitSelect.innerHTML = "";

  unitsMap[state.test].forEach(unit => {
    const opt = document.createElement("option");
    opt.value = unit;
    opt.text = unitLabels[unit];
    if (unit === state.unit) opt.selected = true;
    unitSelect.appendChild(opt);
  });
}