import {
    FETCH_POSTS,
    SELECT_POST,
    FETCH_CATEGORIES,
    ADD_CATEGORY_FILTER,
    REMOVE_CATEGORY_FILTER,
    FETCH_POSTS_REJECTED,
    FETCH_POSTS_PENDING,
    FETCH_POSTS_FULFILLED,
    FETCH_CATEGORIES_PENDING,
    FETCH_CATEGORIES_REJECTED,
    FETCH_CATEGORIES_FULFILLED,
    FETCH_POSTS_CANCELLED,
    SEARCH_POSTS_WITH_TERM,
    FETCH_REMAINING_POSTS_FULFILLED,
    FETCH_REMAINING_POSTS_PENDING,
} from './types'
import { Section } from '../../types';

export const fetchPosts = (
    section: Section,
    pageNumber: number,
    categories: number[],
    categoriesExcluded: number[],
    remaining?: boolean) => ({
        type: FETCH_POSTS,
        payload: { section, pageNumber, categories, categoriesExcluded, remaining },
    })

export const fetchPostsPending = (section: Section, remaining: boolean) => {
    const type = remaining ? FETCH_REMAINING_POSTS_PENDING : FETCH_POSTS_PENDING
    return {
        type: type,
        payload: { section: section }
    }
}

export const fetchPostsCancelled = () => ({
    type: FETCH_POSTS_CANCELLED
})

export const fetchPostsFulfilled = (response, section: Section, remaining: boolean) => {
    const type = !remaining ? FETCH_POSTS_FULFILLED : FETCH_REMAINING_POSTS_FULFILLED
    return {
        type: type,
        payload: { response: response, section: section }
    }
}


export const fetchPostsRejected = (error, section: Section) => ({
    type: FETCH_POSTS_REJECTED,
    payload: { error: error, section: section }
})


export const selectPost = (id: string, section: Section) => ({
    type: SELECT_POST,
    payload: { id: id, section: section }
})

export const fetchCategories = () => ({
    type: FETCH_CATEGORIES,
})

export const fetchCategoriesPending = () => ({
    type: FETCH_CATEGORIES_PENDING
})

export const fetchCategoriesFulfilled = (payload) => ({
    type: FETCH_CATEGORIES_FULFILLED,
    payload: payload
})

export const fetchCategoriesRejected = (error) => ({
    type: FETCH_CATEGORIES_REJECTED,
    payload: error
})

export const addCategoryFilter = (id: string, section: Section) => ({
    type: ADD_CATEGORY_FILTER,
    payload: { id: id, section: section }
})

export const removeCategoryFilter = (id: string, section: Section) => ({
    type: REMOVE_CATEGORY_FILTER,
    payload: { id: id, section: section }

})

export const searchPostsWithTerm = (term: string, section: Section) => ({
    type: SEARCH_POSTS_WITH_TERM,
    payload: { term: term, section: section }
})