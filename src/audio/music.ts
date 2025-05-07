let element: HTMLAudioElement | null;

export default function playMusic(theme: "title" | "gag" | "wind" | "orgol" ) {
  let sound: HTMLAudioElement | null;

  switch (theme) {
    case "title":
      sound = new Audio("/audio/music/title.mp3");
      break;
    case "gag":
      sound = new Audio("/audio/music/gag.mp3");
      break;
    case "wind":
      sound = new Audio("/audio/music/wind.ogg");
      break;
    case "orgol":
      sound = new Audio("/audio/music/orgol.mp3");
      break;
    default:
      return;
  }

  stopMusic();

  element = sound.cloneNode() as HTMLAudioElement;
  element.volume = 0.8;
  element.loop = true;
  element.play();
}

export function stopMusic() {
  if (element) {
    element.pause();
    element = null;
  }
}