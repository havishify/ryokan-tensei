import ScenarioTextTypes from "./scenario-text-types";

type ScenarioItemProps = {
  type: ScenarioTextTypes,
  str: string | string[],
  voice?: HTMLAudioElement;
  callback?: () => Promise<void>
};

export default ScenarioItemProps;