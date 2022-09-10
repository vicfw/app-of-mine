import { contextType } from ".";

export function category(state: contextType, action: any) {
  switch (action.type) {
    case "FETCH_CATEGORIES":
      console.log(action, "action");

      return { ...state, categories: action.payload };
    default:
      return state;
  }
}
