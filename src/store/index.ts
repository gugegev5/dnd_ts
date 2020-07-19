import { createStore, combineReducers } from "redux";
import { Reducer } from "react";

enum CompositionsAction {
  INSERT = "INSERT",
  UPDATE = "UPDATE",
}

const compositions: Reducer<any, CompositionsAction> = () => {};

const reducers = {
  compositions,
};

interface IExtractState<T extends typeof reducers> {
  get<K extends keyof T>(
    k: K
  ): T[K] extends (...args: any[]) => any ? ReturnType<T[K]> : any;
}

export type IRootState = IExtractState<typeof reducers>;

const rootReducer = combineReducers({ potato: () => {} });

const store = createStore(rootReducer, {});

export default store;
