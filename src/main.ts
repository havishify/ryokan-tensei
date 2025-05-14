import playMusic from "@/audio/music";
import { playSoundChime } from "@/audio/sound";
import { 
  globalListenContextMenu, 
  globalListenKeydown,
  globalListenResize,
  globalResizeCallback 
} from "@/event/global"
import { listenTitleScreenNewStart } from "@/event/local/title-screen";
import { ElementProperty, Property, QuestProps, Time } from "@/types";
import { createArrowedAlarm } from "@/ui";
import { getHourstr } from "@/utils";

import { prepareServing } from "@/game/serving";

export const elementTitleScreen: ElementProperty<HTMLDivElement> = new ElementProperty<HTMLDivElement>();
export const elementTitleScreenNewStart: ElementProperty<HTMLButtonElement> = new ElementProperty<HTMLButtonElement>();

export const elementCinematicScene: ElementProperty<HTMLDivElement> = new ElementProperty<HTMLDivElement>();
export const elementCinematicImg: ElementProperty<HTMLImageElement> = new ElementProperty<HTMLImageElement>();
export const elementCinematicSkip: ElementProperty<HTMLParagraphElement> = new ElementProperty<HTMLParagraphElement>();
export const elementDM: ElementProperty<HTMLParagraphElement> = new ElementProperty();

export const elementGameServingScene: ElementProperty<HTMLDivElement> = new ElementProperty<HTMLDivElement>();
export const elementGameServingBody: ElementProperty<HTMLDivElement> = new ElementProperty<HTMLDivElement>();
const elementGameServingDateLabel: ElementProperty<HTMLParagraphElement> = new ElementProperty<HTMLParagraphElement>();
const elementGameServingClockLabel: ElementProperty<HTMLParagraphElement> = new ElementProperty<HTMLParagraphElement>();
const elementGameServingQuestWindowTitle: ElementProperty<HTMLParagraphElement> = new ElementProperty<HTMLParagraphElement>();
const elementGameServingQuestWindowDesc: ElementProperty<HTMLParagraphElement> = new ElementProperty<HTMLParagraphElement>();

export const elementTooltip: ElementProperty<HTMLSpanElement> = new ElementProperty<HTMLSpanElement>();
export const elementArrowedAlarm: ElementProperty<HTMLSpanElement> = new ElementProperty<HTMLSpanElement>();

export const time: Property<Time> = new Property<Time>({ years: 323, month: 3, day: 1, hour: 3 }, (v: Time) => {
  elementGameServingDateLabel.value.innerHTML = `${v.years}년 ${v.month}월 ${v.day}일`;
  elementGameServingClockLabel.value.innerText = `${getHourstr(v.hour)} ${v.hour}시`;
});
export const quest: Property<QuestProps> = new Property<QuestProps>({
  title: '',
  desc: []
}, (v: QuestProps) => {
  elementGameServingQuestWindowTitle.value.innerText = v.title;

  elementGameServingQuestWindowDesc.value.innerHTML = '';
  
  let alarm: boolean = true;

  v.desc.forEach((_v: string, i: number) => {
    if (_v === "none") {
      elementGameServingQuestWindowDesc.value.innerHTML += '&nbsp;&nbsp;';
    } else {
      elementGameServingQuestWindowDesc.value.innerHTML += `&nbsp;&nbsp;- ${_v}`;
      if (alarm) {
        playSoundChime();
        createArrowedAlarm('메인 퀘스트가\n갱신되었습니다.', elementGameServingQuestWindowDesc.value, "bottom", 2000);
        alarm = false;
      }
    }
    if (i !== v.desc.length - 1) elementGameServingQuestWindowDesc.value.innerHTML += "<br>";
  });
});

window.addEventListener("DOMContentLoaded", () => {
  elementTitleScreen.value = document.querySelector("#title-screen");
  elementTitleScreenNewStart.value = document.querySelector("#btnnew");
  elementTitleScreenNewStart.addListener("click", async () => listenTitleScreenNewStart());

  elementCinematicScene.value = document.querySelector("#cinematic");
  elementCinematicImg.value = document.querySelector("#cinematicimg");
  elementCinematicSkip.value = document.querySelector("#cinematicskip");
  elementDM.value = document.querySelector("#dm");

  elementGameServingScene.value = document.querySelector("#game-serving");
  elementGameServingBody.value = document.querySelector("#game-serving-body");
  elementGameServingDateLabel.value = document.querySelector("#serving-timewindow-uidatelabel");
  elementGameServingClockLabel.value = document.querySelector("#serving-timewindow-uiclocklabel");
  elementGameServingQuestWindowTitle.value = document.querySelector(".serving-questwindow-title");
  elementGameServingQuestWindowDesc.value = document.querySelector(".serving-questwindow-desc");

  elementTooltip.value = document.querySelector("#tooltip");
  elementArrowedAlarm.value = document.querySelector("#arrowed-alarm");

  globalResizeCallback();

  playMusic("title");
  elementTitleScreen.value.classList.remove("closed");
    
  time.value = {
    years: 323,
    month: 3,
    day: 1,
    hour: 3
  };
  quest.value = {
    title: "그녀를 막아라!",
    desc: ['none', 'none']
  };

  const debug = true;
  if (debug) {
    new Promise((resolve) => setTimeout(resolve, 250)).then(() => {
      playMusic("");

      elementTitleScreen.value.classList.add("closed");
      elementGameServingScene.value.classList.remove("closed");

      prepareServing(true);
    });
  }
});

globalListenContextMenu();
globalListenKeydown();
globalListenResize();