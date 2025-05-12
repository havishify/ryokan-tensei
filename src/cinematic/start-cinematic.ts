import { elementTitleScreen, elementCinematicScene } from "@/main";
import { ScenarioGroupProps } from "@/types";
import { sleep } from "@/utils";
import startScenarioPlayer from "./scenario-player";

export default async function startCinematic(scenario: ScenarioGroupProps[], before: (() => void) | null, skipped: (() => void) | null, after: (() => void) | null) {
  elementTitleScreen.value.classList.add("closed");

  await sleep(2500);

  before?.();

  elementCinematicScene.value.classList.remove("closed");

  const skipping = await startScenarioPlayer(scenario);

  if (skipping) skipped?.();
  
  after?.();
}
