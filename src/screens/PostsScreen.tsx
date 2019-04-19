import React, { Component } from 'react'
import { Text, Button } from 'react-native-elements'
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchPosts, fetchCategories } from '../redux/actions/PostsActions'
import { connect } from 'react-redux';
import {
    getCategoriesSelector,
    getUiSelector,
    getTotalPostsPages,
    getSelectedCategoriesSelector,
} from '../redux/selectors/direct_selectors';
import { selectPost, fetchPostsCancelled, addCategoryFilter, removeCategoryFilter } from '../redux/actions/PostsActions'
import CategoriesList from '../components/CategoriesList';
import { postsWithCategoriesFilterSelector } from '../redux/selectors/posts_selectors';
import HeaderContainer from '../containers/HeaderContainer';
import Colors from '../constants/Colors';
import PostsList from '../components/PostsList';
import { postsHasErrorSelector } from '../redux/selectors/error_selectors';
import { postsIsLoadingSelector, categoriesIsLoadingSelector, remainingPostsIsLoadingSelector, isLoadingSelector } from '../redux/selectors/loading_selectors';
import { filteredCategoriesSelector } from '../redux/selectors/categories_selectors';
import Layout from '../constants/Layout';
import OfflineNoticeContainer from '../containers/OfflineNoticeContainer';
import OfflineRetry from '../components/OfflineRetry';
import { fetchUsers } from '../redux/actions/UsersActions'

class PostsScreen extends Component<any, any>{
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            isDisplayed: false,
        }
    }
    static navigationOptions = {
        header: props => <HeaderContainer {...props} section='articles' />
    }
    handleDidFocus = () => {
        const { isDisplayed } = this.state
        if (isDisplayed !== true) {
            this.setState({ isDisplayed: true })
        }
    }
    handleWillBlur = () => {
        const { isDisplayed } = this.state
        if (isDisplayed !== false) {
            this.setState({ isDisplayed: false })
        }
    }
    componentDidMount() {
        const { addListener } = this.props.navigation
        this.listeners = [
            addListener('didFocus', this.handleDidFocus),
            addListener('willBlur', this.handleWillBlur)
        ]
    }

    componentWillUnmount() {
        this.listeners.forEach(sub => sub.remove())
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { isDisplayed } = this.state
        const { posts,
            selectedCategories,
            loading,
            appIsLoading
        } = this.props

        return (
            (!isDisplayed && nextState.isDisplayed) ||
            (isDisplayed && (
                (posts.length !== nextProps.posts.length) ||
                (selectedCategories !== nextProps.selectedCategories) ||
                (loading !== nextProps.loading) ||
                (appIsLoading !== nextProps.appIsLoading)
            ))
        )
    }
    fetchPosts = () => {
        const { selectedCategories } = this.props
        this.props.fetchPosts('articles', this.state.page, selectedCategories, [195], false)
    }

    fetchRemainingPosts = () => {
        this.props.fetchPosts('articles', this.state.page, [], [195], true)
    }

    handleOnEnd = () => {
        const { loading, totalPages } = this.props
        if (loading) return;
        if (this.state.page < totalPages) {
            this.setState(state => ({ page: state.page + 1 }), this.fetchRemainingPosts)
        }
    }
    handleOnSelect = (post) => {
        this.props.selectPost(post.id, 'articles')
        this.props.navigation.navigate('Post', { id: post.id, section: 'articles' })
    }

    handleOnAdd = (id) => {
        this.props.addCategoryFilter(id, 'articles')
    }
    handleOnRemove = (id) => {
        this.props.removeCategoryFilter(id, 'articles')
    }

    handleOnPressRetry = () => {
        this.fetchPosts()
        this.props.fetchCategories()
        this.props.fetchUsers()
    }

    renderLoading = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='white' />
        </View>
    )

    renderNoConnection = () => (
        <OfflineRetry iconColor='white' />
    )

    render() {
        const {
            posts,
            categories,
            ui: {
                articles: {
                    showCategories
                }
            },
            appIsLoading,
            loading,
            selectedCategories,
            error
        } = this.props

        return (
            <View style={styles.container}>
                <OfflineNoticeContainer />
                {error
                    ? this.renderNoConnection()
                    :
                    appIsLoading
                        ? this.renderLoading()
                        :
                        <View>
                            <CategoriesList
                                visible={showCategories}
                                color={Colors.actus}
                                categories={categories}
                                selectedCategories={selectedCategories}
                                onAdd={this.handleOnAdd}
                                onRemove={this.handleOnRemove}
                            />
                            <PostsList
                                section='articles'
                                onEnd={this.handleOnEnd}
                                posts={posts}
                                loading={loading}
                                onSelect={this.handleOnSelect}
                            />
                        </View>
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        appIsLoading: isLoadingSelector(state),
        error: postsHasErrorSelector(state, 'articles'),
        loading: remainingPostsIsLoadingSelector(state, 'articles'),
        posts: postsWithCategoriesFilterSelector(state, 'articles'),
        categories: filteredCategoriesSelector([5, 195, 330, 1, 6])(getCategoriesSelector(state)),
        selectedCategories: getSelectedCategoriesSelector(state, 'articles'),
        ui: getUiSelector(state),
        totalPages: getTotalPostsPages(state, 'articles'),
    }
}

const mapDispatchToProps = {
    fetchPosts,
    selectPost,
    addCategoryFilter,
    removeCategoryFilter,
    fetchPostsCancelled,
    fetchUsers,
    fetchCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.tabBar
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})