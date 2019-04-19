import React, { Component } from 'react'
import { ListItem, Text, Button } from 'react-native-elements'
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getPagesSelector } from '../redux/selectors/direct_selectors';
import { addPageToStack } from '../redux/actions/PagesActions'
import { pagesIsLoadingSelector } from '../redux/selectors/loading_selectors';
import Colors from '../constants/Colors';
import { fetchPages } from '../redux/actions/PagesActions'
import OfflineNoticeContainer from '../containers/OfflineNoticeContainer';
import { pagesHasErrorSelector } from '../redux/selectors/error_selectors';
import OfflineRetry from '../components/OfflineRetry';

class MoreInfoScreen extends Component<any, any>{
    constructor(props) {
        super(props)

    }
    static navigationOptions = {
        title: 'Plus',
    }

    renderLoading = () => {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color={Colors.darkGrey} />
            </View>
        )
    }

    renderList = (list) => (
        list.map((item, index) => (
            <ListItem
                accessibilityRole='button'
                accessibilityLabel={item.accessibilityLabel}
                accessibilityHint={item.accessibilityHint}
                key={index}
                bottomDivider
                title={item.title}
                onPress={item.action}
                chevron />
        ))
    )

    handleOnRetryPress = () => {
        this.props.fetchPages()
    }

    renderNoConnection = () => (
        <OfflineRetry
            iconColor={Colors.tabBar}
        />
    )

    render() {
        const { loading, pages, error } = this.props
        const list = [
            {
                title: 'Modifier mon profil',
                accessibilityHint: 'Toucher deux fois pour naviguer vers écran profil',
                accessibilityLabel: 'Modifier mon profil',
                action: () => this.props.navigation.navigate('EditProfile')
            },
            {
                title: 'Qui sommes-nous ?',
                accessibilityLabel: 'Qui sommes-nous ?',
                accessibilityHint: 'Toucher deux fois pour naviguer vers écran qui-sommes-nous',
                action: () => {
                    this.props.addPageToStack(8)
                    this.props.navigation.navigate('Wordpress', { source: 8, title: 'Qui sommes-nous ?' })
                }
            },
            {
                title: 'Contact',
                accessibilityLabel: 'Contact',
                accessibilityHint: 'Toucher deux fois pour naviguer vers écran contact',
                action: () => {
                    this.props.addPageToStack(15)
                    this.props.navigation.navigate('Wordpress', { source: 15, title: 'Contactez-nous' })
                }
            },
            {
                title: 'Remerciements',
                accessibilityLabel: 'Remerciements',
                accessibilityHint: 'Toucher deux fois pour naviguer vers écran remerciements',
                action: () => {
                    this.props.addPageToStack(1077)
                    this.props.navigation.navigate('Wordpress', { source: 1077, title: 'Remerciements' })
                }
            },
            /*  {
                 title: 'Dons',
                 accessibilityHint: 'Toucher deux fois pour naviguer vers écran dons',
                 action: () => {
                     this.props.addPageToStack(1064)
                     this.props.navigation.navigate('Wordpress', { source: 1064, title: 'Dons' })
                 }
             } */
        ]
        return (
            <View style={styles.container}>
                <OfflineNoticeContainer />
                {loading ? this.renderLoading()
                    : error ? this.renderNoConnection()
                        : this.renderList(list)}
            </View >
        )
    }
}

const mapStateToProps = state => {
    return {
        state,
        pages: getPagesSelector(state),
        loading: pagesIsLoadingSelector(state),
        error: pagesHasErrorSelector(state)
    }
}
const mapDispatchToProps = {
    addPageToStack,
    fetchPages
}
export default connect(mapStateToProps, mapDispatchToProps)(MoreInfoScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})