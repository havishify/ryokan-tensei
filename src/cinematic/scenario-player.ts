import { playSoundTyping } from "@/audio/sound";
import { ScenarioItemProps } from "@/types";
import sleep from "@/utils/sleep";
import { typespeed } from "@/global";
import { dm } from "@/main";

import { clear, end } from "./utils";

export default async function startScenarioPlayer(scenario: ScenarioItemProps[][]) {
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

  for (const __scenario of scenario) {
    clear();

    for (let i = 0; i < __scenario.length; i++) {
      const { type, str, callback } = __scenario[i];

      await text(type, str);
      callback?.();
    }
  
    end();
    await next();
  }
}

async function text(type:  "text" | "speech" | "desc", str: string | string[]): Promise<boolean> {
  if (!dm) return false;

  let target: HTMLElement | null = null;

  if (type === "desc") {
    target = document.createElement("i");
  } else {
    target = document.createElement("p");
  }

  dm.appendChild(target);
 
  const lines: string[] = Array.isArray(str) ? str : [str];

  for (let i = 0; i < lines.length; i++) {
    const line: string = lines[i];

    if (type === "text") target.innerText += '"';
    
    for (const c of line) {
      target.append(c);
      playSoundTyping();
      await sleep(typespeed);
    }

    if (type === "text") target.innerText += '"';
  
    target.appendChild(document.createElement("br"));
  }
  
  target.appendChild(document.createElement("br"));

  return false;
}