import { SELECT_POST, SEARCH_POSTS_WITH_TERM, FETCH_REMAINING_POSTS_FULFILLED, FETCH_POSTS_FULFILLED } from "../actions/types";
import { PostsState } from "../../types";

const initialState: PostsState = {
    articles: {
        data: [],
        totalPages: null,
        total: null,
        searchTerm: ''
    },
    podcasts: {
        data: [],
        totalPages: null,
        total: null,
        searchTerm: ''
    },
    selectedPost: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS_FULFILLED:
            const { response, section } = action.payload
            return {
                ...state,
                [section]: {
                    ...state[section],
                    data: response.data,
                    totalPages: response.headers['x-wp-totalpages'],
                    total: response.headers['x-wp-total']
                }
            }

        case FETCH_REMAINING_POSTS_FULFILLED:
            return {
                ...state,
                [action.payload.section]: {
                    ...state[action.payload.section],
                    data: state[action.payload.section].data.concat(action.payload.response.data),
                }
            }

        case SELECT_POST:
            return {
                ...state,
                selectedPost: {
                    ...state.selectedPost,
                    [action.payload.section]: action.payload.id
                }
            }
        case SEARCH_POSTS_WITH_TERM:
            return {
                ...state,
                [action.payload.section]: {
                    ...state[action.payload.section],
                    searchTerm: action.payload.term
                }
            }
        default: return state
    }
}