import { Client } from "@notionhq/client";

const notion = new Client({ auth: "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" });

const databaseId = "54ca6216ac9b4edc80a95b6ae7e9ce08";

async function getCheckboxProgress() {
  const response = await notion.databases.query({ database_id: databaseId });

  const totalItems = response.results.length;
  const checkedItems = response.results.filter((page) => {
    return page.properties["DOne"].checkbox === true;
  }).length;

  const percent = Math.round((checkedItems / totalItems) * 100);
  console.log("Completamento:", percent + "%");

  return percent;
}

// function getPlantStage(percent) {
//   if (percent < 20) return 0;
//   if (percent < 40) return 1;
//   if (percent < 60) return 2;
//   if (percent < 80) return 3;
//   return 4;
// }

// const stage = getPlantStage(progress);
// plantimg.src = `assets/plant-${stage}.png`;

async function updatePlantStage() {
  const response = await fetch("/api/getProgress");
  const percent = await response.json();
  const img = document.getElementById("heart");

  let stage = 0;
  if (percent >= 20) stage = 1;
  if (percent >= 40) stage = 2;
  if (percent >= 60) stage = 3;
  if (percent >= 80) stage = 4;

  img.src = `assets/heart-${stage}.png`;
}
