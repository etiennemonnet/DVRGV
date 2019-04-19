import React, { Component } from 'react'
import { View, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { addComment, fetchComments } from '../redux/actions/CommentsActions'
import { commentsByPostSelector } from '../redux/selectors/comments_selectors';
import AddComment from '../components/AddComment';
import { getSelectedPostIdSelector, getAddCommentSelector, getProfileSelector } from '../redux/selectors/direct_selectors';
import { commentsIsLoadingSelector } from '../redux/selectors/loading_selectors';
import CommentsList from '../components/CommentsList';
import OfflineNoticeContainer from '../containers/OfflineNoticeContainer';
import { commentsHasErrorSelector } from '../redux/selectors/error_selectors';
import { resetError } from '../redux/actions/ErrorActions'

class CommentsScreen extends Component<any, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            isDisplayed: false
        }
    }
    static navigationOptions = {
        title: 'Commentaires',
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
        const { comments, error } = this.props

        return (
            (!isDisplayed && nextState.isDisplayed) ||
            (isDisplayed && comments.length !== nextProps.comments.length) ||
            (!error && nextProps.error)
        )
    }

    handleOnRefresh = () => {
        this.props.fetchComments()
    }

    handleOnSubmit = ({ ...comment }) => {
        const { selectedPostId } = this.props
        this.props.addComment({
            author_email: comment.email,
            author_name: comment.name,
            content: comment.content,
            post: selectedPostId
        })
    }


    renderError = () => {
        const { error } = this.props
        const { title, message, actionName } = error
        if (error) {
            Alert.alert(
                title,
                message,
                [{
                    text: 'OK',
                    onPress: () => this.props.resetError(actionName)
                }]
            )
        }
    }

    render() {
        const {
            comments,
            profile,
            error
        } = this.props

        return (
            <View style={styles.container}>
                <OfflineNoticeContainer />
                <CommentsList
                    comments={comments}
                    onRefresh={this.handleOnRefresh} />
                <AddComment
                    {...profile}
                    onSubmit={this.handleOnSubmit}
                />
                {this.renderError()}
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const section = ownProps.navigation.getParam('section')
    return {
        state,
        comments: commentsByPostSelector(state, section),
        isLoading: commentsIsLoadingSelector(state),
        selectedPostId: getSelectedPostIdSelector(state, section),
        profile: getProfileSelector(state),
        error: commentsHasErrorSelector(state)
    }
}

const mapDispatchToProps = {
    addComment,
    fetchComments,
    resetError
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsScreen)

const styles = StyleSheet.create({

    container: {
        flex: 1
    },
})