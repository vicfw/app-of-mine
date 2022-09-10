import {
  useState,
  useEffect,
  useReducer,
  createContext,
  FC,
  Dispatch,
} from "react";
import { CategoryType } from "../../types/category";
import { category } from "./category";

export type InitialState = {
  categories: CategoryType[];
};

export type contextType = {
  state: InitialState;
  dispatch: Dispatch<any>;
};

// initial state
const initialState: contextType = {
  state: { categories: [] },
  dispatch: () => {},
};

// create context
const Context = createContext<contextType>(initialState);

// combine reducer function
const combineReducers =
  (...reducers: ((state: InitialState, action: any) => InitialState)[]) =>
  (state: any, action: any) => {
    for (let i = 0; i < reducers.length; i++)
      state = reducers[i]!(state, action);
    return state;
  };

// context provider
const Provider: FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(combineReducers(category), initialState); // pass more reducers combineReducers(user, blogs, products)
  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
