import axios from 'axios'
import { Comment } from '../types';

const domainUrl = 'https://www.dvrgv.org/wp-json'
const mainUrl = `${domainUrl}/wp/v2`
const postsApiUrl = `${mainUrl}/posts?per_page=30&_embed=1`
const categoriesUrl = `${mainUrl}/categories`
const commentsUrl = `${mainUrl}/comments`
const commentsByPostUrl = `${mainUrl}/comments?post=`
const usersUrl = `${mainUrl}/users?_embed=1`
const pagesUrl = `${mainUrl}/pages?per_page=50`
const notificationsUrl = `${domainUrl}/apnwp/register`

const WordpressAPIService = {

    fetchPosts: (pageNumber, categories, categoriesExcluded) => {
        return axios.get(`${postsApiUrl}&page=${pageNumber}&categories=${categories}&categories_exclude=${categoriesExcluded}`)
    },

    fetchCategories: () => {
        return axios.get(categoriesUrl)
    },

    fetchComments: () => {
        return axios.get(commentsUrl)
    },

    fetchcommentsByPost: (postId: number) => {
        return axios.get(`${commentsByPostUrl}${postId}`)
    },

    addComment: (comment: Comment) => {
        return axios.post(commentsUrl, comment)
    },

    fetchUsers: () => {
        return axios.get(usersUrl)
    },

    fetchPages: () => {
        return axios.get(pagesUrl)
    },

    registerForNotifications: ({ os, token }) => {
        return axios.get(`${notificationsUrl}?os_type=${os}&device_token=${token}`)
    }
}

export default WordpressAPIService