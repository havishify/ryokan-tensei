export default function globalListenKeydown() {
  window.addEventListener("keydown", (ev: KeyboardEvent) => {
    if (ev.key === 'F5') {
      window.location.reload();
      ev.preventDefault();
    }

    if ((ev.ctrlKey && ev.key === 'r')) ev.preventDefault();
    if (ev.altKey && (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight')) ev.preventDefault();
    if (ev.key === 'Tab') ev.preventDefault();
    if (ev.ctrlKey && ev.key === 'p') ev.preventDefault();
    if (ev.ctrlKey && ev.key === 'j') ev.preventDefault();
    if (ev.ctrlKey && ev.key === 'u') ev.preventDefault();
    if (ev.ctrlKey && ev.key === 'f') ev.preventDefault();
    if (ev.ctrlKey && ev.key === 'h') ev.preventDefault();
    if (ev.ctrlKey && ev.key === 'g') ev.preventDefault();
    if (ev.ctrlKey && ev.key === 's') ev.preventDefault();
    if (ev.ctrlKey && ev.key === 'o') ev.preventDefault();
  });
}