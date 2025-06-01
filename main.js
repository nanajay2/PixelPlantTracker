function getPlantStage(percent) {
  if (percent < 20) return 0;
  if (percent < 40) return 1;
  if (percent < 60) return 2;
  if (percent < 80) return 3;
  return 4;
}

const stage = getPlantStage(progress);
plantimg.src = `assets/plant-${stage}.png`;
