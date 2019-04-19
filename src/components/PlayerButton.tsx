import React from 'react'
import { PlayerStatut } from '../types';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import Icons from '../constants/Icons';

type Props = {
    statut: PlayerStatut,
    color?: string
    onPress: any
}
export default (props: Props) => {
    const { statut, onPress, color } = props

    const renderContent = () => {
        switch (statut) {
            case 'playing':
                return Icons.animated.playing()
            case 'set':
                return <ActivityIndicator size='large' color={color}/>
            case 'stopped':
                return Icons.player(60, color)
            case 'paused':
                return Icons.pause(60, color)
        }
    }
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.playerIcon}
            onPress={onPress}
            accessibilityLabel='Lecteur audio'
            accessibilityRole='button'
            accessibilityHint='Toucher deux fois pour afficher le lecteur audio'
        >
            {renderContent()}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    playerIcon: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -20,
        borderRadius: 70,
        backgroundColor: Colors.lightGreyText,

    },
})
