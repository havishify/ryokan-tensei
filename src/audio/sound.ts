const soundClick = new Audio("/audio/sound/click.ogg");
const soundTyping = new Audio("/audio/sound/typing.mp3");
const soundDoor = new Audio("/audio/sound/door.ogg");
const soundSitting = new Audio("/audio/sound/sitting.mp3");
const soundBodyFall = new Audio("/audio/sound/bodyfall.mp3");
const soundSummon = new Audio("/audio/sound/summon.ogg");
const soundIce = new Audio("/audio/sound/ice.ogg");
const soundBeep1 = new Audio("/audio/sound/beep1.ogg");
const soundChime = new Audio("/audio/sound/chime.ogg");
const soundWinOpen = new Audio("/audio/sound/winopen.ogg");

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

export function playSoundSitting() {
  const element = soundSitting.cloneNode() as HTMLAudioElement;
  element.volume = 0.8;
  element.play();
}

export function playSoundBodyFall() {
  const element = soundBodyFall.cloneNode() as HTMLAudioElement;
  element.volume = 0.8;
  element.play();
}

export function playSoundSummon() {
  const element = soundSummon.cloneNode() as HTMLAudioElement;
  element.volume = 0.8;
  element.play();
}

export function playSoundIce() {
  const element = soundIce.cloneNode() as HTMLAudioElement;
  element.volume = 0.8;
  element.play();
}

export function playSoundBeep1() {
  const element = soundBeep1.cloneNode() as HTMLAudioElement;
  element.volume = 0.7;
  element.play();
}

export function playSoundChime() {
  const el = soundChime.cloneNode() as HTMLAudioElement;
  el.volume = 0.6;
  el.play();
}

export function playSoundWinOpen() {
  const el = soundWinOpen.cloneNode() as HTMLAudioElement;
  el.volume = 0.6;
  el.play();
}