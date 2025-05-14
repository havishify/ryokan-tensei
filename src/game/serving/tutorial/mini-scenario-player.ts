import { gstNext } from "./gst-next";
import { gstText } from "./gst-text";
import { MiniScenarioRecord } from "./type";
import { interrupted, voiceplayer } from ".";

export async function miniScenarioPlayer(scenario: MiniScenarioRecord[]): Promise<void> {
  for await (const { script, voicepath, callback } of scenario) {
    await gstText(script, voicepath);
    await gstNext();

    if (voiceplayer.value) {
      voiceplayer.value.pause();
      voiceplayer.value = null;
    }

    await callback?.();

    interrupted.value = false;
  }
}