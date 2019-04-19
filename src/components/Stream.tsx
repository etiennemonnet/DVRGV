import React, { StatelessComponent } from 'react'
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import Layout from '../constants/Layout';
import Icons from '../constants/Icons';
import Share from './Share';
import { PlayerState } from '../types';
import AnimatedLogo from './AnimatedLogo';
import TelButton from './TelButton';

type Props = {
    containerStyle?: any,
    onPlayPress: any
    onStopPress: any
    player: PlayerState
}

const Stream: StatelessComponent<Props> = (props) => {

    const { player: {
        stream: {
            title,
            image,
        },
        statut,
        type
    },
        containerStyle,
        onPlayPress,
        onStopPress,
        children
    } = props

    const renderPlayButton = () => {
        return <TouchableOpacity
            onPress={onPlayPress}
            activeOpacity={0.8}
            accessibilityLabel='Lecture'
            accessibilityRole='button'
            accessibilityHint='Toucher deux fois pour écouter la radio, le bouton changera en bouton stop'
        >
            {Icons.play(60, 'white')}
        </TouchableOpacity>
    }
    const renderStopButton = () => {
        return <TouchableOpacity
            onPress={onStopPress}
            activeOpacity={0.8}
            accessibilityLabel='Stop'
            accessibilityRole='button'
            accessibilityHint="Toucher deux fois pour arrêter d\'écouter la radio"
        >
            {Icons.stop(60, 'white')}
        </TouchableOpacity>
    }

    return (
        <View style={[styles.container, containerStyle]}>
            <AnimatedLogo isPlaying={(statut == 'playing' && type == 'radio')} />
            <View style={styles.infoContainer}>
                <Text style={styles.radioTitle}>{`${'Radio'}`.toUpperCase()}</Text>
                <Text
                    accessibilityHint='Titre du morceau en cours'
                    accessibilityLabel={title}
                    style={styles.text}>{title.toUpperCase()}
                </Text>
            </View>

            <View style={styles.buttonsContainer}>
                <View style={{ width: 60 }}>
                    {(statut == 'playing' && type == 'radio') ? renderStopButton() : renderPlayButton()}
                </View>
                <Share
                    message={`J'écoute ${title} sur DVRGV Radio`}
                    title={`J'écoute ${title} sur DVRGV Radio`}
                    accessibilityLabel="Partager le titre en cours"
                    iconColor='white'
                    iconSize={60}
                />
                <TelButton
                    color='white'
                    size={60}
                />
            </View>
            {children}

        </View>
    )
}

export default Stream

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        width: Layout.window.width,
    },

    infoContainer: {
        marginTop: 30,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        width: Layout.window.width * 0.9,
        backgroundColor: 'rgba(037,076,131,0.5)',
    },
    buttonsContainer: {
        width: Layout.window.width * 0.7,
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    radioTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: 'white',

    },
    text: {
        marginTop: 5,
        fontSize: 14,
        color: 'white',
        fontWeight: '200',

    },
})