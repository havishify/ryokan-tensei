import { elementCinematicScene, elementDM } from "@/main";

export function clear() {
  elementDM.value.innerHTML = "";
}

export function end() {
  elementDM.value.innerHTML += '<p class="plzpress">엔터 또는 화면을 클릭하십시오.</p>';
}

export function fadein() {
  elementCinematicScene.value.classList.add("closed");
}
export function fadeout() {
  elementCinematicScene.value.classList.remove("closed");
}
