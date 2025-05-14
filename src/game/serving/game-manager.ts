import { playSoundBeep1, playSoundWinOpen } from "@/audio/sound";
import { ElementProperty, Property } from "@/types";
import { hideTooltip, setTooltip, showTooltip, updateTooltipPosition } from "@/ui";
import { sleep } from "@/utils";
import { elementGameServingBody, quest } from "@/main";

import startGameServingTutorial, { elGameServingTutorial } from "./tutorial";
import { elGSTableDetail, tableDetail } from "./table";
import { ServingMapRecord } from "./type";
import { listen, map } from ".";

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
      const el = new ElementProperty<HTMLButtonElement>();
      const avatar = new Property<string>('',
        (path: string) => {
          if (path) el.value.style.setProperty("--avatar", `url("${path}")`);
        }
      );
      const state: string = "빈 테이블";

      const record: ServingMapRecord = { 
        position, 
        el, 
        avatar, 
        state, 
        detail: {
          exists: false,
          name: '',
          mood: '',
          portrait: ''
        } 
      };

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
      
      map.value[i][j].el.addListener("click", () => {
        if (map.value[i][j].detail.exists) {
          tableDetail.value = {
            title: map.value[i][j].state,
            position: map.value[i][j].position,
            name: map.value[i][j].detail.name,
            mood: map.value[i][j].detail.mood,
            portrait: map.value[i][j].detail.portrait
          };
          
          playSoundWinOpen();
          elGSTableDetail.value.classList.remove("closed");
        }
      });
      map.value[i][j].el.addListener("mouseenter", (ev: MouseEvent) => {
        updateTooltipPosition(ev);
        setTooltip(`${map.value[i][j].state}\n(${j + 1}, ${i + 1})`);
        showTooltip();
      });
      map.value[i][j].el.addListener("mousemove", (ev: MouseEvent) => updateTooltipPosition(ev));
      map.value[i][j].el.addListener("mouseleave", () => hideTooltip());

      if (isTutorial && i === 4 && j === 3) {
        map.value[i][j].avatar.value = "/image/serving/avatar_tutorial_heroine1.webp";
        map.value[i][j].state = "그녀";
        map.value[i][j].detail.exists = true;
        map.value[i][j].detail.name = "알 수 없음";
        map.value[i][j].detail.mood = "😡";
        map.value[i][j].detail.portrait = "/image/intro/5.webp";
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