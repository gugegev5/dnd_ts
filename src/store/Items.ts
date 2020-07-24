import { ItemTypes } from "../components/ItemTypes";
import { Action } from "redux";

export enum ItemsActionNames {
  INSERT = "INSERT",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export interface ItemsActionTypesI extends Action<ItemsActionNames> {}

export interface SingleItemStateI {
  itemType: ItemTypes;
  itemKey: string;
  styles: { [index: string]: string };
}

export interface ItemsStateI {
  [index: string]: SingleItemStateI;
}

export const initialState: ItemsStateI = {
  // "1": {
  //   itemType: ItemTypes.Background,
  //   itemKey: "1",
  //   styles: {
  //     backgroundColor: "#ffff00",
  //     width: "200px",
  //     height: "200px",
  //   },
  // },
  // "2": {
  //   itemType: ItemTypes.Background,
  //   itemKey: "2",
  //   styles: { backgroundColor: "#ff0000", width: "100px", height: "100px" },
  // },
};

(() => {
  for (let i = 1000; i < 1255; i++) {
    const colors = ["#ff0000", "#0f0", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];
    initialState[i] = {
      itemType: ItemTypes.Background,
      itemKey: "4",
      styles: {
        backgroundColor: colors[i % 6],
        width: "100px",
        height: "100px",
      },
    };
  }
})();

const ItemsReducers = (
  state: ItemsStateI = initialState,
  action: ItemsActionTypesI
) => {
  switch (action.type) {
    case ItemsActionNames.INSERT:
      return { ...state };
    case ItemsActionNames.UPDATE:
      return { ...state };
    case ItemsActionNames.DELETE:
      return { ...state };
    default:
      return state;
  }
};

export default ItemsReducers;
