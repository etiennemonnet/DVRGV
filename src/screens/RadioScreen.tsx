import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, ActivityIndicator, Animated, Easing } from 'react-native';
import { fetchCategories, fetchPosts } from '../redux/actions/PostsActions'
import { fetchUsers } from '../redux/actions/UsersActions'
import { fetchComments } from '../redux/actions/CommentsActions'
import { fetchPages } from '../redux/actions/PagesActions'
import { getPlayerSelector, getIsConnectedSelector } from '../redux/selectors/direct_selectors';
import Layout from '../constants/Layout';
import { setRadio, fetchStreamInfo, setPlayerStatut } from '../redux/actions/PlayerActions'
import Stream from '../components/Stream'
import { isLoadingSelector } from '../redux/selectors/loading_selectors';
import OfflineNoticeContainer from '../containers/OfflineNoticeContainer';
import OfflineRetry from '../components/OfflineRetry';
import { Text } from 'react-native-elements';
import Colors from '../constants/Colors';
import { appHasErrorSelector, networkErrorSelector } from '../redux/selectors/error_selectors';



class RadioScreen extends Component<any, any>{
    constructor(props) {
        super(props)
        this.state = {
            isDisplayed: false
        }
        this.animatedValue = new Animated.Value(0)
    }

    static navigationOptions = {
        title: 'DVRGV Radio'
    };

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

    handleOnPressRetry = () => {
        this.fetchAll()
    }

    fetchAll = () => {
        this.props.fetchStreamInfo()
        this.props.fetchUsers()
        this.props.fetchCategories()
        this.props.fetchPosts('articles', 1, [], [195], false)
        this.props.fetchPosts('podcasts', 1, [195], [], false)
        this.props.fetchComments()
        this.props.fetchPages()
    }
    componentDidMount() {
        const { addListener } = this.props.navigation
        this.imageOpacityAnimation()
        this.fetchAll()
        this.listeners = [
            addListener('didFocus', this.handleDidFocus),
            addListener('willBlur', this.handleWillBlur)
        ]
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.isDisplayed)
    }

    componentWillUnmount() {
        this.listeners.forEach(sub => sub.remove())
    }

    imageOpacityAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.animatedValue, {
                    toValue: 1,
                    duration: 3000,
                    ease: Easing.linear,
                    useNativeDriver: true
                }),
                Animated.timing(this.animatedValue, {
                    toValue: 0.8,
                    duration: 7000,
                    ease: Easing.linear,
                    useNativeDriver: true
                })
            ])
        ).start();
    }

    play = () => {
        this.props.setRadio()
    }

    stop = () => {
        this.props.setPlayerStatut('stopped')
    }
    renderisLoading = () => (
        <View>
            <ActivityIndicator size='large' />
        </View>
    )
    renderIsLoaded = () => {
        const { player } = this.props
        return (
            <Stream
                player={player}
                onPlayPress={this.play}
                onStopPress={this.stop}
            />
        )
    }
    renderNoConnection = () => (
        <OfflineRetry
            title='Aucune connexion internet'
            onPressRetry={this.handleOnPressRetry}
            innerContainerStyle={{
                alignItems: 'center',
                width: Layout.window.width,
                backgroundColor: 'rgba(037,076,131,0.5)'
            }}
            withButton
            message="L'application nécessite une connexion internet pour pouvoir fonctionner correctement"
            textColor='white'
        />
    )
    render() {
        const {
            appIsLoading,
            isConnected,
            networkError
        } = this.props

        
        const opacity = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });
        return (
            <View style={styles.container}>
                <OfflineNoticeContainer additionalStyle={{ position: 'absolute', top: 30, zIndex: 5 }} />
                <Animated.Image source={require('../assets/background.jpg')}
                    style={[styles.background, { opacity: opacity }]}
                />
                {(!isConnected || networkError) ? this.renderNoConnection()
                    : appIsLoading
                        ? this.renderisLoading()
                        : this.renderIsLoaded()
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state,
        appIsLoading: isLoadingSelector(state),
        player: getPlayerSelector(state),
        isConnected: getIsConnectedSelector(state),
        networkError: networkErrorSelector(state)
    }
}

const mapDispatchToProps = {
    fetchPages,
    fetchCategories,
    fetchPosts,
    fetchComments,
    fetchUsers,
    setRadio,
    fetchStreamInfo,
    setPlayerStatut,
}

export default connect(mapStateToProps, mapDispatchToProps)(RadioScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'black'
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    telContainer: {
        marginTop: 20
    },
    title: {
        color: 'white',
        alignSelf: 'center'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: Layout.window.width,
        height: Layout.window.height,
    }
})