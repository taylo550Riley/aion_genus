function calculate() {
  const level = parseInt(document.getElementById("level").value);
  const currentXP = parseInt(document.getElementById("xp").value);
  const locks = parseInt(document.getElementById("locks").value);

  const XP_REQ = {
    1: 1000, 2: 3000, 3: 6000, 4: 10000, 5: 20000,
    6: 40000, 7: 80000, 8: 140000, 9: 200000
  };

  const CRYSTAL_LOCK = [5,5,20,45,95,95,95,95];
  const KINAH_LOCK = [1000,1000,4000,9000,19000,19000,19000,19000];

  if (level >= 9) {
    document.getElementById("output").innerText = "Max level reached.";
    return;
  }

  const usableSlots = Math.min(level, 9);
  if (locks >= usableSlots) {
    document.getElementById("output").innerText = "Invalid lock count.";
    return;
  }

  const xpNeeded = XP_REQ[level] - currentXP;
  const xpPerRoll = usableSlots * 100;
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
