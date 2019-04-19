import { createSelector } from 'reselect'
import {
    getSelectedPostIdSelector,
    getPostsSelector,
    getSelectedCategoriesSelector,
    getCategoriesSelector,
    getUsersSelector,
    getSearchTermSelector
} from './direct_selectors';
import { postsIsLoadingSelector } from './loading_selectors';
import { pipe } from 'rxjs';



export const postsWithDerivedDataSelector = createSelector(
    getPostsSelector,
    getCategoriesSelector,
    getUsersSelector,
    postsIsLoadingSelector,
    (posts, categories, users, isLoading) => {
        return posts.data.map((post) => {
            return {
                ...post,
                categories: post.categories.map((categoryId) => categories.data.find((category) => category.id == categoryId)),
                author: users.data.find((user) => post.author == user.id)
            }
        })
    }
)

export const selectedPostSelector = createSelector(
    postsWithDerivedDataSelector,
    getSelectedPostIdSelector,
    (posts, selectedPostId) => {
        if(!selectedPostId)return;
        return posts.find((post) => post.id == selectedPostId)
    }
)

export const postsWithCategoriesFilterSelector = createSelector(
    postsWithDerivedDataSelector,
    getSelectedCategoriesSelector,
    getSearchTermSelector,
    (posts, selectedCategories, searchTerm) => {
        const filterCategories = posts => {
            if (!selectedCategories.length) return posts
            return posts.filter((post) => post.categories.some((category) => selectedCategories.includes(category.id)))
        }
        const filterWithTerm = posts => {
            if (searchTerm == '') return posts
            return posts.filter((post) => post.title.rendered.toLowerCase().indexOf(searchTerm) > -1)
        }
        return pipe(
            filterCategories,
            filterWithTerm
        )(posts)
    }
)


export const isPodcastSelector = createSelector(
    selectedPostSelector,
    (selectedPost) => selectedPost.categories.some((category) => category.id == 195)
)

export const getPodcastLinkFromPostContentSelector = createSelector(
    selectedPostSelector,
    isPodcastSelector,
    (selectedPost, isPodcast) => {
        if (!isPodcast) return;

        const content = selectedPost.content.rendered
        const regex2 = /https?:\/\/.+?.mp3/ig
        var links = content.match(regex2);
        if (!links) return;
        return links[0]
    }
)