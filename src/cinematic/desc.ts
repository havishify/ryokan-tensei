import { playSoundTyping } from "@/audio/sound";
import sleep from "@/utils/sleep";
import { typespeed } from "@/global";
import { dm } from "@/main";

export default async function desc(str: string | string[], end: boolean = false): Promise<void> {
  if (!dm) return;

  const ele = document.createElement("i");
  dm.appendChild(ele);

  const lines: string[] = Array.isArray(str) ? str : [str];

  for (let i = 0; i < lines.length; i++) {
    const dialog: string = lines[i];
    for (const c of dialog) {
      ele.append(c);
      playSoundTyping();
      await sleep(typespeed);
    }
    
    if (i < str.length - 1) ele.innerHTML += "<br>";
  }

  if (!end) dm.innerHTML += "<br>";
}