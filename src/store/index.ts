import { createStore, combineReducers, CombinedState } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import ItemsReducers, {
  ItemStatesI,
  initialState as ItemsInitial,
} from "./Items";
import CompositionsReducers, {
  CompositionItemI,
  initialState as CompositionsInitial,
} from "./Compositions";
import { List } from "immutable";

export interface RootStatesI {
  Items: ItemStatesI;
  Compositions: CompositionItemI;
}

const rootReducer = combineReducers<{ Items: any; Compositions: any }>({
  Items: ItemsReducers,
  Compositions: CompositionsReducers,
});

const store = createStore<
  CombinedState<{ Items: any; Compositions: any }>,
  any,
  any,
  any
>(
  rootReducer,
  {
    Items: ItemsInitial,
    Compositions: CompositionsInitial,
  },
  /* preloadedState, */ devToolsEnhancer({})
);

export default store;
