import { elementCinematicImg, elementCinematicSkip } from "@/main";

export function globalResizeCallback() {
  elementCinematicSkip.value.style.left = `${elementCinematicImg.value.getBoundingClientRect().left}px`;
}

export default function globalListenResize() {
  window.addEventListener("resize", () => {
    globalResizeCallback();
  });
}