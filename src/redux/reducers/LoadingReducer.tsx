import { FETCH_POSTS, FETCH_REMAINING_POSTS, DISCONNECTED } from "../actions/types";
import { LoadingState } from "../../types";

const initialState: LoadingState = null

export default (state = initialState, action: any) => {
  const { type } = action;

/*   if (type == DISCONNECTED) return initialState
 */
  const matches = /([^.]*)_(PENDING|FULFILLED|REJECTED|CANCELLED)/.exec(type);
  if (!matches) return state;

  const [actionTotal, actionName, actionState] = matches;
  if (actionName == FETCH_POSTS || actionName == FETCH_REMAINING_POSTS) {
    return {
      ...state,
      [action.payload.section]: {
        ...state[action.payload.section],
        [actionName]: actionState == 'PENDING'
      }
    }
  }
  else {
    return {
      ...state,
      [actionName]: actionState === 'PENDING',
    };
  }

};
