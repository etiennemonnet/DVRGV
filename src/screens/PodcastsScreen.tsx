import React, { Component } from 'react'
import { View, StyleSheet, Linking, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { postsWithCategoriesFilterSelector } from '../redux/selectors/posts_selectors';
import PostsList from '../components/PostsList';
import { selectPost, fetchPosts, fetchCategories } from '../redux/actions/PostsActions'
import {
    getTotalPostsPages,
    getTotalPosts,
    getUiSelector,
    getCategoriesSelector,
    getSelectedCategoriesSelector,
    getIsConnectedSelector
} from '../redux/selectors/direct_selectors';
import Colors from '../constants/Colors';
import { addCategoryFilter, removeCategoryFilter } from '../redux/actions/PostsActions'
import HeaderContainer from '../containers/HeaderContainer';
import { postsIsLoadingSelector, categoriesIsLoadingSelector, remainingPostsIsLoadingSelector, isLoadingSelector } from '../redux/selectors/loading_selectors';
import CategoriesList from '../components/CategoriesList';
import { Text } from 'react-native-elements';
import { postsHasErrorSelector } from '../redux/selectors/error_selectors';
import { filteredCategoriesSelector } from '../redux/selectors/categories_selectors';
import { fetchUsers } from '../redux/actions/UsersActions'
import OfflineNoticeContainer from '../containers/OfflineNoticeContainer';
import OfflineRetry from '../components/OfflineRetry';

class PodcastsScreen extends Component<any, any>{
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            isDisplayed: false,
        }

    }
    static navigationOptions = {
        header: props => <HeaderContainer {...props} section='podcasts' />
    }

    fetchRemainingPodcasts = () => {
        this.props.fetchPosts('podcasts', this.state.page, [195], [], true)
    }


    fetchPodcasts = () => {
        const { selectedCategories } = this.props
        this.props.fetchPosts('podcasts', this.state.page, selectedCategories.concat(195), [], false)
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
        const { podcasts,
            selectedCategories,
            loading,
            appIsLoading,
            isConnected
        } = this.props
        return (
            (!isDisplayed && nextState.isDisplayed) ||
            (isDisplayed && (
                (podcasts.length !== nextProps.podcasts.length) ||
                (selectedCategories !== nextProps.selectedCategories) ||
                (loading !== nextProps.loading) ||
                (appIsLoading !== nextProps.appIsLoading) ||
                (isConnected !== nextProps.isConnected)
            )
            )
        )
    }

    handleOnAdd = (id) => {
        this.props.addCategoryFilter(id, 'podcasts')
    }
    handleOnRemove = (id) => {
        this.props.removeCategoryFilter(id, 'podcasts')
    }
    handleOnEnd = () => {
        const { loading, totalPages } = this.props
        if (loading) return;

        if (this.state.page < totalPages) {
            this.setState(state => ({ page: state.page + 1 }), this.fetchRemainingPodcasts)
        }
    }
    handleOnSelect = (post) => {
        this.props.selectPost(post.id, 'podcasts')
        this.props.navigation.navigate('Podcast', { section: 'podcasts' })
    }

    handleOnPressRetry = () => {
        this.fetchPodcasts()
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
            podcasts,
            loading,
            appIsLoading,
            error,
            ui: {
                podcasts: {
                    showCategories
                }
            },
            categories,
            selectedCategories,
            categoriesIsLoading

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
                                color={Colors.podcasts}
                                categories={categories}
                                selectedCategories={selectedCategories}
                                onAdd={this.handleOnAdd}
                                onRemove={this.handleOnRemove}
                            />
                            <PostsList
                                section='podcasts'
                                posts={podcasts}
                                loading={loading}
                                onEnd={this.handleOnEnd}
                                onSelect={this.handleOnSelect}
                            />
                        </View>
                }
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        appIsLoading: isLoadingSelector(state),
        podcasts: postsWithCategoriesFilterSelector(state, 'podcasts'),
        loading: remainingPostsIsLoadingSelector(state, 'podcasts'),
        error: postsHasErrorSelector(state, 'podcasts'),
        ui: getUiSelector(state),
        categories: filteredCategoriesSelector([330, 219, 181, 1, 195])(getCategoriesSelector(state)),
        selectedCategories: getSelectedCategoriesSelector(state, 'podcasts'),
        totalPages: getTotalPostsPages(state, 'podcasts'),
        totalPosts: getTotalPosts(state, 'podcasts')
    }
}

const mapDispatchToProps = {
    fetchPosts,
    selectPost,
    addCategoryFilter,
    removeCategoryFilter,
    fetchCategories,
    fetchUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(PodcastsScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.tabBar,
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