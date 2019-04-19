import {
    FETCH_PAGES,
    SELECT_PAGE,
    SELECT_PAGE_WITH_LINK,
    SELECT_MEMBER_PAGE,
    FETCH_PAGES_FULFILLED,
    FETCH_PAGES_PENDING,
    ADD_PAGE_TO_STACK,
    FETCH_PAGES_REJECTED
} from "./types";


export const fetchPages = () => ({
    type: FETCH_PAGES,
})

export const fetchPagesPending = () => ({
    type: FETCH_PAGES_PENDING
})
export const fetchPagesFulfilled = (payload) => ({
    type: FETCH_PAGES_FULFILLED,
    payload: payload
})

export const fetchPagesRejected = (error) => ({
    type: FETCH_PAGES_REJECTED,
    payload: error
})
export const addPageToStack = (page: number | string) => ({
        type: ADD_PAGE_TO_STACK,
        payload: page
    })

export const selectPage = (id?, link?) => ({
    type: SELECT_PAGE,
    payload: { id, link }
})
export const selectPageWithLink = (link) => ({
    type: SELECT_PAGE_WITH_LINK,
    payload: link
})

export const selectMemberPage = (id?, link?) => ({
    type: SELECT_MEMBER_PAGE,
    payload: { id, link }
})