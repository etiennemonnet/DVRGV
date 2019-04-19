import React from 'react'
import { Button, Text } from 'react-native-elements';
import Icons from '../constants/Icons';
import Colors from '../constants/Colors';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

type Props = {
    totalComments: number,
    totalCommentsColor: string,
    onPress: any
}
export default (props: Props) => {

    const { totalComments,
        onPress,
        totalCommentsColor
    } = props

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            accessibilityHint='Toucher deux fois pour naviguer vers écran commentaires'
            accessibilityRole='button'
            accessibilityLabel={`${totalComments} commentaires`}
            style={styles.container}
            onPress={onPress}
        >
            <View style={[styles.totalComments, { backgroundColor: totalCommentsColor }]}>
                <Text style={styles.totalCommentsText}>{totalComments}</Text>
            </View>
            {Icons.comments}
        </TouchableOpacity >

    )
}

const styles = StyleSheet.create({
    container: {
        width: 180,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        color: Colors.darkGrey,
        fontSize: 12,
        marginLeft: 5
    },
    totalComments: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        left: 35,
        top: -5,
        height: 20,
        borderRadius: 10,
        zIndex: 100
    },
    totalCommentsText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600'
    }
})