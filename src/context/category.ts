import { contextType, InitialState } from ".";

export function category(state: InitialState, action: any): InitialState {
  console.log(action, "action");

  switch (action.type) {
    case "FETCH_CATEGORIES":
      return { ...state, categories: action.payload };
    default:
      return state;
  }
}
