import React, { Component } from 'react'
import { ListItem, Text } from 'react-native-elements'
import { ScrollView, Linking } from 'react-native';
import { connect } from 'react-redux'
import { getUsersSelector, getPagesSelector } from '../redux/selectors/direct_selectors';
import { selectedPageSelector } from '../redux/selectors/pages_selectors';
import HTML from 'react-native-render-html'
import Layout from '../constants/Layout';
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';
import { selectPage, addPageToStack } from '../redux/actions/PagesActions';
import { isInternalLink } from '../utils'


const ignoreNodes = (node, parentTagName, parentisText) => {
    const { type, name, attribs, prev, children, next } = node
    switch (true) {
        case name == 'br':
        case name == 'h2' && children[0].data.includes('Présentation'):
        case name == 'p' && !children.length:
        case name == 'p' && prev && prev.attribs && prev.attribs.class == 'post-meta':
        case attribs && attribs.class == 'post-meta':
            return true
        default: return false
    }
}

type Props = {
    page: any,
    onLinkPress: any
}
export default class AboutScreen extends Component<Props, any>{
    constructor(props) {
        super(props)
    }
    static navigationOptions = {
        title: 'Qui sommes-nous ?',
    }



    render() {
        const {
            page: {
                content
            },
            onLinkPress
        } = this.props

        const renderers = {
            /*  ul: (htmlAttribs, children, convertedCSSStyles, passProps) => {
                 if (htmlAttribs.class == 'donateurs') {
                     return children
                 }
                 else {
                     return children.map((li, index) => {
                         return li.map((child, index) => {
                             console.log(child)
                             return <ListItem
                                 accessible={true}
                                 accessibilityHint='Toucher deux fois pour naviguer vers écran membre'
                                 accessibilityRole='button'
                                 key={index}
                                 title={child}
                                 chevron
                                 bottomDivider />
                         })
                     })
                 }
             }, */
            a: (htmlAttribs, children, convertedCSSStyles, passProps) => {
                console.log(htmlAttribs)
                return <Text
                    accessibilityLabel={htmlAttribs.title}
                    accessibilityHint='Toucher deux fois pour naviguer vers la cible du lien'
                    accessibilityRole='button'
                    onPress={()=>onLinkPress(htmlAttribs.href)}
                >{children}</Text>
            }
        }
        return (
            <ScrollView>
                <HTML
                    html={content.rendered}
                    imagesMaxWidth={Layout.window.width}
                    staticContentMaxWidth={Layout.window.width - 10}
                    containerStyle={{ padding: 5 }}
                    ignoredTags={[...IGNORED_TAGS, 'br']}
                    alterChildren={(node) => {
                        if (node.name === 'iframe') {
                            delete node.attribs.width;
                        }
                        return node.children;
                    }}
                    renderers={renderers}
                    ignoreNodesFunction={ignoreNodes}
                />
            </ScrollView>
        )
    }
}