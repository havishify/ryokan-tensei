import { ElementProperty, Property } from "@/types";
import { sleep } from "@/utils";

import { map } from "..";
import { miniScenarioPlayer } from "./mini-scenario-player";
import { gstScenario_0 } from "./scenarios";

export const elGameServingTutorial = new ElementProperty<HTMLDivElement>("#game-serving-tutorial");
const elGameServingTutorialTextbox = new ElementProperty<HTMLDivElement>("#game-serving-tutorial-textbox");
export const elGameServingTutorialDM = new ElementProperty<HTMLDivElement>("#game-serving-tutorial-dm");

export const interrupted = new Property<boolean>(false);
export const voiceplayer = new Property<HTMLAudioElement | null>(null);

export default async function startGameServingTutorial() {
  await sleep(2250);

  elGameServingTutorial.value.classList.add("dark");
  
  await sleep(250);

  elGameServingTutorialTextbox.value.classList.remove("closed");

  await miniScenarioPlayer(gstScenario_0);

  elGameServingTutorialTextbox.value.classList.add("closed");
  elGameServingTutorial.value.classList.remove("dark");

  const elGSTOverlay = new ElementProperty<HTMLDivElement>("#game-serving-tutorial-guide-overlay");
  const elGSTStencil = new ElementProperty<HTMLDivElement>("#game-serving-tutorial-guide-stencil");

  elGSTOverlay.value.classList.remove("closed");
  
  const tempHandler = () => {
    const target: DOMRect = map.value[4][3].el.value.getBoundingClientRect();
    const hostRect: DOMRect = elGSTOverlay.value.getBoundingClientRect();

    elGSTStencil.value.style.left = `${target.left}px`;
    elGSTStencil.value.style.top = `${target.top - hostRect.top}px`;
  };
  tempHandler();
  window.addEventListener("resize", tempHandler);
  
  map.value[4][3].el.value.style.zIndex = '12';

  await (new Promise<void>((resolve) => {
    const _tempHandler = () => {
      window.removeEventListener("resize", tempHandler);
      map.value[4][3].el.value.removeEventListener("click", _tempHandler);
      resolve();
    };
    map.value[4][3].el.value.addEventListener("click", _tempHandler);  
  }));

  map.value[4][3].el.value.style.zIndex = '';

  elGSTOverlay.value.classList.add("closed");
  elGameServingTutorial.value.classList.add("closed");
}