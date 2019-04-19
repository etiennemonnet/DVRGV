import React, { PureComponent } from 'react'
import { View, StyleSheet, NetInfo, Animated, Easing } from 'react-native';
import { Text } from 'react-native-elements';
import Layout from '../constants/Layout';
import { connect } from 'react-redux';
import { getIsConnectedSelector } from '../redux/selectors/direct_selectors';
import { connectionChange } from '../redux/actions/ConnectionActions'
import { GlobalState } from '../types';


type Props = {
    isConnected: boolean,
    connectionChange: any,
    additionalStyle?: any
}
class OfflineNoticeContainer extends PureComponent<Props, any> {
    constructor(props) {
        super(props)
        this.animatedHeight = new Animated.Value(0)
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange)
/*         this.toggle()
 */    }
    /*  componentDidUpdate(prevProps) {
         if (prevProps.isConnected !== this.props.isConnected) {
             this.toggle()
         }
     } */

    toggle = () => {
        const { isConnected } = this.props
        isConnected ? this.closeAnimation() : this.openAnimation()
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange)
    }

    closeAnimation = () => {
        Animated.timing(this.animatedHeight, {
            toValue: 0,
            duration: 400,
        }).start()
    }

    openAnimation = () => {
        Animated.timing(this.animatedHeight, {
            toValue: 1,
            duration: 200,
        }).start()
    }

    handleConnectionChange = (isConnected: boolean) => {
        this.props.connectionChange(isConnected)
    }

    render() {
        const { additionalStyle, isConnected } = this.props
        const height = this.animatedHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 30]
        })
        return (
            !isConnected &&
            <View style={[styles.container, additionalStyle]}>
                <Text style={styles.text}>Aucune connexion internet</Text>
            </View>
        )
    }

}

const mapStateToProps = (state: GlobalState) => {
    return {
        isConnected: getIsConnectedSelector(state)
    }
}
const mapDispatchToProps = {
    connectionChange
}

export default connect(mapStateToProps, mapDispatchToProps)(OfflineNoticeContainer)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#b52424',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: Layout.window.width,
    },
    text: { color: '#fff' }
})