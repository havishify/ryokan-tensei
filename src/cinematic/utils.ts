import { dm } from "@/main";

export function clear() {
  if (dm) dm.innerHTML = "";
}

export function end() {
  if (dm) dm.innerHTML += '<p class="plzpress">엔터 또는 화면을 클릭하십시오.</p>';
}