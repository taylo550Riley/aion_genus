function calculate() {
  const level = parseInt(document.getElementById("level").value);
  const currentXP = parseInt(document.getElementById("xp").value);
  const locks = parseInt(document.getElementById("locks").value);

  const XP_REQ = {
    1: 700,
    2: 2100,
    3: 4200,
    4: 7000,
    5: 14000,
    6: 28000,
    7: 56000,
    8: 98000,
    9: 140000
  };

  const CRYSTAL_LOCK = [5, 5, 20, 45, 95, 95, 95, 95];
  const KINAH_LOCK = [1000, 1000, 4000, 9000, 19000, 19000, 19000, 19000];

  if (isNaN(level) || isNaN(currentXP) || isNaN(locks)) {
    document.getElementById("output").innerText = "please enter all values.";
    return;
  }

  if (level > 9) {
    document.getElementById("output").innerText = "max level reached.";
    return;
  }

  if (level < 1) {
    document.getElementById("output").innerText = "invalid level.";
    return;
  }

  const usableSlots = Math.min(level, 9);

  if (locks < 0 || locks >= usableSlots) {
    document.getElementById("output").innerText = "invalid lock count.";
    return;
  }

  if (currentXP < 0 || currentXP > XP_REQ[level]) {
    document.getElementById("output").innerText = "invalid current XP.";
    return;
  }

  const rerolledSlots = usableSlots - locks;

  const xpNeeded = XP_REQ[level] - currentXP;
  const xpPerRoll = rerolledSlots * 100;
  const rolls = Math.ceil(xpNeeded / xpPerRoll);

  const baseCrystals = usableSlots * 5;
  const baseKinah = usableSlots * 1000;

  let extraCrystals = 0;
  let extraKinah = 0;

  for (let i = 0; i < locks; i++) {
    extraCrystals += CRYSTAL_LOCK[i];
    extraKinah += KINAH_LOCK[i];
  }

  const crystalsPerRoll = baseCrystals + extraCrystals;
  const kinahPerRoll = baseKinah + extraKinah;

  document.getElementById("output").innerText =
    `Rolls needed: ${rolls}
    Crystals per roll: ${crystalsPerRoll}
    Kinah per roll: ${kinahPerRoll}

    TOTAL CRYSTALS: ${crystalsPerRoll * rolls}
    TOTAL KINAH: ${kinahPerRoll * rolls}`;
}

function resetForm() {
  document.getElementById("level").value = "";
  document.getElementById("xp").value = "";
  document.getElementById("locks").value = "";

  document.getElementById("output").innerText = "";
}