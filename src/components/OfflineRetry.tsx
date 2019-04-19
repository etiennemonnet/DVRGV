import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Icons from '../constants/Icons';
import Colors from '../constants/Colors';

type Props = {
    title?: string
    onPressRetry?: any
    withButton?: boolean
    iconColor?: string
    message?: string
    textColor?: string
    innerContainerStyle?: any
}
export default class OfflineRetry extends PureComponent<Props, any>{
    constructor(props) {
        super(props)
    }
    render() {
        const {
            title,
            onPressRetry,
            withButton,
            textColor,
            iconColor,
            innerContainerStyle,
            message } = this.props
        return (
            <View style={styles.container}>
                <View style={innerContainerStyle}>
                    <View style={styles.header}>
                        {Icons.networkOff(70, iconColor ? iconColor : 'white')}
                        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
                    </View>
                    <Text style={{ textAlign: 'center', color: textColor }}>{message}</Text>
                    {withButton &&
                        <Button
                            title='Réessayer'
                            accessibilityHint="Toucher deux fois pour recharger l'application"
                            accessibilityRole='button'
                            type='solid'
                            buttonStyle={styles.button}
                            onPress={onPressRetry}
                        />
                    }
                </View>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    header: {
        marginBottom: 10,
        alignItems: 'center'
    },

    title: {
        fontSize: 16
    },
    button: {
        marginVertical: 10,
        backgroundColor: Colors.options
    }
})