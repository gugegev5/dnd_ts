import { Action } from "redux";
import { CompositionsActionNames } from "./Compositions";

export interface ItemKeyActionTypesI extends Action<CompositionsActionNames> {}

export interface ItemKeyStateI {
  newItemKey: string;
}

export const initialState: ItemKeyStateI = {
  newItemKey: "1000",
};

const ItemKeyReducers = (
  state: ItemKeyStateI = initialState,
  action: ItemKeyActionTypesI
): ItemKeyStateI => {
  if (action.type === CompositionsActionNames.INSERT) {
    return { newItemKey: `${parseInt(state.newItemKey, 10) + 1}` };
  }
  return state;
};

export default ItemKeyReducers;
