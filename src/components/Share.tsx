import React from 'react'
import { TouchableOpacity, View, Share, Alert } from 'react-native';
import Icons from '../constants/Icons';

type Props = {
    accessibilityLabel?: string
    iconSize?: number,
    message?: any,
    url?:string,
    title?:string
    iconColor?: string
    containerStyle?: any
}

export default (props: Props) => {

    const {
        iconColor,
        iconSize,
        accessibilityLabel,
        message,
        url,
        title,
        containerStyle } = props

    const onShare = async () => {
        try {
            const result = await Share.share({
                title:title,
                message: message,
                url:url
            })

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert(
                'Erreur',
                error.message
            )
        }
    };

    return (
            <TouchableOpacity
                accessibilityLabel={accessibilityLabel}
                accessibilityRole='button'
                accessibilityHint='Toucher deux fois pour ouvrir la fenêtre de partage'
                onPress={onShare}
                style={containerStyle}
                activeOpacity={0.8}>
                {Icons.share(iconSize, iconColor)}
            </TouchableOpacity>
    )
}