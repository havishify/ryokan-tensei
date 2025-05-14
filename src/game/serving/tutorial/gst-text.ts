import { playSoundTyping } from "@/audio/sound";
import { sleep } from "@/utils";
import { typespeed } from "@/global";

import { elGameServingTutorialDM, interrupted, voiceplayer } from ".";

export async function gstText(script: string, voicepath?: string): Promise<boolean> {
  elGameServingTutorialDM.value.innerHTML = '';

  const handlerKeydown = (ev: KeyboardEvent) => {
    if (["Enter", " "].includes(ev.key)) {
      interrupted.value = true;
    }
  };
  const handlerClick = (_: MouseEvent) => {
    interrupted.value = true;
  }
  window.addEventListener("keydown", handlerKeydown);
  window.addEventListener("click", handlerClick);

  const el: HTMLParagraphElement = document.createElement("p");
  elGameServingTutorialDM.value.appendChild(el);

  const lines = script.split('\n').filter((v: string) => v.trim().length);
    
  if (voicepath) {
    voiceplayer.value = (new Audio(voicepath)).cloneNode() as HTMLAudioElement;
    voiceplayer.value.volume = 1;
    voiceplayer.value.play();
  }

  for await (const line of lines) {
    if (!line.length || !line.trim().length) continue;

    for await (const c of line) {
      if (interrupted.value) break;
      
      el.append(c);
      playSoundTyping();
      await sleep(typespeed);
    }

    if (interrupted.value) break;

    el.appendChild(document.createElement("br"));
  }
    
  if (interrupted.value) {
    el.innerHTML = '';

    lines.forEach((v: string) => {
      el.append(v);
      el.appendChild(document.createElement("br"));
    });
  }
  
  el.appendChild(document.createElement("br"));

  elGameServingTutorialDM.value.innerHTML += '<p class="plzpress">엔터 또는 화면을 클릭하십시오.</p>';

  window.removeEventListener("keydown", handlerKeydown);
  window.removeEventListener("click", handlerClick);

  return interrupted.value;
}