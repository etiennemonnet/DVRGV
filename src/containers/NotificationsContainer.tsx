import React, { Component } from 'react'
import NotificationPopup from 'react-native-push-notification-popup'
import NotificationsService from '../services/NotificationsService'
import { PushNotificationIOS, Platform } from 'react-native';
import NavigationService from '../services/NavigationService';
import { connect } from 'react-redux';
import { selectPost } from '../redux/actions/PostsActions'
import { isLoadingSelector } from '../redux/selectors/loading_selectors';
import { Section } from '../types';


class NotificationsContainer extends Component<any, any>{
    constructor(props) {
        super(props)
        this.state = {
            notification: null
        }
        NotificationsService.configure(this.onNotification)
    }

    handleBadgeNumber = () => {
        if (Platform.OS == 'ios') {
            PushNotificationIOS.setApplicationIconBadgeNumber(0)
        }
    }

    componentDidMount() {
        this.handleBadgeNumber()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.notification && !this.props.appIsLoading) {
            this.handleOnPressNotification()
        }
    }

    handleOnPressNotification = () => {
        const {
            notification: {
                userInteraction,
                message: {
                    post_id,
                    section,
                    title
                }
            }
        } = this.state
        if (userInteraction) {
            this.goToPost(post_id, section)
        }
    }

    goToPost = (postId: number, section: Section) => {
        this.handleBadgeNumber()
        const page = section == 'podcasts' ? 'Podcast' : 'Post'
        this.props.selectPost(postId, section)
        NavigationService.navigate(page, { section: section })
        this.setState({ notification: null })
    }

    handleForeground = () => {
        const { notification: {
            message: {
                post_id,
                section,
                title,
                body
            }
        } } = this.state
        this.popup.show({
            onPress: () => this.goToPost(post_id, section),
            appIconSource: require('../assets/logo-fond-black-20.png'),
            appTitle: 'DVRGV',
            timeText: 'Maintenant',
            title: title,
            body: body
        });
    }
    onNotification = (notification) => {
        this.setState({
            notification: Platform.OS == 'ios'
                ? notification
                : {
                    userInteraction: notification.userInteraction,
                    message: {
                        post_id: notification.post_id,
                        section: notification.section,
                        title: notification.title,
                        body: notification.message
                    }
                }
        })

        const { foreground, userInteraction } = notification

        if (foreground) {
            this.handleForeground()
        }
        if (Platform.OS == 'ios') {
            notification.finish(PushNotificationIOS.FetchResult.NoData)
        }
    }



    render() {
        return <NotificationPopup ref={ref => this.popup = ref} />
    }
}
const mapStateToProps = state => {
    return {
        appIsLoading: isLoadingSelector(state)
    }
}
const mapDispatchToProps = {
    selectPost
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer)