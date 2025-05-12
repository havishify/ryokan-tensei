import { tooltipVisible } from "@/global";
import { elementTooltip } from "@/main";

export const hideTooltip = () => elementTooltip.value.classList.add("closed");

export function setTooltip(str: string) {
  if (!tooltipVisible.value) return;
  
  elementTooltip.value.innerHTML = '';

  const lines: string[] = str.split('\n');

  lines.forEach((v: string, i: number) => {
    elementTooltip.value.innerHTML += v;
    if (i !== lines.length - 1) elementTooltip.value.innerHTML += "<br>";
  });
}

export function showTooltip() {
  if (tooltipVisible.value) elementTooltip.value.classList.remove("closed");
}

export function updateTooltipPosition(ev: MouseEvent) {
  const x: number = ev.clientX;
  const y: number = ev.clientY;
  const viewx: number = window.innerWidth || document.documentElement.clientWidth;
  const offset: number = 8;

  elementTooltip.value.style.left = '';
  elementTooltip.value.style.right = '';

  if (x < viewx / 2) {
    elementTooltip.value.style.left = `${x }px`;
  } else {
    elementTooltip.value.style.right = `${viewx - x}px`;
  }
  
  elementTooltip.value.style.top = `${y + offset}px`;
}