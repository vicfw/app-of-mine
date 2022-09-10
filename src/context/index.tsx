import { useState, useEffect, useReducer, createContext, FC } from "react";
import { CategoryType } from "../../types/category";

export type contextType = {
  categories: CategoryType[];
};

// initial state
const initialState: contextType = {
  categories: [],
};

// create context
const Context = createContext<any>(initialState);

// combine reducer function
const combineReducers =
  (...reducers: (((arg0: contextType, arg1: any) => any) | undefined)[]) =>
  (state: contextType, action: any) => {
    for (let i = 0; i < reducers.length; i++)
      state = reducers[i]!(state, action);
    return state;
  };

// context provider
const Provider: FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(combineReducers(), initialState); // pass more reducers combineReducers(user, blogs, products)
  const value = { state, dispatch };

  return <Context.Provider value={value as any}>{children}</Context.Provider>;
};

export { Context, Provider };
