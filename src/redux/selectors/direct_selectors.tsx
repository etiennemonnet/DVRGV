import { Section, GlobalState } from "../../types";

////////////POSTS
export const getPostsSelector = (state: GlobalState, section: Section) => state.posts[section]
export const getSearchTermSelector = (state: GlobalState, section: Section) => state.posts[section].searchTerm
export const getSelectedPostIdSelector = (state: GlobalState, section: Section) => state.posts.selectedPost[section]
export const getTotalPosts = (state: GlobalState, section: Section) => state.posts[section].total
export const getTotalPostsPages = (state: GlobalState, section: Section) => state.posts[section].totalPages

///////////CATEGORIES
export const getCategoriesSelector = (state: GlobalState) => state.categories
export const getSelectedCategoriesSelector = (state: GlobalState, section: Section) => state.categories.selectedCategories[section]

/////////////UI

export const getUiSelector = (state: GlobalState) => state.ui

////////////////COMMENTS

export const getCommentsSelector = (state: GlobalState) => state.comments


////////////////USERS

export const getUsersSelector = (state: GlobalState) => state.users

/////////////////PROFILE

export const getProfileSelector = (state: GlobalState) => state.profile
export const getProfileNameSelector = (state: GlobalState) => state.profile.name
export const getProfileEmailSelector = (state: GlobalState) => state.profile.email
export const getAvatarSelector = (state: GlobalState) => state.profile.avatarUrl

////////////////PAGES

export const getPagesSelector = (state: GlobalState) => state.pages
export const getPagesStackSelector = (state: GlobalState) => state.pages.stack
export const getSelectedLinkSelector = (state: GlobalState) => state.pages.selectedLink

/////////////////PLAYER

export const getPlayerSelector = (state: GlobalState) => state.player


/////////////////ERROR

export const getErrorSelector = (state: GlobalState) => state.error

/////////////////CONNECTION

export const getConnectionSelector = (state: GlobalState) => state.connection
export const getIsConnectedSelector = (state: GlobalState) => state.connection.isConnected
