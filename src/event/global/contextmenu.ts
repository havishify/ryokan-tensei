export default function globalListenContextMenu() {
  window.addEventListener("contextmenu", (ev: MouseEvent) => ev.preventDefault());
}