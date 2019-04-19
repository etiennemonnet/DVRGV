import { FETCH_PAGES, SELECT_PAGE, SELECT_PAGE_WITH_LINK, ADD_PAGE_TO_STACK } from '../actions/types'
import { PagesState } from '../../types';

const initialState:PagesState = {
    data: [],
    stack: [],
    selectedId: null,
    selectedLink: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case `${FETCH_PAGES}_FULFILLED`:
            return {
                ...state,
                data: action.payload
            }
        case ADD_PAGE_TO_STACK:
            return {
                ...state,
                stack: state.stack.concat(action.payload)
            }
        case SELECT_PAGE:
            return {
                ...state,
                selectedId: action.payload.id,
                selectedLink: action.payload.link
            }
        case SELECT_PAGE_WITH_LINK:
            return {
                ...state,
                selectedLink: action.payload
            }
        default: return state
    }
}