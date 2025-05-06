import { dm } from "@/main";

export function clear() {
  if (dm) dm.innerHTML = "";
}

export function end() {
  if (dm) dm.innerHTML += '<p class="plzpress">엔터 또는 스페이스바를 누르십시오.</p>';
}