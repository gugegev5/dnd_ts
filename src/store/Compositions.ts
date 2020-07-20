import { ItemTypes } from "../components/ItemTypes";
import { Action } from "redux";
import { List, fromJS, Map } from "immutable";
// import { defaultItemKeys } from "../components/ItemTypes";

enum CompositionsActionNames {
  INSERT = "INSERT",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export type CompositionItemObj = {
  itemType: ItemTypes;
  itemKey: string;
  // styles: React.CSSProperties;
  childrens: List<CompositionMap<any, any>>;
};

interface CompositionMap<K, V> extends Map<K, V> {
  get: <K extends keyof CompositionItemObj>(key: K) => CompositionItemObj[K];
}

export type CompositionItemI = CompositionMap<keyof CompositionItemObj, any>;

export interface CompositionsActionTypesI
  extends Action<CompositionsActionNames> {
  itemKey: string;
  itemType: ItemTypes;
}

export interface CompositionStateI {
  itemType: ItemTypes;
  itemKey: string;
  styles: { [index: string]: string };
}

export interface CompositionStatesI {
  [index: string]: CompositionStateI;
}

export const initialState: List<CompositionItemI> = fromJS([
  {
    itemType: ItemTypes.Background,
    itemKey: "1",
    childrens: [
      {
        itemType: ItemTypes.Background,
        itemKey: "2",
        childrens: [],
      },
    ],
  },
  {
    itemType: ItemTypes.Background,
    itemKey: "3",
    childrens: [
      {
        itemType: ItemTypes.Background,
        itemKey: "4",
        childrens: [],
      },
    ],
  },
]);

// function searchByItemKey(
//   state: List<CompositionItem>|undefined,
//   itemKey: string
// ): CompositionItem {
//     if(state){
//   for (let i = 0; i < state.size; i++) {
//     if (state.get(i)?.itemKey === itemKey) {
//       return state.get(i);
//     } else {
//       const result = searchByItemKey(state.get(i)?.childrens, itemKey);
//       if (result.itemType !== ItemTypes.Default) {
//         return result;
//       }
//     }
//   }

//   return {
//     itemType: ItemTypes.Default,
//     itemKey: defaultItemKeys.Default,
//     childrens: [],
//   };
// }

const CompositionsReducers = function (
  state: List<CompositionItemI> = initialState,
  action: CompositionsActionTypesI
) {
  //   if (action.type === CompositionsActionNames.INSERT) {
  // const item = searchByItemKey(state, action.itemKey);
  // if (item.itemType === ItemTypes.Default) {
  //   const itemTodo: CompositionItem = {
  //     itemType: action.itemType,
  //     itemKey: action.itemKey,
  //     childrens: [],
  //   };
  //   return state.concat(itemTodo);
  // } else {
  //   return { ...state };
  // }
  //   } else if (action.type === CompositionsActionNames.UPDATE) {
  //   } else if (action.type === CompositionsActionNames.DELETE) {
  //   } else {
  //     return state;
  //   }
  return state;
};

export default CompositionsReducers;
