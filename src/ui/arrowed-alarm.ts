import { elementArrowedAlarm as el } from "@/main";

let hideTimer: number | null = null;

export function createArrowedAlarm(
  str: string, 
  targetEl: HTMLElement, 
  direction: 'left' | 'top' | 'right' | 'bottom',
  dly: number = 3000
) {
  el.value.innerHTML = '';
  
  const lines: string[] = str.split('\n');

  lines.forEach((v: string, i: number) => {
    el.value.innerHTML += v;
    if (i !== lines.length - 1) el.value.innerHTML += "<br>";
  });

  el.value.classList.remove("left", "right", "top", "bottom", "arrowed-alarm-closed", "arrowed-alarm-open");
  el.value.classList.add(direction, "arrowed-alarm-closed");

  const t = targetEl.getBoundingClientRect();
  const s = el.value.getBoundingClientRect();

  const ARROW = 6;
  const gap   = 8;

  let top = 0;
  let left = 0;

  switch (direction) {
    case "left":
      top  = t.top + (t.height - s.height) / 2;
      left = t.left - s.width - gap - ARROW;
      break;

    case "right":
      top  = t.top + (t.height - s.height) / 2;
      left = t.right + gap + ARROW;
      break;

    case "top":
      top  = t.top - s.height - gap - ARROW;
      left = t.left + (t.width - s.width) / 2;
      break;

    case "bottom":
    default:
      top  = t.bottom + gap + ARROW;
      left = t.left + (t.width - s.width) / 2;
      break;
  }

  top  += window.scrollY;
  left += window.scrollX;

  el.value.style.top = `${top}px`;
  el.value.style.left = `${left}px`;

  requestAnimationFrame(() => {
    el.value.style.visibility = "visible";
    el.value.classList.replace("arrowed-alarm-closed", "arrowed-alarm-open");
  });

  if (hideTimer != null) clearTimeout(hideTimer);

  hideTimer = window.setTimeout(() =>{
    el.value.classList.replace("arrowed-alarm-open", "arrowed-alarm-closed");

    const handler = () => {
      el.value.style.top = "-9999px";
      el.value.style.left = "-9999px";
      el.value.removeEventListener('transitionend', handler);
    };
    el.value.addEventListener('transitionend', handler, { once: true });
  }, dly);
}