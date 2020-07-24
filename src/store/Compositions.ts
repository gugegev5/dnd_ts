import { ItemTypes } from "../components/ItemTypes";
import { Action } from "redux";
import { List, fromJS, Map } from "immutable";
import { defaultItemKeys } from "../components/ItemTypes";

export enum CompositionsActionNames {
  INSERT = "INSERT",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

type CompositionItemObj = {
  itemType: ItemTypes;
  itemKey: string;
  // styles: React.CSSProperties;
  childrens: List<CompositionItemStateI>;
};

export interface CompositionItemStateI
  extends Map<keyof CompositionItemObj, any> {
  get: <K extends keyof CompositionItemObj>(key: K) => CompositionItemObj[K];
  updateIn(
    keyPath: Iterable<string>,
    updater: (value: List<CompositionItemStateI>) => any
  ): this;
}

interface CompositionsActionTypesCommonI
  extends Action<CompositionsActionNames> {
  targetItemKey: string;
  sourceItemType: ItemTypes;
}

export type CompositionsActionTypesI =
  | (CompositionsActionTypesCommonI & {
      type: CompositionsActionNames.DELETE | CompositionsActionNames.UPDATE;
    })
  | {
      type: CompositionsActionNames.INSERT;
      sourceItemKey: string;
      targetItemKey: string;
      sourceItemType: ItemTypes;
    };

export interface CompositionStateI {
  itemType: ItemTypes;
  itemKey: string;
  styles: { [index: string]: string };
}

export interface CompositionStatesI {
  [index: string]: CompositionStateI;
}

export const initialState: CompositionItemStateI = fromJS({
  itemType: ItemTypes.Default,
  itemKey: defaultItemKeys.Default,
  childrens: [
    // {
    //   itemType: ItemTypes.Background,
    //   itemKey: "1",
    //   childrens: [],
    // },
    // {
    //   itemType: ItemTypes.Background,
    //   itemKey: "2",
    //   childrens: [],
    // },
  ],
});

function searchByItemKey(
  state: CompositionItemStateI,
  itemKey: string
): [string[] | undefined, CompositionItemStateI] {
  if (state.get("itemKey") !== itemKey) {
    const res = searchRecursByItemKey(state.get("childrens"), itemKey, [
      "childrens",
    ]);
    if (res) {
      return res;
    } else {
      return [undefined, state];
    }
  }
  return [[], state];
}

function searchRecursByItemKey(
  childrens: List<CompositionItemStateI>,
  itemKey: string,
  keyPath: string[]
): [string[], CompositionItemStateI] | undefined {
  for (let i = 0; i < childrens.size; i++) {
    const keyPathMid = [...keyPath, `${i}`];
    const item = childrens.get(i);
    if (item!.get("itemKey") === itemKey) {
      // keyPathMid.push("childrens");
      return [keyPathMid, item!];
    } else {
      keyPathMid.push("childrens");
      const res = searchRecursByItemKey(
        item!.get("childrens"),
        itemKey,
        keyPathMid
      );
      if (res) {
        return res;
      }
    }
  }

  return undefined;
}

const CompositionsReducers = function (
  state: CompositionItemStateI = initialState,
  action: CompositionsActionTypesI
): CompositionItemStateI {
  if (action.type === CompositionsActionNames.INSERT) {
    const [keyPath] = searchByItemKey(state, action.targetItemKey);
    if (keyPath) {
      const itemTodo = Map({
        itemType: action.sourceItemType,
        itemKey: action.sourceItemKey,
        childrens: [],
      });
      return state.updateIn(keyPath.concat("childrens"), (childrens) => {
        return childrens.size
          ? childrens.push(itemTodo as CompositionItemStateI)
          : List([itemTodo]);
      });
    }
  } else if (action.type === CompositionsActionNames.DELETE) {
    const [keyPath] = searchByItemKey(state, action.targetItemKey);

    return keyPath && keyPath.length ? state.removeIn(keyPath) : state;
  }
  return state;
};
export default CompositionsReducers;
