import playMusic, { stopMusic } from "@/audio/music";
import { playSoundClick } from "@/audio/sound";
import startScenarioPlayer from "@/cinematic/scenario-player";
import scenarioIntro from "@/scenarios/0_intro";
import { CinematicTypes, ScenarioItemProps } from "@/types";
import sleep from "@/utils/sleep";

export let scene: "title-screen" | "cinematic" | "ingame" = "title-screen";
let cinematic: boolean = false;
let cinematicType: CinematicTypes = null;

export let speaking: boolean = false;
export const setspeaking = (v: boolean) => speaking = v;

export let dm: HTMLParagraphElement | null;

export let titleScreenScene: HTMLDivElement | null;
export let cinematicScene: HTMLDivElement | null;

export async function startCinematic(cType: CinematicTypes, scenario: ScenarioItemProps[][], before: () => void, after: () => void) {
  if (!titleScreenScene || !cinematicScene) return;

  titleScreenScene.classList.add("closed");

  await sleep(2500);

  before();

  cinematic = true;
  cinematicType = cType;

  cinematicScene.classList.remove("closed");

  await startScenarioPlayer(scenario);

  after();
}

window.addEventListener("DOMContentLoaded", () => {
  playMusic("title");

  dm = document.querySelector("#dm");

  titleScreenScene = document.querySelector("#title-screen");
  cinematicScene = document.querySelector("#cinematic");

  if (titleScreenScene) titleScreenScene.classList.remove("closed");
  
  const btnnew: HTMLButtonElement | null = document.querySelector("#btnnew");
  if (btnnew) {
    btnnew.addEventListener("click", async () => {
      btnnew.disabled = true;
      playSoundClick();
      stopMusic();
      startCinematic("intro", scenarioIntro, () => {
        playMusic("intro before");
      }, () => {
        console.log("after");
      });
    });
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