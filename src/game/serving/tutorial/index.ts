import { playSoundTyping } from "@/audio/sound";
import { sleep } from "@/utils";
import { typespeed } from "@/global";

import { elGameServingTutorial, elGameServingTutorialDM, elGameServingTutorialTextbox } from "..";

type MiniScenarioRecord = { script: string, voicepath: string, callback?: () => Promise<void> };

let interrupted: boolean = false;
let voiceplayer: HTMLAudioElement | null = null;

async function text(script: string, voicepath?: string): Promise<boolean> {
  elGameServingTutorialDM.value.innerHTML = '';

  const handlerKeydown = (ev: KeyboardEvent) => {
    if (["Enter", " "].includes(ev.key)) {
      interrupted = true;
    }
  };
  const handlerClick = (_: MouseEvent) => {
    interrupted = true;
  }
  window.addEventListener("keydown", handlerKeydown);
  window.addEventListener("click", handlerClick);

  const el: HTMLParagraphElement = document.createElement("p");
  elGameServingTutorialDM.value.appendChild(el);

  const addquotationmark = () => el.innerText += '"';

  const lines: string[] = script.split('\n');
    
  if (voicepath) {
    voiceplayer = (new Audio(voicepath)).cloneNode() as HTMLAudioElement;
    voiceplayer.volume = 1;
    voiceplayer.play();
  }

  for await (const line of lines) {
    addquotationmark();

    for await (const c of line) {
      if (interrupted) break;
      
      el.append(c);
      playSoundTyping();
      await sleep(typespeed);
    }

    if (interrupted) break;

    addquotationmark();
    el.appendChild(document.createElement("br"));
  }
    
  if (interrupted) {
    el.innerHTML = '';

    lines.forEach((v: string) => {
      addquotationmark();
      el.append(v);
      addquotationmark();
      el.appendChild(document.createElement("br"));
    });
  }
  
  el.appendChild(document.createElement("br"));

  elGameServingTutorialDM.value.innerHTML += '<p class="plzpress">엔터 또는 화면을 클릭하십시오.</p>';

  window.removeEventListener("keydown", handlerKeydown);
  window.removeEventListener("click", handlerClick);

  return interrupted;
}

function next(): Promise<void> {
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

async function miniScenarioPlayer(scenario: MiniScenarioRecord[]): Promise<void> {
  for await (const { script, voicepath, callback } of scenario) {
    await text(script, voicepath);
    await next();

    if (voiceplayer) {
      voiceplayer.pause();
      voiceplayer = null;
    }

    await callback?.();

    interrupted = false;
  }
}

export default async function startGameServingTutorial() {
  await sleep(2250);

  elGameServingTutorial.value.classList.add("dark");
  
  await sleep(250);

  elGameServingTutorialTextbox.value.classList.remove("closed");

  await miniScenarioPlayer([
    { script: "지금부터 안내를 시작하겠습니다, 마스터.", voicepath: "/audio/voice/1_tutorial/1.mp3" },
    { script: "우선 제가 임의로 마스터의 시점을\n서빙 모드로 변환시켜드렸습니다.", voicepath: "/audio/voice/1_tutorial/2.mp3" },
    { script: "서빙 모드 활성화 시,\n여관의 테이블에서 대기하고 있는 손님들에게\n서비스를 제공할 수 있습니다.", voicepath: "/audio/voice/1_tutorial/3.mp3" },
    { script: "음식을 제공하거나 메모를 남기는 등\n다양한 행동이 가능하며,\n테이블에 앉아있는 손님들을 한눈에 확인하거나,\n아이콘을 클릭하여\n손님이 좋아하는 음식, 싫어하는 음식,\n몸무게 등을 확인할 수 있습니다.", voicepath: "/audio/voice/1_tutorial/4.mp3" },
    { script: "마스터에게 모든 것을 보여드리고 싶지만,\n지금은 그녀를 진정시키는것이 급하므로\n음식 제공과 메모 남기기 기능만을\n안내드리도록 하겠습니다.", voicepath: "/audio/voice/1_tutorial/5.mp3" },
    { script: "우선 그녀가 좋아하는 음식을 확인해봅시다.\n테이블에 있는 그녀를 클릭해보세요, 마스터.", voicepath: "/audio/voice/1_tutorial/6.mp3" },
  ]);

  elGameServingTutorialTextbox.value.classList.add("closed");
  elGameServingTutorial.value.classList.remove("dark");
}
