const bgmTitle: HTMLAudioElement = new Audio("/audio/music/title.mp3");
const bgmGag: HTMLAudioElement = new Audio("/audio/music/gag.mp3");
const bgmWind: HTMLAudioElement = new Audio("/audio/music/wind.ogg");
const bgmOrgol: HTMLAudioElement = new Audio("/audio/music/orgol.mp3");
const bgmSad: HTMLAudioElement = new Audio("/audio/music/sad.mp3");
const bgmCrisis: HTMLAudioElement = new Audio("/audio/music/crisis.ogg");
const bgmHeroin_1_theme: HTMLAudioElement = new Audio("/audio/music/heroine1_theme.ogg");

type MusicList = 
  "title" | 
  "gag" | 
  "wind" | 
  "orgol" | 
  "sad" | 
  "crisis" | 
  "heroine1_theme";

let element: HTMLAudioElement | null;

export default function playMusic(theme: MusicList) {
  let sound: HTMLAudioElement | null = null;
  let volume: number = 0.8;

  switch (theme) {
    case "title":
      sound = bgmTitle;
      break;
    case "gag":
      sound = bgmGag;
      break;
    case "wind":
      sound = bgmWind;
      break;
    case "orgol":
      sound = bgmOrgol;
      break;
    case "sad":
      sound = bgmSad;
      break;
    case "crisis":
      sound = bgmCrisis;
      volume = 0.35;
      break;
    case "heroine1_theme":
      sound = bgmHeroin_1_theme;
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