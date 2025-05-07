import { playSoundTyping } from "@/audio/sound";
import { ScenarioGroupProps } from "@/types";
import sleep from "@/utils/sleep";
import { ScenarioTextTypes } from "@/types";
import { typespeed } from "@/global";
import { dm } from "@/main";

import { clear, end } from "./utils";

let voiceplayer: HTMLAudioElement | null = null;
export default async function startScenarioPlayer(scenario: ScenarioGroupProps[]) {
  const next = () => {
    const keys: string[] = ["Enter", " "];
    return new Promise<void>((resolve) => {
      const handler = (ev: KeyboardEvent) => {
        if (keys.includes(ev.key)) {
          window.removeEventListener("keydown", handler);
          resolve();
        }
      }
      window.addEventListener("keydown", handler);
    });
  };

  for (const {group, callback} of scenario) {
    clear();

    let skip: boolean = false;

    for (let i = 0; i < group.length; i++) {
      const { type, str, voice, callback } = group[i];

      if (voice) {
        voiceplayer = voice.cloneNode() as HTMLAudioElement;
        voiceplayer.volume = 1;
        voiceplayer.play();
      }
      skip = await text(type, str, !skip);
      
      await callback?.();
    }
  
    end();
    await next();
    
    if (voiceplayer) {
      voiceplayer.pause();
      voiceplayer = null;
    }

    await callback?.();

    interrupted = false;
  }
}

let interrupted: boolean = false;
async function text(type: ScenarioTextTypes, str: string | string[], anim: boolean): Promise<boolean> {
  if (!dm) return false;

  const keyHandler = (ev: KeyboardEvent) => {
    if (ev.key === "Enter" || ev.key === " ") {
      anim = false;
      interrupted = true;
    }
  };

  window.addEventListener("keydown", keyHandler);

  let target: HTMLElement | null = null;

  switch (type) {
    case "narrator":
      target = document.createElement("i");
      break;
    case "speech":
      target = document.createElement("p");
      break;
    case "natural":
      target = document.createElement("p");
      target.classList.add("textnatural");
      break;
    case "mind":
      target = document.createElement("p");
      target.classList.add("mindtext");
      break;
      
  }

  dm.appendChild(target);

  const addquotationmark = () => target.innerText += ((type === "speech" || type === "natural") && '"' || (type === "mind" && `'` || ''));

  const lines: string[] = Array.isArray(str) ? str : [str];

  if (anim) {
    for (let i = 0; i < lines.length; i++) {
      const line: string = lines[i];
  
      addquotationmark();
      
      for (const c of line) {
        if (interrupted) break;

        target.append(c);
        playSoundTyping();
        await sleep(typespeed);
      }

      if (interrupted) break;
  
      addquotationmark();
    
      target.appendChild(document.createElement("br"));
    }
  }
    
  if (interrupted) {
    target.innerHTML = "";

    lines.forEach((v: string) => {
      addquotationmark();
      target.append(v);
      addquotationmark();
      target.appendChild(document.createElement("br"));
    });
  }
  
  target.appendChild(document.createElement("br"));
  window.removeEventListener("keydown", keyHandler);

  return interrupted;
}