import { ElementProperty, Property } from "@/types";

import { TableDetailMoods } from "./table/types";

export type ServingMapRecord = {
  position: {
    x: number,
    y: number,
  },
  el: ElementProperty<HTMLButtonElement>,
  avatar: Property<string>,
  state: string,
  detail: {
    exists: boolean,
    name: string,
    mood: TableDetailMoods,
    portrait: string,
  }
};