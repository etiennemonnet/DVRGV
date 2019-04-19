import {
    FETCH_USERS,
    SET_PROFILE,
    FETCH_USERS_PENDING,
    FETCH_USERS_FULFILLED,
    FETCH_USERS_REJECTED
} from "./types";


export const fetchUsers = () => ({
    type: FETCH_USERS,
})

export const fetchUsersPending = () => ({
    type: FETCH_USERS_PENDING,
})

export const fetchUsersFulfilled = (users) => ({
    type: FETCH_USERS_FULFILLED,
    payload: users
})

export const fetchUsersRejected = (error) => ({
    type: FETCH_USERS_REJECTED,
    payload: error
})

export const setProfile = ({ ...profile }) => ({
    type: SET_PROFILE,
    payload: profile
})