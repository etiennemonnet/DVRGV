import {
    FETCH_COMMENTS,
    FETCH_COMMENTS_FULFILLED,
    FETCH_COMMENTS_REJECTED,
    ADD_COMMENT,
    ADD_COMMENT_FULFILLED,
    ADD_COMMENT_REJECTED,
    FETCH_COMMENTS_PENDING
} from './types'
import { Comment } from '../../types';


export const fetchComments = () => ({
    type: FETCH_COMMENTS,
})

export const fecthCommentsPending = () => ({
    type: FETCH_COMMENTS_PENDING
})

export const fetchCommentsFulfilled = (comments) => ({
    type: FETCH_COMMENTS_FULFILLED,
    payload: comments
})

export const fetchCommentsRejected = (error) => ({
    type: FETCH_COMMENTS_REJECTED,
    payload: error
})

export const addComment = ({ ...comment }: Comment) => ({
    type: ADD_COMMENT,
    payload: comment
})

export const addCommentFulfilled = (response) => ({
    type: ADD_COMMENT_FULFILLED,
    payload: response
})

export const addCommentRejected = (error) => ({
    type: ADD_COMMENT_REJECTED,
    payload: error
})
