import React, { PureComponent } from 'react'
import { Animated, StyleSheet, Easing } from 'react-native';

type Props = {
    isPlaying: boolean
}

export default class AnimatedLogo extends PureComponent<Props, any>{
    constructor(props) {
        super(props)
        this.animatedScale = new Animated.Value(0)
        this.animatedSpin = new Animated.Value(0)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isPlaying !== this.props.isPlaying) {
            if (this.props.isPlaying) {
                this.sequenceAnimation()
            } else {
                this.bounceOut().start(() => this.animatedScale.stopAnimation())
                this.animatedSpin.stopAnimation()
            }
        }
    }
    bounceOut = () => {
        return Animated.spring(this.animatedScale, {
            toValue: 0,
            bounciness: 10,
            useNativeDriver:true
        })
    }
    bounceIn = () => {
        return Animated.spring(this.animatedScale, {
            toValue: 1,
            bounciness: 10,
            useNativeDriver:true
        })
    }
    bounceAnimation = () => {
        return Animated.loop(
            Animated.sequence([
                this.bounceIn(),
                this.bounceOut()
            ]))
    }

    rotateAnimation = () => {
        return Animated.timing(this.animatedSpin, {
            toValue: 1,
            duration: 1500,
            easing: Easing.elastic(2)
        })
    }

    sequenceAnimation = () => {
        Animated.sequence([
            this.bounceAnimation(),
        ]).start()
    }

    render() {
        const scale = this.animatedScale.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.2]
        })
        const spin = this.animatedSpin.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        return (
            <Animated.Image
                accessible={true}
                accessibilityLabel='Logo DVRGV radio'
                accessibilityRole='image'
                source={require('../assets/logo-square.png')}
                style={[styles.image,
                {
                    transform: [
                        { scale: scale },
                        { rotate: spin }
                    ]
                }]} />
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
    },
})