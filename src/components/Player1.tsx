import React, { Component, PureComponent } from 'react'
import { View, StyleSheet, Modal, ActivityIndicator, TouchableOpacity, Slider } from 'react-native';
import { Text } from 'react-native-elements';
import Layout from '../constants/Layout';
import { connect } from 'react-redux';
import { getUiSelector, getPlayerSelector, getIsConnectedSelector } from '../redux/selectors/direct_selectors';
import Colors from '../constants/Colors';
import { setPlayerStatut } from '../redux/actions/PlayerActions'
import { togglePlayer } from '../redux/actions/UiActions'
import FontAweSomeIcon from 'react-native-vector-icons/FontAwesome'
import HTML from 'react-native-render-html'
import Icons from '../constants/Icons';
import {
    Player,
    Recorder,
    MediaStates
} from 'react-native-audio-toolkit';






const moment = require('moment')
const momentDurationFormatSetup = require("moment-duration-format");

class Player1 extends PureComponent<any, any>{
    constructor(props) {
        super(props)
        this.state = {
            duration: 0,
            currentTime: 0,
            formattedDuration: '00:00',
            formattedCurrentTime: '00:00',
            progress: 0,
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isConnected !== this.props.isConnected && !this.props.isConnected) {
            this.props.setPlayerStatut('stopped')
        }
        if (prevProps.player.statut !== this.props.player.statut) {
            switch (this.props.player.statut) {
                case 'set':
                    this.reloadPlayer()
                    break;
                case 'stopped':
                    this.stop()
                    break;
                case 'paused':
                    this.pause()
                    break;
                case 'playing':
                    this.play()
                    break;
                default: return;
            }
        }
    }

    getCurrentTimeAndDuration = () => {
        this.progressInterval = setInterval(() => {
            if (this.player) {// && !this._dragging) {
                this.setState({
                    currentTime: this.player.currentTime,
                    duration: this.player.duration,
                    formattedCurrentTime: moment.duration(Math.round(this.player.currentTime), 'milliseconds').format('mm:ss', { trim: false }),
                    formattedDuration: moment.duration(Math.round(this.player.duration), 'milliseconds').format('mm:ss', { trim: false })
                })
            }
        }, 200)
    }


    stopGetCurrentTimeAndDuration = () => {
        clearInterval(this.progressInterval)
    }

    stop = () => {
        this.player.stop(() => {
            this.stopGetCurrentTimeAndDuration()
            this.player.destroy()
            this.clearState()
        })
    }
    clearState = () => {
        this.setState({
            currentTime: 0,
            duration: 0,
            formattedCurrentTime: '00:00',
            formattedDuration: '00:00'
        })
    }
    reloadPlayer() {
        const { type } = this.props.player
        let url;
        if (this.player) {
            this.player.destroy()
        }
        if (type == 'podcast') {
            url = this.props.player.podcast.source
        }
        else if (type == 'radio') {
            url = this.props.player.stream.source
        }
        this.player = new Player(url, { autoDestroy: true, continuesToPlayInBackground: true })
            .prepare((err) => {
                if (err) {
                    this.props.setPlayerStatut('error')
                }
                else {
                    this.props.setPlayerStatut('playing')
                }
            })


        this.player.on('ended', () => {
            this.props.setPlayerStatut('stopped');
        });
    }

    pause = () => {
        this.player.pause(() => {
            this.stopGetCurrentTimeAndDuration()
        })
    }

    seek = (time) => {
        this.player.seek(time, (err) => {
            if (err) {
                this.props.setPlayerStatut('error')
            }
        })
    }

    play = () => {
        const { type } = this.props.player
        this.player.play(() => {
            if (type == 'podcast') this.getCurrentTimeAndDuration()
            this.setState({ volume: this.player.volume })
        })
    }

    renderError = () => {
        <View>
            <Text style={styles.text}>Erreur de lecture</Text>
        </View>
    }
    renderIsLoading = () => (
        <View>
            <Text style={styles.text}>Chargement en cours</Text>
        </View>
    )

    renderTitle = (htmlAttribs, children, css, passProps) => (
        <Text key={passProps.nodeIndex} style={{ color: 'white' }}>{children}</Text>
    )

