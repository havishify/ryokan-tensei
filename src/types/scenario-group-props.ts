import ScenarioItemProps from "./scenario-item-props";

type ScenarioGroupProps = {
  group: ScenarioItemProps[],
  callback?: () => Promise<void>,
};

export default ScenarioGroupProps;