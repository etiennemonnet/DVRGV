import React, { PureComponent, Component } from 'react'
import { Animated, ScrollView, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Text, Avatar, Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import HTML from 'react-native-render-html';
import moment from 'moment'
import Share from './Share';
import avatars from '../constants/avatars';
import Icons from '../constants/Icons';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import SeeCommentsButton from './SeeCommentsButton';
import ProgressiveImage from './ProgressiveImage';

const ignoreNodes = (node, parentTagName, parentisText) => {
    const { type, name, attribs, prev, children, next } = node
    switch (true) {
        case name == 'p' && !children.length:
        case name == 'p' && attribs.class == 'powerpress_links powerpress_links_mp3':
            return true
        default: return false
    }
}

const renderers = {
    img: (htmlAttribs, children, css, props) => {
        const { width, src, alt } = htmlAttribs
        return (
            <ProgressiveImage
                key={props.nodeIndex}
                source={{ uri: src }}
                style={{ flex: 1, resizeMode: 'cover' }}
                accessibilityLabel={alt}
                containerStyle={{ width: Layout.window.width - 10, height: 300 }}
            />
        )
    },
}

const MENU_BAR_HEIGHT = 70
const BACKGROUND_HEIGHT = 250
const HEADER_HEIGHT = BACKGROUND_HEIGHT + MENU_BAR_HEIGHT
const HEADER_MIN_HEIGHT = 100

const HEADER_SCROLL_DISTANCE = BACKGROUND_HEIGHT

type Props = {
    title: any,
    link: string
    author: any,
    content: any,
    date: any,
    _embedded: any,
    onSeeCommentsPress: any,
    onLinkPress: any,
    isPodcast: boolean,
    totalComments: number,
    onPlayPodcastPress?: any,
}
export default class Post extends PureComponent<Props, any>{
    constructor(props) {
        super(props)
        this.state = {
            scrollY: new Animated.Value(0)
        }

    }
    renderPodcastTitle = (htmlAttribs, children, css, passProps) => {
        return (
            <Text key={passProps.nodeIndex} style={styles.title}>{children}</Text>
        )
    }
    render() {
        const size = this.state.scrollY.interpolate({
            inputRange: [-100, 0, HEADER_SCROLL_DISTANCE],
            outputRange: [1.3, 1, 1],
            extrapolate: 'clamp',
        });
        const height = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [HEADER_HEIGHT, MENU_BAR_HEIGHT],
            extrapolate: 'clamp',
        })
        const innerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [BACKGROUND_HEIGHT, 0],
            extrapolate: 'clamp'
        })
        const translateY = this.state.scrollY.interpolate({
            inputRange: [-100, 0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, -180],
            extrapolate: 'clamp',

        })

        const translateYBackground = this.state.scrollY.interpolate({
            inputRange: [-100, 0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, -50],
            extrapolate: 'clamp',

        })

        const playPodcastScale = this.state.scrollY.interpolate({
            inputRange: [-100, 0, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0.6],
            extrapolate: 'clamp',

        })
        const {
            title,
            date,
            link,
            author,
            content,
            _embedded,
            totalComments,
            isPodcast,
            onLinkPress,
            onSeeCommentsPress,
            onPlayPodcastPress
        } = this.props

        const featuredImage = _embedded['wp:featuredmedia']
            ? { uri: _embedded['wp:featuredmedia'][0]['media_details']['sizes']['medium']['source_url'] }
            : require('../assets/no-photo.png')

        const formattedTitle = `<h2>${title.rendered}</h2>`
        return (
                <Animated.ScrollView
                    stickyHeaderIndices={[0]}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [
                            { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
                        ],
                    )}
                    scrollEventThrottle={16}
                >
                    <Animated.View style={[styles.postHeader]}>
                        <Animated.View style={[styles.innerContainer,
                        {
                            height: innerHeight,

                        }]}>
                            <Animated.Image
                                source={featuredImage}
                                style={[styles.background,
                                {
                                    transform: [
                                        { scale: size },
                                        { translateY: translateYBackground }
                                    ],
                                }]}
                            />
                            <Animated.View style={[styles.overlay, { transform: [{ scale: size }] }]} />
                            <Animated.View style={[styles.innerText, { transform: [{ translateY: translateY }] }]}>
                                <HTML
                                    html={formattedTitle}
                                    tagsStyles={{ h2: { fontSize: 16, fontWeight: 'bold', color: 'white', textAlign: 'center' } }} />
                                <Text style={styles.date}>{moment(date).format('DD MMMM YYYY')}</Text>
                                <Animated.Image
                                    source={avatars[author.id]}
                                    accessibilityLabel={`Avatar de ${author.name}`}
                                    accessibilityRole='image'
                                    accessible={true}
                                    style={[styles.avatar, { transform: [{ scale: size }] }]}
                                    defaultSource={require('../assets/default-avatar.jpg')}
                                />
                                <Text style={styles.author}>Par {author.name}</Text>
                            </Animated.View>
                        </Animated.View>

                        <View style={styles.menuBar}>
                            <SeeCommentsButton
                                totalCommentsColor={isPodcast ? Colors.podcasts : Colors.actus}
                                totalComments={totalComments}
                                onPress={onSeeCommentsPress}
                            />
                            <Share
                                title={`${title.rendered} par ${author.name}`}
                                message={`${title.rendered} par ${author.name}`}
                                url={link}
                                iconSize={40}
                                iconColor={Colors.darkGrey}
                                accessibilityLabel="Partager cet article"
                            />
                            {isPodcast &&
                                <Animated.View style={[styles.setPodcastContainer, { transform: [{ scale: playPodcastScale }] }]}>
                                    <TouchableOpacity
                                        accessibilityLabel='Lire le podcast'
                                        accessibilityRole='button'
                                        accessibilityHint='Toucher deux fois pour charger et lire le podcast dans le lecteur audio'
                                        onPress={onPlayPodcastPress}
                                    >
                                        {Icons.playPodcast}
                                    </TouchableOpacity>
                                </Animated.View>
                            }
                        </View>
                    </Animated.View>

                    <View style={styles.content}>
                        <HTML
                            html={content.rendered}
                            renderers={renderers}
                            staticContentMaxWidth={Layout.window.width - 10}
                            imagesMaxWidth={Layout.window.width - 10}
                            imagesInitialDimensions={{ width: Layout.window.width - 10 }}
                            tagsStyles={{ h2: { backgroundColor: '#ededed', textAlign: 'center', color: '#707070' } }}
                            classesStyles={{ 'post-meta': { color: '#707070', fontStyle: 'italic', fontSize: 12, padding: 5 } }}
                            ignoreNodesFunction={ignoreNodes}
                            onLinkPress={onLinkPress}
                            alterChildren={(node) => {
                                if (node.name === 'iframe') {
                                    delete node.attribs.width;
                                }
                                return node.children;
                            }}
                        />
                    </View>
                </Animated.ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    postHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    innerText: {
        alignItems: 'center',
        justifyContent: 'space-around',
        height: BACKGROUND_HEIGHT,

    },
    innerContainer: {
        overflow: 'hidden',
    },

    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        paddingHorizontal: 5,
        color: 'white'
    },
    date: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white'
    },
    author: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white'
    },
    menuBar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: MENU_BAR_HEIGHT,
        paddingHorizontal: 5,
        backgroundColor: '#ededed',
        justifyContent: 'space-between'
    },
    setPodcastContainer: {
        height: 100,
        width: 100,
        padding: 5,
        borderRadius: 100,
        backgroundColor: '#ededed',
        alignItems: 'center',
    },
    content: {
        marginTop: HEADER_HEIGHT + 20,
        padding: 5,
        backgroundColor: 'white'
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: Layout.window.width,
        height: BACKGROUND_HEIGHT,
        zIndex: -2
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: BACKGROUND_HEIGHT,
        width: Layout.window.width,
        zIndex: -1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
})
