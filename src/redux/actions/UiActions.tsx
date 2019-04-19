import {
    TOGGLE_CATEGORIES,
    TOGGLE_SEARCH,
    TOGGLE_PLAYER,
    TOGGLE_EMAIL_FORM
} from "./types";


export const toggleCategories = (screen: 'podcasts' | 'articles') => ({
    type: TOGGLE_CATEGORIES,
    payload: screen
})

export const toggleSearch = (screen: 'podcasts' | 'articles') => ({
    type: TOGGLE_SEARCH,
    payload: screen
})

export const togglePlayer = () => ({
    type: TOGGLE_PLAYER
})

export const toggleEmailForm = () => ({
    type: TOGGLE_EMAIL_FORM
})