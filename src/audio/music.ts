let element: HTMLAudioElement | null;

export default function playMusic(theme: "title" | "intro before" | "intro after" ) {
  let sound: HTMLAudioElement | null;

  switch (theme) {
    case "title":
      sound = new Audio("/audio/music/title.mp3");
      break;
    case "intro before":
      sound = new Audio("/audio/music/intro_before.mp3");
      break;
    case "intro after":
      sound = new Audio("/audio/music/intro_after.mp3");
      break;
    default:
      return;
  }

  stopMusic();

  element = sound.cloneNode() as HTMLAudioElement;
  element.volume = 0.75;
  element.loop = true;
  element.play();
}

export function stopMusic() {
  if (element) {
    element.pause();
    element = null;
  }
}