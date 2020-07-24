import { Action } from "redux";
import { ItemsActionNames } from "./Items";

export interface ItemKeyActionTypesI extends Action<ItemsActionNames> {}

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
  if (action.type === ItemsActionNames.INSERT) {
    return { newItemKey: `${parseInt(state.newItemKey, 10) + 1}` };
  }
  return state;
};

export default ItemKeyReducers;
