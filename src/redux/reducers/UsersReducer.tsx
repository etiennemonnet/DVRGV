import { FETCH_USERS } from '../actions/types'
import { UsersState } from '../../types';

const initialState: UsersState = {
    data: []
}
export default (state = initialState, action) => {
    switch (action.type) {
        case `${FETCH_USERS}_FULFILLED`:
            return {
                ...state,
                data: action.payload.data
            }
        default: return state
    }
}