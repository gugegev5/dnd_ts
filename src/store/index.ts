import { createStore, combineReducers, CombinedState } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import ItemsReducers, {
  ItemsStateI,
  initialState as ItemsInitial,
} from "./Items";
import CompositionsReducers, {
  CompositionItemStateI,
  initialState as CompositionsInitial,
} from "./Compositions";
import ItemKeyReducers, {
  ItemKeyStateI,
  initialState as ItemKeyInitial,
} from "./ItemKey";

export interface RootStateI {
  Items: ItemsStateI;
  Compositions: CompositionItemStateI;
  ItemKey: ItemKeyStateI;
}

const rootReducer = combineReducers<RootStateI>({
  Items: ItemsReducers,
  Compositions: CompositionsReducers,
  ItemKey: ItemKeyReducers,
});

const store = createStore<CombinedState<RootStateI>, any, any, any>(
  rootReducer,
  {
    Items: ItemsInitial,
    Compositions: CompositionsInitial,
    ItemKey: ItemKeyInitial,
  },
  /* preloadedState, */ devToolsEnhancer({})
);

export default store;
