import { SET_PROFILE } from '../actions/types'
import { ProfileState } from '../../types';

const initialState: ProfileState = {
    name: '',
    email: '',
    avatarUrl: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                ...action.payload,
            }
        default: return state
    }
}