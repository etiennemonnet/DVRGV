import { createSelector } from 'reselect'
import {
    getSelectedPostIdSelector,
    getCommentsSelector
} from './direct_selectors';


export const commentsByPostSelector = createSelector(
    getSelectedPostIdSelector,
    getCommentsSelector,
    (selectedPost,comments)=>{
        return comments.data.filter((comment)=>comment.post == selectedPost)
    }
)