import { contextType, InitialState } from ".";

export function category(state: InitialState, action: any): InitialState {
  switch (action.type) {
    case "FETCH_CATEGORIES":
      return { ...state, categories: action.payload };
    default:
      return state;
  }
}
