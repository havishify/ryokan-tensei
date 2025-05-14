import { ElementProperty, Property } from "@/types";

import { TableDetailProps } from "./types";

export const elGSTableDetail = new ElementProperty<HTMLDivElement>("#game-serving-table-detail-window"); 
const elGSTDTitle = new ElementProperty<HTMLDivElement>("#game-serving-table-detail-title");
const elGSTDName = new ElementProperty<HTMLParagraphElement>("#game-serving-table-detail-name");
const elGSTDMood = new ElementProperty<HTMLParagraphElement>("#game-serving-table-detail-mood");
const elGSTDPortrait = new ElementProperty<HTMLImageElement>("#game-serving-table-detail-portrait");

export const tableDetail = new Property<TableDetailProps>({
  title: '',
  position: { x: -1, y: -1 },
  name: '',
  mood: '😐',
  portrait: ''
}, (v: TableDetailProps) => {
  const { title, position, name, mood, portrait } = v;
  elGSTDTitle.value.innerText = `${title} (${position.x}, ${position.y})`;
  elGSTDName.value.innerText = `이름: ${name}`;
  elGSTDMood.value.innerText = `기분: ${mood}`;
  elGSTDPortrait.value.src = portrait;
});