    render() {
        const {
            ui: {
                showPlayer
            },
            player: {
                podcast: {
                    title: podcastTitle,
                    image: imagePodcast
                },
                stream: {
                    title: streamTitle,
                    image: imageRadio
                },
                statut,
                type
            },
        } = this.props
        const {
            currentTime,
            formattedCurrentTime,
            formattedDuration,
            duration
        } = this.state

        const title = type == 'podcast' ? `<p>${podcastTitle}</p>` : `<p>${streamTitle}</p>`
        return (
            <Modal
                style={{ height: 300, width: 300 }}
                transparent
                visible={showPlayer}
                animationType='slide'
            >
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <View style={styles.statutContainer}>
                            {statut == 'stopped' && <Text style={styles.text}>Aucune lecture en cours</Text>}
                            {statut == 'set' && <ActivityIndicator color='white' />}
                            {statut == 'playing' && <Text style={styles.text}>Lecture en cours</Text>}
                            {statut == 'paused' && <Text style={styles.text}>En Pause</Text>}
                            {statut == 'error' && <Text style={styles.textError}>Erreur de lecture</Text>}
                        </View>
                        <TouchableOpacity
                            style={styles.closeButton}
                            accessibilityLabel='Masquer le lecteur audio'
                            accessibilityHint='Toucher deux fois pour masquer le lecteur audio'
                            accessibilityRole='button'
                            onPress={() => this.props.togglePlayer()}>
                            {Icons.close(40, 'white')}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleContainer}>
                        {(statut == 'playing' || statut == 'paused') &&

                            <HTML
                                html={title}
                                renderers={{ p: this.renderTitle }} />
                        }
                    </View>


                    <View style={styles.timeContainer}>
                        <Text
                            style={styles.timeText}
                            accessibilityHint='Informations temporelles du lecteur audio'
                        >{formattedCurrentTime} / {formattedDuration}</Text>

                    </View>
                    <View style={styles.progressBarContainer}>
                        <Slider
                            value={currentTime}
                            accessibilityLabel='Barre horizontale temporelle'
                            accessibilityRole='adjustable'
                            accessibilityStates={(statut == 'stopped' || type == 'radio') ? ['disabled'] : undefined}
                            minimumValue={0}
                            maximumValue={duration}
                            onValueChange={this.seek}
                            onResponderStart={this.pause}
                            onSlidingComplete={this.play}
                            minimumTrackTintColor={Colors.options}
                            maximumTrackTintColor='white'
                            thumbTintColor='white'
                            disabled={(statut == 'stopped' || type == 'radio')}
                        />
                    </View>
                    <View style={styles.controls}>
                        {statut !== 'playing' ?
                            <TouchableOpacity
                                accessibilityLabel='Lecture'
                                accessibilityRole='button'
                                accessibilityHint='Toucher deux fois pour relancer la lecture, le bouton changera en bouton pause'
                                onPress={() => this.props.setPlayerStatut('playing')}
                                disabled={statut == 'stopped'}>
                                <FontAweSomeIcon name='play-circle-o' size={60} color='white' />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                accessibilityLabel='Pause'
                                accessibilityRole='button'
                                accessibilityHint='Toucher deux fois pour mettre en pause la lecture, le bouton changera en bouton lecture'
                                onPress={() => this.props.setPlayerStatut('paused')}
                                disabled={statut == 'stopped'}
                            >
                                <FontAweSomeIcon name='pause-circle-o' size={60} color='white' />
                            </TouchableOpacity>
                        }
                        <TouchableOpacity
                            onPress={() => this.props.setPlayerStatut('stopped')}
                            accessibilityLabel='Stop'
                            accessibilityHint='Toucher deux fois pour stopper la lecture'
                            accessibilityRole='button'
                            disabled={statut == 'stopped'}
                        >
                            <FontAweSomeIcon name='stop-circle-o' size={60} color='white' />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        )
    }

}

const mapStateToProps = state => {
    return {
        ui: getUiSelector(state),
        player: getPlayerSelector(state),
        isConnected: getIsConnectedSelector(state)
    }
}

const mapDispatchToProps = {
    setPlayerStatut,
    togglePlayer
}

export default connect(mapStateToProps, mapDispatchToProps)(Player1)




const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        bottom: 0,
        width: Layout.window.width,
        height: Layout.window.height * 0.5,
        backgroundColor: Colors.tabBar,
        justifyContent: 'space-around',
    },
    topContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        flex: 1,
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 10
    },
    text: {
        color: 'white',
        fontSize: 12,
    },
    textError: {
        color: 'red',
        fontSize: 12
    },
    controls: {
        flex: 1,
        marginBottom: 20,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    progressBarContainer: {
        alignItems: 'stretch',
        paddingHorizontal: 50
    },
    timeContainer: {
        flex: 1,
        alignItems: 'center'
    },
    timeText: {
        color: 'white',
        fontSize: 40,
        fontWeight: '100'
    },
    statutContainer: {
        alignItems: 'center',
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal:5,
        height: 30,
    }
})