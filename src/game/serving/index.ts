import { ElementProperty, Property } from "@/types";
import { hideTooltip, setTooltip, showTooltip, updateTooltipPosition } from "@/ui";
import { getHourstr } from "@/utils";
import { time } from "@/main";

import { ServingMapRecord } from "./type";

const elGameServingTimeWindow = new ElementProperty<HTMLDivElement>("#serving-timewindow");
const elGameServingSpGauge = new ElementProperty<HTMLDivElement>("#serving-spgague-uispgague-in");
const elGameServingPointGauge = new ElementProperty<HTMLDivElement>("#serving-pointgague-uipointgague-in");
export const elGameServingQuestWindow = new ElementProperty<HTMLDivElement>(".serving-questwindow");

export const map = new Property<ServingMapRecord[][]>([]);

export function cleanup() {
  elGameServingTimeWindow.cleanup();
  elGameServingSpGauge.cleanup();
  elGameServingPointGauge.cleanup();
  elGameServingQuestWindow.cleanup();

  map.value.forEach((row: ServingMapRecord[]) => row.forEach((v: ServingMapRecord) => v.el.cleanup()));
  map.value.length = 0;
}

export function listen() {
  cleanup();

  // time window
  elGameServingTimeWindow.addListener("mouseenter", (ev: MouseEvent) => {
    updateTooltipPosition(ev);
    setTooltip(`현재 시간 ${getHourstr(time.value.hour)} ${time.value.hour}시\n${time.value.years}년 ${time.value.month}월 ${time.value.day}일`);
    showTooltip();
  });
  elGameServingTimeWindow.addListener("mousemove", (ev: MouseEvent) => updateTooltipPosition(ev));
  elGameServingTimeWindow.addListener("mouseleave", () => hideTooltip());

  // sp gauge
  elGameServingSpGauge.addListener("mouseenter", (ev: MouseEvent) => {
    updateTooltipPosition(ev);
    setTooltip("SP입니다.\n게임의 보조 재화입니다.\n턴마다 초기화됩니다.");
    showTooltip();
  });
  elGameServingSpGauge.addListener("mousemove", (ev: MouseEvent) => updateTooltipPosition(ev));
  elGameServingSpGauge.addListener("mouseleave", () => hideTooltip());

  // point gauge
  elGameServingPointGauge.addListener("mouseenter", (ev: MouseEvent) => {
    updateTooltipPosition(ev);
    setTooltip("포인트입니다.\n게임의 기본 재화입니다.\n손님으로부터 얻습니다.");
    showTooltip();
  });
  elGameServingPointGauge.addListener("mousemove", (ev: MouseEvent) => updateTooltipPosition(ev));
  elGameServingPointGauge.addListener("mouseleave", () => hideTooltip());

  // quest window
  elGameServingQuestWindow.addListener("mouseenter", (ev: MouseEvent) => {
    updateTooltipPosition(ev);
    setTooltip("진행중인 퀘스트입니다.");
    showTooltip();
  });
  elGameServingQuestWindow.addListener("mousemove", (ev: MouseEvent) => updateTooltipPosition(ev));
  elGameServingQuestWindow.addListener("mouseleave", () => hideTooltip());
}

export { default as prepareServing } from "./game-manager";