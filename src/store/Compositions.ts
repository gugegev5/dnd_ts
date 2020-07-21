import { ItemTypes } from "../components/ItemTypes";
import { Action } from "redux";
import { List, fromJS, Map } from "immutable";
import { defaultItemKeys } from "../components/ItemTypes";

export enum CompositionsActionNames {
  INSERT = "INSERT",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export type CompositionItemObj = {
  itemType: ItemTypes;
  itemKey: string;
  // styles: React.CSSProperties;
  childrens: List<CompositionItemI>;
};

export interface CompositionItemI extends Map<keyof CompositionItemObj, any> {
  get: <K extends keyof CompositionItemObj>(key: K) => CompositionItemObj[K];
  updateIn(
    keyPath: Iterable<string>,
    updater: (value: List<CompositionItemI>) => any
  ): this;
}

// export type CompositionItemI = CompositionMap;

export interface CompositionsActionTypesI
  extends Action<CompositionsActionNames> {
  sourceItemKey?: string;
  targetItemKey: string;
  sourceItemType: ItemTypes;
}

export interface CompositionStateI {
  itemType: ItemTypes;
  itemKey: string;
  styles: { [index: string]: string };
}

export interface CompositionStatesI {
  [index: string]: CompositionStateI;
}

export const initialState: CompositionItemI = fromJS({
  itemType: ItemTypes.Default,
  itemKey: defaultItemKeys.Default,
  childrens: [
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
      childrens: [],
    },
  ],
});

function searchByItemKey(
  state: CompositionItemI,
  itemKey: string
): [string[], CompositionItemI] {
  const keyPath = ["childrens"];
  if (state.get("itemKey") !== itemKey) {
    const res = searchRecursByItemKey(state.get("childrens"), itemKey, keyPath);
    if (res) {
      return res;
    }
  }
  return [keyPath, state];
}

function searchRecursByItemKey(
  childrens: List<CompositionItemI>,
  itemKey: string,
  keyPath: string[]
): [string[], CompositionItemI] | undefined {
  for (let i = 0; i < childrens.size; i++) {
    const item = childrens.get(i);
    if (item!.get("itemKey") === itemKey) {
      keyPath.push(`${i}`);
      return [keyPath, item!];
    } else {
      keyPath.push("childrens");
      const res = searchRecursByItemKey(
        item!.get("childrens"),
        itemKey,
        keyPath
      );
      if (res) {
        return res;
      }
    }
  }

  return undefined;
}

const CompositionsReducers = function (
  state: CompositionItemI = initialState,
  action: CompositionsActionTypesI
): CompositionItemI {
  if (action.type === CompositionsActionNames.INSERT) {
    const [keyPath] = searchByItemKey(state, action.targetItemKey);

    const itemTodo = Map({
      itemType: action.sourceItemType,
      itemKey: action.sourceItemKey,
      childrens: [],
    });
    return state.updateIn(keyPath, (childrens) =>
      childrens.push(itemTodo as CompositionItemI)
    );
  }
  // else {
  // return { ...state };
  //   }
  //   } else if (action.type === CompositionsActionNames.UPDATE) {
  //   } else if (action.type === CompositionsActionNames.DELETE) {
  //   } else {
  //     return state;
  //   }
  return state;
};
export default CompositionsReducers;
