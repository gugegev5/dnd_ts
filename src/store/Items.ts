import { ItemTypes } from "../components/ItemTypes";
import { Action } from "redux";
export enum ItemsActionNames {
  INSERT = "INSERT",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export interface ItemsActionTypesI extends Action<ItemsActionNames> {
  sourceItemType: ItemTypes;
  sourceItemKey: string;
  styles: React.CSSProperties;
}

export interface SingleItemStateI {
  itemType: ItemTypes;
  itemKey: string;
  styles: React.CSSProperties;
}

export interface ItemsStateI {
  [index: string]: SingleItemStateI;
}

const colors = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
];

export const initialState: ItemsStateI = {
  "1000": {
    itemType: ItemTypes.Background,
    itemKey: "1",
    styles: {
      backgroundColor: "#ffffff",
      width: "100%",
      height: "200px",
      backgroundImage:
        "url('https://shark.qietv.douyucdn.cn/static/07141652/component/live/player/1.0/res/common/goddess/title-s.png')",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
    },
  },
};

function generateItem(itemType: ItemTypes, itemKey: string) {
  return {
    itemType,
    itemKey,
    styles: {
      backgroundColor: colors[parseInt(itemKey, 10) % 6],
      width: "100%",
      height: "200px",
      backgroundImage:
        "url('https://shark.qietv.douyucdn.cn/static/07141652/component/live/player/1.0/res/common/goddess/title-s.png')",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
    },
  };
}

const ItemsReducers = (
  state: ItemsStateI = initialState,
  action: ItemsActionTypesI
) => {
  switch (action.type) {
    case ItemsActionNames.INSERT:
      return (function () {
        const newKey = `${parseInt(action.sourceItemKey, 10) + 1}`;
        const itemStyle = generateItem(action.sourceItemType, newKey);
        console.log("item style insert", itemStyle);
        return { ...state, [newKey]: itemStyle };
      })();
    case ItemsActionNames.UPDATE:
      const mid = state[action.sourceItemKey];
      state[action.sourceItemKey].styles = { ...mid.styles, ...action.styles };
      console.log("item style update", action, state);
      return state;
    case ItemsActionNames.DELETE:
      return { ...state };
    default:
      return state;
  }
};

export default ItemsReducers;
