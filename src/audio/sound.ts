const soundClick = new Audio("/audio/sound/click.ogg");
const soundTyping = new Audio("/audio/sound/typing.mp3");
const soundDoor = new Audio("/audio/sound/door.ogg");

export function playSoundClick() {
  const element = soundClick.cloneNode() as HTMLAudioElement;
  element.volume = 0.5;
  element.play();
}

export function playSoundTyping() {
  const sound = soundTyping.cloneNode() as HTMLAudioElement;
  sound.playbackRate = 0.75 + Math.random() * 0.4;
  sound.volume = 0.09;
  sound.play();
}

export function playSoundDoor() {
  const element = soundDoor.cloneNode() as HTMLAudioElement;
  element.volume = 0.5;
  element.play();
}