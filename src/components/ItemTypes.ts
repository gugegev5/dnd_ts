import { CompositionsActionNames } from "../store/Compositions";

export enum ItemTypes {
  Default = "Default",
  Background = "Background",
}

export enum defaultItemKeys {
  Default = "0",
}

export interface CommonDragItemI {
  type: ItemTypes;
  itemKey: string;
  compositionActionName: CompositionsActionNames;
}

export interface CommonDragCollectedPropsI {
  opacity: number;
}
