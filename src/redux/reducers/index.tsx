import { combineReducers } from 'redux'
import PostsReducer from './PostsReducer';
import CategoriesReducer from './CategoriesReducer';
import UiReducer from './UiReducer';
import CommentsReducer from './CommentsReducer';
import UsersReducer from './UsersReducer';
import PlayerReducer from './PlayerReducer';
import PagesReducer from './PagesReducer';
import LoadingReducer from './LoadingReducer'
import ProfileReducer from './ProfileReducer';
import ErrorReducer from './ErrorReducer';
import ConnectionReducer from './ConnectionReducer';

export default combineReducers({
    pages: PagesReducer,
    posts: PostsReducer,
    categories: CategoriesReducer,
    comments: CommentsReducer,
    users: UsersReducer,
    profile: ProfileReducer,
    player: PlayerReducer,
    loading: LoadingReducer,
    error: ErrorReducer,
    ui: UiReducer,
    connection: ConnectionReducer
})