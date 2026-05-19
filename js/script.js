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

  // --------------------
  // CHOL / HDL MODE
  // --------------------
  if (state.test === "chol_hdl_ratio") {
    const tc = Number(document.getElementById("totalChol").value);
    const hdl = Number(document.getElementById("hdl").value);

    if (!tc || !hdl) {
      el.innerHTML = `
        <div class="text-sm text-gray-500">
          Enter valid cholesterol values
        </div>
      `;
      return;
    }

    const ratio = +(tc / hdl).toFixed(2);
    const interp = interpretRatio(ratio);

    el.innerHTML = `
      <div class="text-3xl font-bold text-gray-900">${ratio}</div>
      <div class="text-sm mt-1 ${interp.color}">
        ${interp.text}
      </div>
    `;
    return;
  }

  // --------------------
  // EMPTY STATE
  // --------------------
  if (state.value === null) {
    el.innerHTML = `
      <div class="text-sm text-gray-500">
        Enter a value to generate clinical interpretation
      </div>
    `;
    return;
  }

  // --------------------
  // CALCULATIONS
  // --------------------
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

  if (!ref || !crit) {
    el.innerHTML = `
      <div class="text-sm text-red-600">
        Configuration error: missing reference data
      </div>
    `;
    return;
  }

  // --------------------
  // CLINICAL CLASSIFICATION
  // --------------------
  let status = "NORMAL";
  let color = "text-green-700";
  let bg = "bg-green-50";
  let border = "border-green-200";

  if (standardized <= crit.low) {
    status = "CRITICAL LOW";
    color = "text-red-800";
    bg = "bg-red-50";
    border = "border-red-300";
  } else if (standardized >= crit.high) {
    status = "CRITICAL HIGH";
    color = "text-red-800";
    bg = "bg-red-50";
    border = "border-red-300";
  } else if (standardized < ref.min) {
    status = "LOW";
    color = "text-yellow-700";
    bg = "bg-yellow-50";
    border = "border-yellow-300";
  } else if (standardized > ref.max) {
    status = "HIGH";
    color = "text-orange-700";
    bg = "bg-orange-50";
    border = "border-orange-300";
  }

  // -------------------- FIXED INTERPRETATION MAPPING --------------------
  const baseKey = status.includes("LOW")
    ? "Low"
    : status.includes("HIGH")
    ? "High"
    : "Normal";

  const msg = interpretations[state.test]?.[baseKey] || "";

  // -------------------- SEVERITY BAR --------------------
  const severityBar = (() => {
    const min = ref.min;
    const max = ref.max;
    const low = crit.low;
    const high = crit.high;

    const range = max - min || 1;

    let position = 50;

    if (standardized <= low) {
      position = 10;
    } else if (standardized >= high) {
      position = 90;
    } else {
      position = 20 + ((standardized - min) / range) * 60;
    }

    position = Math.min(95, Math.max(5, position));

    return `
      <div class="mt-3">
        <div class="h-2 w-full bg-gray-200 rounded-full relative overflow-hidden">

          <div class="absolute left-0 top-0 h-full w-1/5 bg-yellow-300"></div>
          <div class="absolute left-1/5 top-0 h-full w-2/5 bg-green-400"></div>
          <div class="absolute left-3/5 top-0 h-full w-1/5 bg-orange-400"></div>
          <div class="absolute right-0 top-0 h-full w-1/5 bg-red-500"></div>

          <div
            class="absolute top-0 h-full w-1 bg-black"
            style="left:${position}%; transform:translateX(-50%)"
          ></div>

        </div>

        <div class="flex justify-between text-[10px] text-gray-500 mt-1">
          <span>Low</span>
          <span>Normal</span>
          <span>High</span>
          <span>Critical</span>
        </div>
      </div>
    `;
  })();

  // -------------------- FINAL UI --------------------
  el.innerHTML = `
    <div class="space-y-3">

      <div>
        <div class="text-3xl font-bold text-gray-900">
          ${primary}
        </div>
        <div class="text-sm text-gray-500">
          ${secondary}
        </div>
      </div>

      <div class="inline-block px-3 py-1 rounded-full text-xs font-semibold border ${bg} ${color} ${border}">
        ${status}
      </div>

      <div class="text-xs text-gray-600">
        Reference Range:
        <span class="font-medium">
          ${ref.min} – ${ref.max} ${standardUnits[state.test]}
        </span>
      </div>

      ${severityBar}

      <div class="p-3 rounded-lg border ${border} ${bg}">
        <div class="text-sm font-semibold ${color}">
          Clinical Interpretation
        </div>
        <div class="text-sm text-gray-700 mt-1">
          ${msg}
        </div>
      </div>

    </div>
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
