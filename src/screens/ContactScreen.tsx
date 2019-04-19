import React, { Component } from 'react'
import { View, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import Layout from '../constants/Layout';
import HTML from 'react-native-render-html'
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';
import Icons from '../constants/Icons';
import Colors from '../constants/Colors';
import TelButton from '../components/TelButton';


const ignoreNodes = (node, parentTagName, parentisText) => {
    const { type, name, attribs, prev, children, next } = node
    switch (true) {
        case name == 'br':
        case name == "div":
            return true
        default: return false
    }
}
type Props = {
    page: any,
    onLinkPress: any,
}
export default class ContactScreen extends Component<Props, any>{
    constructor(props) {
        super(props)
        this.state = {
            to: 'association@dvrgv.org',
        }
    }
    static navigationOptions = {
        title: 'Contact',
    }

    renderUl = (htmlAttribs, children, convertedCssStyles, passProps) => {
        if (htmlAttribs.class == 'contact-methods') {
            return (
                <View key={0} style={styles.contactMethodsContainer}>
                    <TelButton color={Colors.podcasts} size={40} />
                    <TouchableOpacity
                        accessibilityRole='button'
                        accessibilityHint='Toucher deux fois pour naviguer sur la page twitter DVRGV'
                        accessibilityLabel="Aller sur la page twitter"
                        onPress={() => Linking.openURL('http://www.twitter.com/dvrgv')}>
                        {Icons.twitter}
                    </TouchableOpacity>
                    <TouchableOpacity
                        accessibilityRole='button'
                        accessibilityHint='Toucher deux fois pour naviguer sur la page facebook DVRGV'
                        accessibilityLabel="Aller sur la page facebook"
                        onPress={() => Linking.openURL('http://www.facebook.com/dvrgv')}>
                        {Icons.facebook}
                    </TouchableOpacity>
                    <TouchableOpacity
                        accessibilityRole='button'
                        accessibilityHint='Toucher deux fois pour ouvrir votre application mail'
                        accessibilityLabel="Envoyer un mail"
                        onPress={() => Linking.openURL(`mailto:${this.state.to}`)}
                    >
                        {Icons.mail(40, Colors.actus)}
                    </TouchableOpacity>
                </View>
            )
        }
        else if (htmlAttribs.class == 'team-talk-instructions') {
            return children.map((child, index) => (
                <View key={index}>{child}</View>
            ))
        }


    }


    render() {
        const {
            page: {
                content
            },
            onLinkPress
        } = this.props

        return (
            <View>
                <ScrollView>
                    <HTML
                        html={content.rendered}
                        imagesMaxWidth={Layout.window.width}
                        staticContentMaxWidth={Layout.window.width}
                        containerStyle={{ padding: 5 }}
                        tagsStyles={{ iframe: { borderWidth: 5 } }}
                        ignoredTags={[...IGNORED_TAGS, 'form', 'div']}
                        renderers={{
                            ul: this.renderUl
                        }}
                        onLinkPress={onLinkPress}
                        ignoreNodesFunction={ignoreNodes}
                    />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contactMethodsContainer: {
        flexDirection: 'row',
        width: Layout.window.width,
        justifyContent: 'space-around'
    }
})