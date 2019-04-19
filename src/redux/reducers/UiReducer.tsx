import { TOGGLE_CATEGORIES, TOGGLE_SEARCH, TOGGLE_PLAYER, TOGGLE_EMAIL_FORM } from "../actions/types";
import { UIState } from "../../types";

const initialState: UIState = {
    podcasts: {
        showCategories: true,
        showSearch: false
    },
    articles: {
        showCategories: true,
        showSearch: false,
    },
    showSearch: false,
    showPlayer: false,
}
export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_CATEGORIES:
            return {
                ...state,
                [action.payload]: {
                    ...state[action.payload],
                    showCategories: !state[action.payload].showCategories
                }
            }
        case TOGGLE_SEARCH:
            return {
                ...state,
                [action.payload]: {
                    ...state[action.payload],
                    showSearch: !state[action.payload].showSearch
                }
            }
        case TOGGLE_PLAYER:
            return {
                ...state,
                showPlayer: !state.showPlayer
            }
        case TOGGLE_EMAIL_FORM:
            return {
                ...state,
                showEmailForm: !state.showEmailForm
            }
        default: return state
    }
}