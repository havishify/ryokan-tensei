import playMusic from "@/audio/music";
import { 
  globalListenContextMenu, 
  globalListenKeydown,
  globalListenResize,
  globalResizeCallback 
} from "@/event/global"
import { listenTitleScreenNewStart } from "@/event/local/title-screen";
import { ElementProperty, Property } from "@/types";

export const speaking: Property<boolean> = new Property<boolean>(false);


export const elementTitleScreen: ElementProperty<HTMLDivElement> = new ElementProperty<HTMLDivElement>();
export const elementTitleScreenNewStart: ElementProperty<HTMLButtonElement> = new ElementProperty<HTMLButtonElement>();

export const elementCinematicScene: ElementProperty<HTMLDivElement> = new ElementProperty<HTMLDivElement>();
export const elementCinematicImg: ElementProperty<HTMLImageElement> = new ElementProperty<HTMLImageElement>();
export const elementCinematicSkip: ElementProperty<HTMLParagraphElement> = new ElementProperty<HTMLParagraphElement>();
export const elementDM: ElementProperty<HTMLParagraphElement> = new ElementProperty();

export const elementGameServingScene: ElementProperty<HTMLDivElement> = new ElementProperty<HTMLDivElement>();
export const elementGameServingBody: ElementProperty<HTMLDivElement> = new ElementProperty<HTMLDivElement>();

export const changeCinematicimg = (path: string) => {
  elementCinematicImg.value.src = path;
};

window.addEventListener("DOMContentLoaded", () => {
  playMusic("title");

  elementTitleScreen.value = document.querySelector("#title-screen");
  elementTitleScreenNewStart.value = document.querySelector("#btnnew");

  elementCinematicScene.value = document.querySelector("#cinematic");
  elementCinematicImg.value = document.querySelector("#cinematicimg");
  elementCinematicSkip.value = document.querySelector("#cinematicskip");
  elementDM.value = document.querySelector("#dm");

  elementGameServingScene.value = document.querySelector("#game-serving");
  elementGameServingBody.value = document.querySelector("#game-serving-body");

  globalResizeCallback();

  elementTitleScreen.value.classList.remove("closed");
  elementTitleScreenNewStart.value.addEventListener("click", async () => listenTitleScreenNewStart());
});

globalListenContextMenu();
globalListenKeydown();
globalListenResize();