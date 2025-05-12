import { playSoundBeep1 } from "@/audio/sound";
import { ElementProperty, Property } from "@/types";
import { hideTooltip, setTooltip, showTooltip, updateTooltipPosition } from "@/ui";
import { sleep } from "@/utils";
import { elementGameServingBody, quest } from "@/main";

import startGameServingTutorial from "./tutorial";
import { elGameServingTutorial, listen, map, ServingMapRecord } from ".";

export default async function prepareServing(isTutorial: boolean = false) {
  if (isTutorial) elGameServingTutorial.value.classList.remove("closed");

  listen();

  const width: number = 6;
  const height: number = 6;

  map.value = Array.from({ length: height}, (_: unknown, i: number) => {
    return Array.from({ length: width }, (__: unknown, j: number) => {
      const x: number = j;
      const y: number = i;

      const position: { x: number, y: number } = { x, y };
      const el: ElementProperty<HTMLButtonElement> = new ElementProperty<HTMLButtonElement>();
      const avatar: Property<string> = new Property<string>('',
        (path: string) => {
          if (path) el.value.style.setProperty("--avatar", `url("${path}")`);
        }
      );
      const state: string = "빈 테이블";

      const record: ServingMapRecord = { position, el, avatar, state };

      return record;
    });
  });

  for (let i = 0; i < height; i++) {
    const row = document.createElement("div");
    row.className = "servingitemrow flex-row";

    elementGameServingBody.value.append(row);

    for (let j = 0; j < width; j++) {
      map.value[i][j].el.value = document.createElement("button");
      map.value[i][j].el.value.className = "servingitem-hide";
      
      map.value[i][j].el.addListener("mouseenter", (ev: MouseEvent) => {
        updateTooltipPosition(ev);
        setTooltip(`${map.value[i][j].state}\n(${j + 1}, ${i + 1})`);
        showTooltip();
      });
      map.value[i][j].el.addListener("mousemove", (ev: MouseEvent) => updateTooltipPosition(ev));
      map.value[i][j].el.addListener("mouseleave", () => hideTooltip());

      if (i === 4 && j === 3) {
        map.value[i][j].avatar.value = "/image/serving/avatar_tutorial_heroine1.webp";
        map.value[i][j].state = "그녀";
      }

      row.append(map.value[i][j].el.value);
    }
  }

  for await (const row of map.value) {
    for await (const v of row) {
      v.el.value.className = "servingitem";
      playSoundBeep1();
      await sleep(50);
    } 
  }

  if (isTutorial) {
    quest.value = {
      title: quest.value.title,
      desc: [
        "그녀가 좋아하는 음식을 소환",
        "마음을 담은 메모 남기기"
      ]
    };

    startGameServingTutorial();
  }
}