import { playSoundXpBeep } from "@/audio/sound";
import sleep from "@/utils/sleep";
import { elementGameServingBody } from "@/main";

const map: {}[][] = [];

export default async function prepareServing() {
  const width: number = 6;
  const height: number = 6;

  const map: { pos: { x: number, y: number }, }[][] = [];
  const grid: HTMLButtonElement[][] = [];

  for (let i = 0; i < height; i++) {
    const row = document.createElement("div");
    row.className = "servingitemrow flex-row";

    elementGameServingBody.value.append(row);

    const line: HTMLButtonElement[] = [];

    for (let j = 0; j < width; j++) {
      const btn = document.createElement("button");
      btn.className = "servingitem-hide";

      row.append(btn);

      line.push(btn);
    }

    grid.push(line);
  }

  for await (const arr of grid) {
    for await (const v of arr) {
      v.className = "servingitem";
      playSoundXpBeep();
      await sleep(50);
    } 
  }

  return true;
}