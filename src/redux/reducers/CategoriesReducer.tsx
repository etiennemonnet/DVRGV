import {
    FETCH_CATEGORIES,
    ADD_CATEGORY_FILTER,
    REMOVE_CATEGORY_FILTER,
    FETCH_CATEGORIES_FULFILLED
} from '../actions/types'
import { CategoriesState } from '../../types';

const initialState:CategoriesState = {
    data: [],
    selectedCategories: {
        podcasts: [],
        articles: []
    }
}
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_FULFILLED:
            return {
                ...state,
                data: action.payload
            }
        case ADD_CATEGORY_FILTER:
            return {
                ...state,
                selectedCategories: {
                    ...state.selectedCategories,
                    [action.payload.section]: state.selectedCategories[action.payload.section].concat(action.payload.id)
                }
            }
        case REMOVE_CATEGORY_FILTER:
            return {
                ...state,
                selectedCategories: {
                    ...state.selectedCategories,
                    [action.payload.section]: state.selectedCategories[action.payload.section].filter((categoryId) => categoryId !== action.payload.id)
                }
            }
        default: return state
    }
}