let element: HTMLAudioElement | null;

export default function playMusic(theme: "title" | "gag" | "wind" | "orgol" | "sad" | "crisis" | "heroine1_theme") {
  let sound: HTMLAudioElement | null;
  let volume: number = 0.8;

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
    case "sad":
      sound = new Audio("/audio/music/sad.mp3");
      break;
    case "crisis":
      sound = new Audio("/audio/music/crisis.ogg");
      volume = 0.35;
      break;
    case "heroine1_theme":
      sound = new Audio("/audio/music/heroine1_theme.ogg");
      volume = 0.42;
      break;
    default:
      return;
  }

  stopMusic();

  element = sound.cloneNode() as HTMLAudioElement;
  element.volume = volume;
  element.loop = true;
  element.play();
}

export function stopMusic() {
  if (element) {
    element.pause();
    element = null;
  }
}