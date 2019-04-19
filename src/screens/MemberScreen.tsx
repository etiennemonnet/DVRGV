

import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Image, Linking } from 'react-native';
import HTML from 'react-native-render-html'
import Layout from '../constants/Layout';
import ProgressiveImage from '../components/ProgressiveImage';


const ignoreNodes = (node, parentTagName, parentisText) => {
    const { type, name, attribs, prev, children, next } = node
    switch (true) {
        case name == 'br':
        case name == 'p' && !children.length:
        case attribs && attribs.class == 'post-meta':
        case name == 'p' && prev.attribs && prev.attribs.class == 'post-meta':
        case name == 'h2' && children.length && children[0].data == 'Présentation':
            return true
        case name == 'h2' && children[0].data == 'Matériels utilisés':
            return false
    }
}

const renderers = {
    img: (htmlAttribs, children, css, props) => {
        const { width, src, alt } = htmlAttribs
        return (
            <ProgressiveImage
                key={props.nodeIndex}
                source={{ uri: src }}
                style={{ flex: 1, resizeMode: 'cover' }}
                accessibilityLabel={alt}
                containerStyle={{ width: Layout.window.width - 10, height: 300 }}
            />
        )
    },
}

type Props = {
    page: any,
    onLinkPress: any
}
export default class MemberScreen extends Component<Props, any>{
    constructor(props) {
        super(props)
    }
    static navigationOptions = {
        title: 'Membre'
    }

    render() {
        const {
            page: {
                content
            },
            onLinkPress
        } = this.props

        return (
            <ScrollView style={styles.container}>
                <HTML
                    html={content.rendered}
                    onLinkPress={onLinkPress}
                    imagesInitialDimensions={{ width: Layout.window.width - 10 }}
                    imagesMaxWidth={Layout.window.width - 10}
                    staticContentMaxWidth={Layout.window.width - 5}
                    containerStyle={{ padding: 5 }}
                    ignoreNodesFunction={ignoreNodes}
                    renderers={renderers}
                />
            </ScrollView>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
