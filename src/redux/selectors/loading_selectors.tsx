import {
    FETCH_CATEGORIES,
    FETCH_POSTS,
    FETCH_COMMENTS,
    FETCH_PAGES,
    FETCH_USERS,
    FETCH_REMAINING_POSTS
} from '../actions/types'
import _ from 'lodash'
import { Section, LoadingState, GlobalState } from '../../types';

export const isLoadingSelector = (state) => {
    if (!state.loading) return true
    const loading1 = createLoadingSelector([
        FETCH_CATEGORIES,
        FETCH_PAGES,
        FETCH_USERS,
        FETCH_COMMENTS
    ])(state.loading)

    const podcastsLoading = postsIsLoadingSelector(state, 'podcasts')
    const articlesIsLoading = postsIsLoadingSelector(state, 'articles')

    return [loading1, podcastsLoading, articlesIsLoading].some((loading) => loading)
}

export const commentsIsLoadingSelector = (state: GlobalState) => {
    return createLoadingSelector([
        FETCH_COMMENTS
    ])(state.loading)
}

export const categoriesIsLoadingSelector = (state: GlobalState) => {
    return createLoadingSelector([
        FETCH_CATEGORIES
    ])(state.loading)
}

export const postsIsLoadingSelector = (state: GlobalState, section: Section) => {
    return createLoadingSelector([
        FETCH_POSTS,
/*         FETCH_REMAINING_POSTS
 */    ])(state.loading[section])
}

export const remainingPostsIsLoadingSelector = (state: GlobalState, section: Section) => {
    return createLoadingSelector([
        FETCH_REMAINING_POSTS
    ])(state.loading[section])
}

export const pagesIsLoadingSelector = (state:GlobalState) => {
    return createLoadingSelector([
        FETCH_PAGES
    ])(state.loading)
}

export const createLoadingSelector = (actions: Array<string>) => (state: LoadingState) => {
    // returns true only when all actions is not loading
    if (!state) return false
    return actions.some((action: string) => _.get(state, action))
};