import 'rxjs';
import { from, of, concat, timer } from 'rxjs';
import { mergeMap, map, switchMap, catchError, takeUntil, filter, withLatestFrom, startWith, distinctUntilChanged } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import StreamService from '../services/StreamService';
import {
    FETCH_STREAM_INFO,
    FETCH_COMMENTS,
    ADD_COMMENT,
    FETCH_POSTS,
    FETCH_CATEGORIES,
    FETCH_PAGES,
    FETCH_USERS
} from './actions/types';
import * as PlayerActions from './actions/PlayerActions';
import { combineEpics } from 'redux-observable';
import WordpressAPIService from '../services/WordpressAPIService';
import * as CommentsActions from './actions/CommentsActions';
import * as PostsActions from './actions/PostsActions'
import * as PagesActions from './actions/PagesActions'
import * as UsersActions from './actions/UsersActions'


export const fetchStreamInfoEpic = (action$, state$) =>
    action$.pipe(
        ofType(FETCH_STREAM_INFO),
        switchMap(action =>
            timer(0, 1000)
                .pipe(
                    withLatestFrom(state$),
                    filter(([, state]) => state.connection.isConnected),
                    switchMap(([action, state]) =>
                        from(StreamService.fetchInfo())
                            .pipe(
                                distinctUntilChanged(),
                                map(response => PlayerActions.fetchStreamInfoFulfilled(response.data.songtitle)),
                                catchError(error => of(PlayerActions.fetchStreamInfoRejected({ title: 'Erreur stream radio', message: 'Impossible de récupérer les informations' }))))
                    )
                )
        )
    )

export const fetchPostsEpic = (action$, state$) =>
    action$.pipe(
        ofType(FETCH_POSTS),
        withLatestFrom(state$),
        filter(([, state]) => state.connection.isConnected),
        mergeMap(([action, state]) => {
            const { payload: { pageNumber, categories, categoriesExcluded, section, remaining } } = action
            return from(WordpressAPIService.fetchPosts(pageNumber, categories, categoriesExcluded))
                .pipe(
                    map(response => PostsActions.fetchPostsFulfilled(response, section, remaining)),
                    catchError(error => of(PostsActions.fetchPostsRejected({ title: 'Erreur Articles', message: error }, section))),
                    startWith(PostsActions.fetchPostsPending(section, remaining)),
                )
        })
    )

export const fetchCommentsEpic = (action$, state$) =>
    action$.pipe(
        ofType(FETCH_COMMENTS),
        withLatestFrom(state$),
        filter(([, state]) => state.connection.isConnected),
        switchMap(([action, state]) =>
            from(WordpressAPIService.fetchComments())
                .pipe(
                    map(response => CommentsActions.fetchCommentsFulfilled(response.data)),
                    catchError(error => of(CommentsActions.fetchCommentsRejected({ title: 'Erreur commentaires', message: error }))),
                    startWith(CommentsActions.fecthCommentsPending()),
                )
        ),
    )

export const addCommentEpic = (action$, state$) =>
    action$.pipe(
        ofType(ADD_COMMENT),
        withLatestFrom(state$),
        filter(([, state]) => state.connection.isConnected),
        switchMap(([action, state]) =>
            concat(
                from(WordpressAPIService.addComment(action.payload))
                    .pipe(
                        map(response => CommentsActions.addCommentFulfilled(response)),
                        catchError(error => of(CommentsActions.addCommentRejected({ title: 'Erreur commentaires', message: `${error.response.data.message} Onglet Plus > Modifier le profil` }))),
                    ),
                of(CommentsActions.fetchComments())
            )
        ),
    )

export const fetchCategoriesEpic = (action$, state$) =>
    action$.pipe(
        ofType(FETCH_CATEGORIES),
        withLatestFrom(state$),
        filter(([, state]) => state.connection.isConnected),
        switchMap(([action, state]) =>
            from(WordpressAPIService.fetchCategories())
                .pipe(
                    map((response) => PostsActions.fetchCategoriesFulfilled(response.data)),
                    catchError(error => of(PostsActions.fetchCategoriesRejected({ title: 'Erreur catégories', message: error }))),
                    startWith(PostsActions.fetchCategoriesPending())
                )
        )
    )
export const fetchPagesEpic = (action$, state$) =>
    action$.pipe(
        ofType(FETCH_PAGES),
        withLatestFrom(state$),
        filter(([, state]) => state.connection.isConnected),
        switchMap(([action, state]) =>
            from(WordpressAPIService.fetchPages())
                .pipe(
                    map(response => PagesActions.fetchPagesFulfilled(response.data)),
                    catchError(error => of(PagesActions.fetchPagesRejected({ title: 'Erreur pages', message: error }))),
                    startWith(PagesActions.fetchPagesPending()),
                )
        )
    )
export const fetchUsersEpic = (action$, state$) =>
    action$.pipe(
        ofType(FETCH_USERS),
        withLatestFrom(state$),
        filter(([, state]) => state.connection.isConnected),
        switchMap(([action, state]) =>
            from(WordpressAPIService.fetchUsers())
                .pipe(
                    map(response => UsersActions.fetchUsersFulfilled(response)),
                    catchError(error => of(UsersActions.fetchUsersRejected({ title: 'Erreur utilisateurs', message: error }))),
                    startWith(UsersActions.fetchUsersPending())
                )
        )
    )

export const rootEpic = combineEpics(
    fetchStreamInfoEpic,
    fetchCommentsEpic,
    fetchPostsEpic,
    addCommentEpic,
    fetchCategoriesEpic,
    fetchPagesEpic,
    fetchUsersEpic
)
