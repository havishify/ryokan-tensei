import playMusic, { stopMusic } from "@/audio/music";
import { playSoundClick } from "@/audio/sound";
import sleep from "@/utils/sleep";
import next from "@/next";
import { text, desc, end } from "@/cinematic";

export let scene: "title-screen" | "cinematic" | "ingame" = "title-screen";

export let speaking: boolean = false;
export const setspeaking = (v: boolean) => speaking = v;

export let dm: HTMLParagraphElement | null;

export let titleScreenScene: HTMLDivElement | null;
export let cinematicScene: HTMLDivElement | null;

window.addEventListener("DOMContentLoaded", () => {
  playMusic("title");

  dm = document.querySelector("#dm");

  titleScreenScene = document.querySelector("#title-screen");
  cinematicScene = document.querySelector("#cinematic");

  if (titleScreenScene) titleScreenScene.classList.remove("closed");
  
  const btnnew = document.querySelector("#btnnew");
  if (btnnew) {
    btnnew.addEventListener("click", async () => {
      playSoundClick();
      stopMusic();

      if (titleScreenScene) titleScreenScene.classList.add("closed");

      await sleep(2500);

      playMusic("intro before");

      if (cinematicScene) cinematicScene.classList.remove("closed");

      await desc([
        "당신은 어느 중소기업에 다니는 평범한 직장인입니다.",
        "오늘도 부장이 떠넘긴 일을 밤늦게까지 처리하고 있죠.",
        "시계를 보니 어느덧 밤 11시가 넘었습니다."
      ]);
      
      await text("슬슬 가볼까...");
      
      await desc([
        "맥없이 자리를 정리하고 퇴근길에 나서는 당신.",
        "엘리베이터를 타고 1층으로 내려갑니다.",
        "횡단보도 앞에 멈춰 서서 신호를 기다립니다."
      ]);

      end();
    });
  }
});
window.addEventListener("contextmenu", (ev: MouseEvent) => ev.preventDefault());
window.addEventListener("keydown", (ev: KeyboardEvent) => {
  if ((ev.key === "Enter" || ev.key === " ")) {
    if (!speaking) next();
    ev.preventDefault();
  }

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