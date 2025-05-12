import { elementCinematicImg } from "@/main";

export function changeBackgroundImage(path: string) {
  elementCinematicImg.value.src = path;
}