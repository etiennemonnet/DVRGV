import _ from 'lodash'
import * as ActionTypes from '../actions/types'
import { Section } from '../../types';




export const createErrorSelector = (actions: Array<string>) => (state: any) => {
    return _(actions)
        .map((action: any) => _.get(state, action))
        .compact()
        .first() || false
};

export const networkErrorSelector = (state) => {
    return createErrorSelector([
        ActionTypes.FETCH_COMMENTS,
        ActionTypes.FETCH_STREAM_INFO,
        ActionTypes.FETCH_PAGES,
        ActionTypes.FETCH_USERS,
        ActionTypes.FETCH_CATEGORIES,
        ActionTypes.FETCH_POSTS,
    ])(state.error)
}

export const streamInfoHasError = state => {
    return createErrorSelector([
        ActionTypes.FETCH_STREAM_INFO
    ])(state.error)
}

export const pagesHasErrorSelector = state => {
    return createErrorSelector([
        ActionTypes.FETCH_PAGES
    ])(state.error)
}

export const postsHasErrorSelector = (state, section: Section) => {
    return createErrorSelector([
        ActionTypes.FETCH_POSTS,
        ActionTypes.FETCH_REMAINING_POSTS
    ])(state.error[section])
}

export const categoriesHasErrorSelector = state => {
    return createErrorSelector([
        ActionTypes.FETCH_CATEGORIES
    ])(state.error)
}

export const commentsHasErrorSelector = state => {
    return createErrorSelector([
        ActionTypes.FETCH_COMMENTS,
        ActionTypes.ADD_COMMENT
    ])(state.error)
}