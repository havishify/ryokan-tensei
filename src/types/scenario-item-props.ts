type ScenarioItemProps = {
  type: "text" | "speech" | "desc",
  str: string | string[],
  callback?: () => void
};

export default ScenarioItemProps;