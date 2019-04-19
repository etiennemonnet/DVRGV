import React from 'react'
import { TouchableOpacity, Linking, View } from 'react-native';
import Icons from '../constants/Icons';

type Props = {
    color?: string
    size?: number
    containerStyle?: any
}
export default (props: Props) => {

    const { size, color, containerStyle } = props
    return (
        <View style={containerStyle}>
            <TouchableOpacity
                accessibilityLabel="Appeler DVRGV"
                accessibilityRole='button'
                accessibilityHint='Toucher deux fois pour appeler DVRGV'
                onPress={() => Linking.openURL('tel:0486582101')}>
                {Icons.phone(size, color)}
            </TouchableOpacity>
        </View>
    )
}