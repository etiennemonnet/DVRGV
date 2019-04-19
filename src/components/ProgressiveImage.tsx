
import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { any } from 'prop-types';


type Props = {
    containerStyle: any,
    source: any,
    style: any,
    accessibilityLabel: string,
}
export default class ProgressiveImage extends PureComponent<Props, any> {

    animatedValue = new Animated.Value(0)

    handleImageLoading = () => {
        Animated.timing(this.animatedValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start()
    }

    render() {
        const { containerStyle, source, style, accessibilityLabel, } = this.props

        return (
            <View
                style={[styles.container, containerStyle]}
                accessible={true}
                accessibilityLabel={accessibilityLabel}
                accessibilityRole='image'
            >
                <Animated.Image
                    source={source}
                    style={[style, { opacity: this.animatedValue }]}
                    onLoad={this.handleImageLoading}
                />
            </View>
        );
    }

}



const styles = StyleSheet.create({
    imageOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
    container: {
        backgroundColor: '#ededed',
    },
});