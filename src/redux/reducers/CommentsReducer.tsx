import {
    FETCH_COMMENTS,
    ADD_COMMENT
} from "../actions/types";
import { CommentsState } from "../../types";

const initialState: CommentsState = {
    data: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case `${FETCH_COMMENTS}_FULFILLED`:
            return {
                ...state,
                data: action.payload
            }
        default: return state
    }

}