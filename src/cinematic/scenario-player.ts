import { playSoundTyping } from "@/audio/sound";
import { ScenarioGroupProps } from "@/types";
import sleep from "@/utils/sleep";
import { ScenarioTextTypes } from "@/types";
import { typespeed } from "@/global";
import { dm } from "@/main";

import { clear, end } from "./utils";

let voiceplayer: HTMLAudioElement | null = null;
let totalSkip: boolean = false;
export default async function startScenarioPlayer(scenario: ScenarioGroupProps[]) {
  return new Promise<boolean>(async (resolve) => {
    let donotskip: boolean = false;

    const handlerKeydown = (ev: KeyboardEvent) => {
      if (!donotskip && ev.key === "Escape") {
        totalSkip = false;
        window.removeEventListener("keydown", handlerKeydown);
        return resolve(true);
      }
    };
    window.addEventListener("keydown", handlerKeydown);
  
    const next = () => {
      return new Promise<void>((resolve) => {
        const handlerKeydown = (ev: KeyboardEvent) => {
          if (["Enter", " "].includes(ev.key)) {
            window.removeEventListener("keydown", handlerKeydown);
            resolve();
          }
        };
        const handlerClick = (_: MouseEvent) => {
          window.removeEventListener("click", handlerClick);
          resolve();
        };
        window.addEventListener("keydown", handlerKeydown);
        window.addEventListener("click", handlerClick)
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
  
        if (totalSkip) {
          totalSkip = false;
          window.removeEventListener("keydown", handlerKeydown);
          return resolve(true);
        }
        
        donotskip = true;
        await callback?.();
        donotskip = false;
      }
  
      end();
      await next();
      
      if (voiceplayer) {
        voiceplayer.pause();
        voiceplayer = null;
      }
  
      donotskip = true;
      await callback?.();
      donotskip = false;
  
      interrupted = false;
    }
  
    window.removeEventListener("keydown", handlerKeydown);

    resolve(false);
  });
}

let interrupted: boolean = false;
async function text(type: ScenarioTextTypes, str: string | string[], anim: boolean): Promise<boolean> {
  if (!dm) return false;

  const handlerKeydown = (ev: KeyboardEvent) => {
    if (["Enter", " "].includes(ev.key)) {
      anim = false;
      interrupted = true;
    }
    
    if (ev.key === "Escape") {
      totalSkip = true;
    }
  };
  const handlerClick = (_: MouseEvent) => {
    anim = false;
    interrupted = true;
  }
  window.addEventListener("keydown", handlerKeydown);
  window.addEventListener("click", handlerClick);

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

  const addquotationmark = () => target.innerText += ((type === "speech") && '"' || (type === "mind" && `'` || ''));

  const lines: string[] = Array.isArray(str) ? str : [str];

  if (anim) {
    for (let i = 0; i < lines.length; i++) {
      const line: string = lines[i];
  
      addquotationmark();
      
      for (const c of line) {
        if (interrupted || totalSkip) break;

        target.append(c);
        playSoundTyping();
        await sleep(typespeed);
      }

      if (interrupted || totalSkip) break;
  
      addquotationmark();
    
      target.appendChild(document.createElement("br"));
    }
  }

  if (totalSkip) return interrupted;
    
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

  window.removeEventListener("keydown", handlerKeydown);
  window.removeEventListener("click", handlerClick);

  return interrupted;
}