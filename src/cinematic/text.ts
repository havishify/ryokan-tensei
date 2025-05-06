import { playSoundTyping } from "@/audio/sound";
import sleep from "@/utils/sleep";
import { typespeed } from "@/global";
import { dm } from "@/main";

export default async function text(str: string, end: boolean = false, system: boolean = false): Promise<void> {
  return new Promise(async (resolve) => {
    if (dm) {
      if (system) {
        dm.innerHTML += str;
        if (!end) dm.innerHTML += "<br>";
        return;
      }

      dm.innerHTML += '"';
  
      let i: number = 0;
    
      const type = async () => {
        if (dm && i < str.length) {
          dm.innerHTML += str.charAt(i);
          i++;

          playSoundTyping();

          await sleep(typespeed);
          await type();
        }
      };
  
      await type();
  
      dm.innerHTML += '"';
  
      if (!end) dm.innerHTML += "<br>";
    }

    resolve();
  });
}