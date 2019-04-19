import React, { Component } from 'react'
import { ScrollView } from 'react-native';
import HTML from 'react-native-render-html'
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';
import Layout from '../constants/Layout';


const ignoreNodes = (node, parentTagName, parentisText) => {
    const { type, name, attribs, prev, children, next } = node
    switch (true) {
        case name == 'br':
        case name == 'p' && !children.length:
        case name == 'p' && prev && prev.attribs && prev.attribs.class == 'post-meta':
        case attribs && attribs.class == 'post-meta':
            return true
        default: return false
    }
}

type Props = {
    page,
    onLinkPress
}
export default class ThanksScreen extends Component<Props, any>{
    constructor(props) {
        super(props)

    }
    static navigationOptions = {
        title: 'Remerciements',
    }



    render() {
        const { page: {
            content
        },
            onLinkPress
        } = this.props

        return (
            <ScrollView>
                <HTML
                    html={content.rendered}
                    imagesMaxWidth={Layout.window.width}
                    staticContentMaxWidth={Layout.window.width - 10}
                    containerStyle={{ padding: 5 }}
                    onLinkPress={onLinkPress}
                    ignoredTags={[...IGNORED_TAGS, 'br',]}
                    tagsStyles={{ iframe: { borderWidth: 5 } }}
                    ignoreNodesFunction={ignoreNodes}
                />
            </ScrollView>
        )
    }
}