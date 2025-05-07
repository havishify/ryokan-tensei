import { message } from "@tauri-apps/plugin-dialog";

import playMusic, { stopMusic } from "@/audio/music";
import { playSoundClick } from "@/audio/sound";
import startScenarioPlayer from "@/cinematic/scenario-player";
import scenarioIntro from "@/scenarios/0_intro";
import { CinematicTypes, ScenarioGroupProps } from "@/types";
import sleep from "@/utils/sleep";

export let scene: "title-screen" | "cinematic" | "ingame" = "title-screen";
// let cinematic: boolean = false;
// let cinematicType: CinematicTypes = null;

export let speaking: boolean = false;
export const setspeaking = (v: boolean) => speaking = v;

export let dm: HTMLParagraphElement | null;

export let titleScreenScene: HTMLDivElement | null;
export let cinematicScene: HTMLDivElement | null;
// let gameServingScene: HTMLDivElement | null;

let cinematicimg: HTMLImageElement | null;
export const changeCinematicimg = (path: string) => {
  if (cinematicimg) cinematicimg.src = path;
};
let cinematicskip: HTMLParagraphElement | null;

export function cinematicFadein() {
  cinematicScene?.classList.add("closed");
}
export function cinematicFadeout() {
  cinematicScene?.classList.remove("closed");
}

export async function startCinematic(cType: CinematicTypes, scenario: ScenarioGroupProps[], before: (() => void) | null, skipped: (() => void) | null, after: (() => void) | null) {
  if (!titleScreenScene || !cinematicScene) return;

  titleScreenScene.classList.add("closed");

  await sleep(2500);

  before?.();

  console.log(cType);

  // cinematic = true;
  // cinematicType = cType;

  cinematicScene.classList.remove("closed");

  const skipping = await startScenarioPlayer(scenario);

  if (skipping) skipped?.();
  
  after?.();
}

window.addEventListener("DOMContentLoaded", () => {
  playMusic("title");

  dm = document.querySelector("#dm");

  titleScreenScene = document.querySelector("#title-screen");
  cinematicScene = document.querySelector("#cinematic");
  cinematicimg = document.querySelector("#cinematicimg");
  cinematicskip = document.querySelector("#cinematicskip");
  // gameServingScene = document.querySelector("#game-serving");

  if (cinematicimg && cinematicskip) {
    cinematicskip.style.left = `${cinematicimg.getBoundingClientRect().left}px`;
  }

  if (titleScreenScene) titleScreenScene.classList.remove("closed");
  
  const btnnew: HTMLButtonElement | null = document.querySelector("#btnnew");
  if (btnnew) {
    btnnew.addEventListener("click", async () => {
      btnnew.disabled = true;
      playSoundClick();
      stopMusic();
      startCinematic("intro", scenarioIntro, () => playMusic("sad"), () => {
        playMusic("heroine1_theme");
      }, () => {
        cinematicFadein();

        sleep(1250).then(() => {
          // 다음에 이어서 개발하기!
          // if (gameServingScene) gameServingScene.classList.remove("closed");

          // 일단은 여기까지...
          
          message("플레이 해주셔서 감사합니다...", { title: "끝!", kind: "info" }).then(() => window.location.reload());
        });
      });
    });
  }
});
window.addEventListener("resize", () => {
  if (cinematicimg && cinematicskip) {
    cinematicskip.style.left = `${cinematicimg.getBoundingClientRect().left}px`;
  }
});
window.addEventListener("contextmenu", (ev: MouseEvent) => ev.preventDefault());
window.addEventListener("keydown", (ev: KeyboardEvent) => {
  if (ev.key === 'F5') {
    window.location.reload();
    ev.preventDefault();
  }

  if ((ev.ctrlKey && ev.key === 'r')) ev.preventDefault();
  if (ev.altKey && (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight')) ev.preventDefault();
  if (ev.key === 'Tab') ev.preventDefault();
  if (ev.ctrlKey && ev.key === 'p') ev.preventDefault();
  if (ev.ctrlKey && ev.key === 'j') ev.preventDefault();
  if (ev.ctrlKey && ev.key === 'u') ev.preventDefault();
  if (ev.ctrlKey && ev.key === 'f') ev.preventDefault();
  if (ev.ctrlKey && ev.key === 'h') ev.preventDefault();
  if (ev.ctrlKey && ev.key === 'g') ev.preventDefault();
  if (ev.ctrlKey && ev.key === 's') ev.preventDefault();
  if (ev.ctrlKey && ev.key === 'o') ev.preventDefault();
});