import React, { PureComponent } from 'react'
import { View, StyleSheet, ScrollView, Linking, Image } from 'react-native';
import { connect } from 'react-redux';
import { selectedPageSelector } from '../redux/selectors/pages_selectors';
import HTML from 'react-native-render-html'
import Layout from '../constants/Layout';
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';
import { isInternalLink, getTitleFromLink } from '../utils';
import { addPageToStack } from '../redux/actions/PagesActions'
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';
import ThanksScreen from './ThanksScreen';
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
                style={{ flex: 1, resizeMode: 'contain' }}
                accessibilityLabel={alt}
                containerStyle={{ width: Layout.window.width - 10, height: 300 }}
            />
        )
    },
}


class WordpressPageScreen extends PureComponent<any, any>{
    constructor(props) {
        super(props)
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title')
        }
    }

    handleOnLinkPress = (href) => {
        if (isInternalLink(href)) {
            const title = getTitleFromLink(href)
            this.props.addPageToStack(href)
            this.props.navigation.push('Wordpress', { source: href, title: title, })
        }
        else {
            Linking.openURL(href)
        }
    }

    render() {
        const { page } = this.props
        const { content } = page
        const title = this.props.navigation.getParam('title')
        switch (title) {
            case 'Qui sommes-nous ?':
                return <AboutScreen page={page} onLinkPress={this.handleOnLinkPress} />
            case 'Contactez-nous':
                return <ContactScreen page={page} onLinkPress={this.handleOnLinkPress} />
            case 'Remerciements':
                return <ThanksScreen page={page} onLinkPress={this.handleOnLinkPress} />
            default:
                return (
                    <ScrollView>
                        <HTML
                            html={content.rendered}
                            imagesMaxWidth={Layout.window.width}
                            staticContentMaxWidth={Layout.window.width - 10}
                            containerStyle={{ padding: 5 }}
                            onLinkPress={this.handleOnLinkPress}
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
}

const mapStateToProps = (state, ownProps) => {
    const source = ownProps.navigation.getParam('source')
    return {
        page: selectedPageSelector(state, source)
    }
}

const mapDispatchToProps = {
    addPageToStack
}

export default connect(mapStateToProps, mapDispatchToProps)(WordpressPageScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})