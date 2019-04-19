import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux';
import { selectedPostSelector, getPodcastLinkFromPostContentSelector } from '../redux/selectors/posts_selectors';
import { commentsByPostSelector } from '../redux/selectors/comments_selectors';
import { setPodcast } from '../redux/actions/PlayerActions'
import Post from '../components/Post';
import { Linking, View } from 'react-native';
import OfflineNoticeContainer from '../containers/OfflineNoticeContainer';



class PostScreen extends Component<any, any>{
    constructor(props) {
        super(props)
        this.state = {
            isDisplayed: false
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
        return (!isDisplayed && nextState.isDisplayed)

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

    handleOnLinkPress = (event, href) => {
        Linking.openURL(href)
    }


    handleOnPlayPodcast = () => {
        const { podcastLink, post } = this.props
        this.props.setPodcast(podcastLink, post.title.rendered)
    }
    handleOnSeeComments = () => {
        const section = this.props.navigation.getParam('section')
        this.props.navigation.navigate('Comments', { section: section })
    }
    render() {
        const { post, totalComments, isPodcast } = this.props
        return (
            <View>
                <OfflineNoticeContainer />
                <Post
                    {...post}
                    totalComments={totalComments}
                    isPodcast={isPodcast}
                    onLinkPress={this.handleOnLinkPress}
                    onPlayPodcastPress={this.handleOnPlayPodcast}
                    onSeeCommentsPress={this.handleOnSeeComments}
                />
            </View>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    const section = ownProps.navigation.getParam('section')
    return {
        post: selectedPostSelector(state, section),
        podcastLink: getPodcastLinkFromPostContentSelector(state, section),
        isPodcast: section == 'podcasts',
        totalComments: commentsByPostSelector(state, section).length
    }
}
const mapDispatchToProps = {
    setPodcast,
}
export default connect(mapStateToProps, mapDispatchToProps)(PostScreen)

