import playMusic, { stopMusic } from "@/audio/music";
import { playSoundClick } from "@/audio/sound";
import { fadein, startCinematic } from "@/cinematic";
import prepareServing from "@/game/serving/game-manager";
import scenarioIntro from "@/scenarios/0_intro";
import sleep from "@/utils/sleep";
import { elementGameServingScene, elementTitleScreenNewStart } from "@/main";

export default function listenTitleScreenNewStart() {
    elementTitleScreenNewStart.value.disabled = true;

    playSoundClick();

    stopMusic();

    const before = () => playMusic("sad");
    const skipped = () => playMusic("heroine1_theme");
    const after = () => {
      fadein();

      sleep(1250).then(async () => {
        elementGameServingScene.value.classList.remove("closed");

        if (await prepareServing()) {
          // Go!
        }
      });
    };

    startCinematic(scenarioIntro, before, skipped, after);
}