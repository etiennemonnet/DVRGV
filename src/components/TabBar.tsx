import React, { PureComponent } from 'react'
import { View, SafeAreaView, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Platform, Keyboard } from 'react-native';
import { NavigationRoute } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from '../constants/Icons';
import Colors from '../constants/Colors';
import { connect } from 'react-redux';
import { togglePlayer } from '../redux/actions/UiActions'
import { getPlayerSelector } from '../redux/selectors/direct_selectors';
import PlayerButton from './PlayerButton';


class TabBar extends PureComponent<any, any>{
    constructor(props) {
        super(props)
        this.state = {
            visible: true
        }
    }
    /* componentDidMount() {
        if (Platform.OS === "android") {
            this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this.visible(false));
            this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", this.visible(true));
        }
    }

    componentWillUnmount = () => {
        this.keyboardDidShowListener!.remove();
        this.keyboardDidHideListener!.remove();
    }; */

    visible = (visible: boolean) => () => this.setState({ visible })


    handleOnPressPlayerButton = () => {
        this.props.togglePlayer()
    }

    render() {
        const {
            activeTintColor,
            inactiveTintColor,
            navigation,
            getLabelText,
            renderIcon,
            player
        } = this.props;
        const { statut } = player
        const currentIndex = navigation.state.index;
        const { visible } = this.state

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.innerContainer}>

                    <TouchableWithoutFeedback
                        onPress={() => navigation.navigate('Radio')}
                        accessibilityLabel='Radio'
                        accessibilityRole='button'
                        accessibilityHint="Toucher deux fois pour naviguer vers écran radio"
                        accessibilityStates={currentIndex == 0 ? ['selected'] : undefined}
                    >
                        <Icon
                            name={Icons.tabBar.radio}
                            size={40}
                            color={currentIndex == 0 ? activeTintColor : inactiveTintColor} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => navigation.navigate('Podcasts')}
                        accessibilityLabel='Podcasts'
                        accessibilityRole='button'
                        accessibilityHint="Toucher deux fois pour naviguer vers écran podcasts"
                        accessibilityStates={currentIndex == 1 ? ['selected'] : undefined}

                    >
                        <Icon
                            name={Icons.tabBar.podcasts}
                            size={40}
                            color={currentIndex == 1 ? activeTintColor : inactiveTintColor} />


                    </TouchableWithoutFeedback>
                    <PlayerButton
                        statut={statut}
                        color={inactiveTintColor}
                        onPress={this.handleOnPressPlayerButton}
                    />
                    <TouchableWithoutFeedback
                        onPress={() => navigation.navigate('Actus')}
                        accessibilityLabel='Articles'
                        accessibilityRole='button'
                        accessibilityHint="Toucher deux fois pour naviguer vers écran articles"
                        accessibilityStates={currentIndex == 2 ? ['selected'] : undefined}

                    >
                        <Icon
                            name={Icons.tabBar.actus}
                            size={40}
                            color={currentIndex == 2 ? activeTintColor : inactiveTintColor} />

                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() => navigation.navigate('MoreInfo')}
                        accessibilityLabel="Plusse"
                        accessibilityRole='button'
                        accessibilityHint="Toucher deux fois pour naviguer vers écran Plusse"
                        accessibilityStates={currentIndex == 3 ? ['selected'] : undefined}

                    >
                        <Icon
                            name={Icons.tabBar.plus}
                            size={40}
                            color={currentIndex == 3 ? activeTintColor : inactiveTintColor} />

                    </TouchableWithoutFeedback>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.tabBar
    },
    playerIcon: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -20,
        borderRadius: 70,
        backgroundColor: Colors.lightGreyText,

    },
    innerContainer: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
})

const mapStateToProps = state => {
    return {
        player: getPlayerSelector(state)
    }
}

const mapDispatchToProps = {
    togglePlayer
}
export default connect(mapStateToProps, mapDispatchToProps)(TabBar)