import playMusic, { stopMusic } from "@/audio/music";
import { playSoundClick } from "@/audio/sound";
import { fadein, startCinematic } from "@/cinematic";
import { prepareServing } from "@/game/serving";
import scenarioIntro from "@/scenarios/0_intro";
import { sleep } from "@/utils";
import { elementGameServingScene, elementTitleScreenNewStart } from "@/main";

export default function listenTitleScreenNewStart() {
  elementTitleScreenNewStart.value.disabled = true;

  playSoundClick();
  stopMusic();

  const before = () => playMusic("sad");
  const skipped = () => playMusic("heroine1_theme");
  const after = () => {
    fadein();

    sleep(1250).then(() => {
      elementGameServingScene.value.classList.remove("closed");

      prepareServing(true);
    });
  };

  startCinematic(scenarioIntro, before, skipped, after);
}