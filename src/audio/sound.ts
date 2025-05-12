const soundClick = new Audio("/audio/sound/click.ogg");
const soundTyping = new Audio("/audio/sound/typing.mp3");
const soundDoor = new Audio("/audio/sound/door.ogg");
const soundSitting = new Audio("/audio/sound/sitting.mp3");
const soundBodyFall = new Audio("/audio/sound/bodyfall.mp3");
const soundSummon = new Audio("/audio/sound/summon.ogg");
const soundIce = new Audio("/audio/sound/ice.ogg");
const soundXpBeep = new Audio("/audio/sound/xpbeep.ogg");

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

export function playSoundXpBeep() {
  const element = soundXpBeep.cloneNode() as HTMLAudioElement;
  element.volume = 0.4;
  element.play();
}