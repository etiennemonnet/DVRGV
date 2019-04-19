import React, { PureComponent } from 'react'
import { Text, Linking, TouchableOpacity } from 'react-native';
import { isInternalLink } from '../utils';

type Props = {
    url: string
    text: string
    onPress?: any
}
export default class Link extends PureComponent<Props,any> {
    constructor(props) {
        super(props)
        console.log('link')
    }

    goToLink = () => {
        const { url } = this.props
        if(isInternalLink(url)){

        }
        else{
            Linking.openURL(url)
        }
        
    }

    render() {
        const { text } = this.props
        return (
            <TouchableOpacity onPress={this.goToLink}>{text}</TouchableOpacity>
        )
    }

}