import { ItemTypes } from "../components/ItemTypes";
import { Action } from "redux";

enum ItemsActionNames {
  INSERT = "INSERT",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export interface ItemsActionTypesI extends Action<ItemsActionNames> {}

export interface ItemStateI {
  itemType: ItemTypes;
  itemKey: string;
  styles: { [index: string]: string };
}

export interface ItemStatesI {
  [index: string]: ItemStateI;
}

export const initialState: ItemStatesI = {
  "1": {
    itemType: ItemTypes.Background,
    itemKey: "1",
    styles: {
      backgroundColor: "yellow",
      width: "200px",
      height: "200px",
    },
  },
  "2": {
    itemType: ItemTypes.Background,
    itemKey: "2",
    styles: { backgroundColor: "red", width: "100px", height: "100px" },
  },
  
  "1000": {
    itemType: ItemTypes.Background,
    itemKey: "1000",
    styles: { backgroundColor: "white", width: "100px", height: "100px" },
  },
  "1001": {
    itemType: ItemTypes.Background,
    itemKey: "1000",
    styles: { backgroundColor: "white", width: "90px", height: "90px" },
  },
  "1002": {
    itemType: ItemTypes.Background,
    itemKey: "3",
    styles: { backgroundColor: "blue", width: "200px", height: "200px" },
  },
  "1003": {
    itemType: ItemTypes.Background,
    itemKey: "4",
    styles: { backgroundColor: "white", width: "100px", height: "100px" },
  },
};

const ItemsReducers = (
  state: ItemStatesI = initialState,
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
