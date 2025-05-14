export function gstNext(): Promise<void> {
  return new Promise<void>((resolve) => {
    const handlerKeydown = (ev: KeyboardEvent) => {
      if (["Enter", " "].includes(ev.key)) {
        window.removeEventListener("keydown", handlerKeydown);
        resolve();
      }
    };
    const handlerClick = (_: MouseEvent) => {
      window.removeEventListener("click", handlerClick);
      resolve();
    };
    window.addEventListener("keydown", handlerKeydown);
    window.addEventListener("click", handlerClick)
  });
};