import { FETCH_POSTS, FETCH_REMAINING_POSTS, RESET_ERROR } from "../actions/types";
import { ErrorState } from "../../types";

const initialState: ErrorState = null

export default (state = initialState, action: any) => {
  const { type, payload } = action;
  if (type == RESET_ERROR) {
    return {
      ...state,
      [payload]: false
    }
  }

  const matches = /([^.]*)_(PENDING|FULFILLED|REJECTED)/.exec(type);
  if (!matches) return state;

  const [actionTotal, actionName, actionState] = matches;

  if (actionName == FETCH_POSTS || actionName == FETCH_REMAINING_POSTS) {
    return {
      ...state,
      [action.payload.section]: {
        ...state[action.payload.section],
        [actionName]: actionState == 'REJECTED' ? { actionName, ...action.payload.error } : false
      }
    }
  }
  else {
    return {
      ...state,
      [actionName]: actionState === 'REJECTED' ? { actionName, ...action.payload } : false,
    };
  }

};
