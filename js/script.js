import { state } from "./state.js";
import {
  unitsMap,
  referenceRanges,
  criticalRanges,
  interpretations,
  interpretRatio,
  standardUnits,
} from "./data.js";

import { updateUnits } from "./ui.js";
import { toStandardUnit, convertValue } from "./conversions.js";

// -------------------- INIT --------------------
function init() {
  document.getElementById("test").addEventListener("change", onTestChange);
  document.getElementById("unit").addEventListener("change", onUnitChange);
  document.getElementById("value").addEventListener("input", onValueInput);
  document.getElementById("clearValue").addEventListener("click", resetInputs);

  document.getElementById("totalChol")?.addEventListener("input", render);
  document.getElementById("hdl")?.addEventListener("input", render);

  initPWA();

  updateUnits();
  render();
}

// -------------------- RESET --------------------
function resetInputs() {
  state.value = null;

  document.getElementById("value").value = "";
  document.getElementById("totalChol").value = "";
  document.getElementById("hdl").value = "";

  render();
}

// -------------------- EVENTS --------------------
function onTestChange(e) {
  state.test = e.target.value;
  state.unit = unitsMap[state.test][0];

  resetInputs();

  const chol = document.getElementById("cholesterolInputs");
  const valueInput = document.getElementById("value");
  const unit = document.getElementById("unit");

  const isRatio = state.test === "chol_hdl_ratio";

  chol.classList.toggle("hidden", !isRatio);
  valueInput.classList.toggle("hidden", isRatio);
  unit.classList.toggle("hidden", isRatio);

  updateUnits();
  render();
}

function onUnitChange(e) {
  state.unit = e.target.value;
  render();
}

function onValueInput(e) {
  const v = Number(e.target.value);
  state.value = Number.isFinite(v) ? v : null;
  render();
}

// -------------------- RENDER --------------------
function render() {
  const el = document.getElementById("result");

  // Chol/HDL ratio mode
  if (state.test === "chol_hdl_ratio") {
    const tc = Number(document.getElementById("totalChol").value);
    const hdl = Number(document.getElementById("hdl").value);

    if (!tc || !hdl) {
      el.textContent = "Enter valid cholesterol values";
      return;
    }

    const ratio = +(tc / hdl).toFixed(2);
    const interp = interpretRatio(ratio);

    el.innerHTML = `
      <div>${ratio}</div>
      <div class="${interp.color}">${interp.text}</div>
    `;
    return;
  }

  // Normal tests
  if (state.value === null) {
    el.textContent = "Enter a value";
    return;
  }

  const { primary, secondary } = convertValue(
    state.value,
    state.unit,
    state.test
  );

  const standardized = toStandardUnit(
    state.value,
    state.unit,
    state.test
  );

  const ref = referenceRanges[state.test];
  const crit = criticalRanges[state.test];

  let flag = "Normal";
  let color = "text-green-600";

  if (standardized <= crit.low) {
    flag = "Low (Critical)";
    color = "text-red-700 font-bold";
  } else if (standardized >= crit.high) {
    flag = "High (Critical)";
    color = "text-red-700 font-bold";
  } else if (standardized < ref.min) {
    flag = "Low";
    color = "text-yellow-600";
  } else if (standardized > ref.max) {
    flag = "High";
    color = "text-orange-600";
  }

  const msg =
    interpretations[state.test]?.[flag.split(" ")[0]] || "";

  el.innerHTML = `
    <div>${primary}</div>
    <div>=</div>
    <div>${secondary}</div>
    <div class="${color}">
      ${flag}
      (Ref: ${ref.min}–${ref.max} ${standardUnits[state.test]})
    </div>
    <div>${msg}</div>
  `;
}

// -------------------- PWA --------------------
let installBtn;
let deferredPrompt;
let ready = false;

function initPWA() {
  if (ready) return;
  ready = true;

  installBtn = document.getElementById("installBtn");

  if (!installBtn) return;

  if (window.matchMedia("(display-mode: standalone)").matches) {
    installBtn.style.display = "none";
    return;
  }

  installBtn.addEventListener("click", installApp);

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    installBtn.classList.remove("opacity-0", "pointer-events-none");
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    hideInstall();
  });
}

function installApp() {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();

  deferredPrompt.userChoice.finally(() => {
    deferredPrompt = null;
    hideInstall();
  });
}

function hideInstall() {
  installBtn.classList.add("opacity-0", "pointer-events-none");
}

// -------------------- START --------------------
init();
