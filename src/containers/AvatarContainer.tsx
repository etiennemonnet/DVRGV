import React, { Component } from 'react'
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { getAvatarSelector } from '../redux/selectors/direct_selectors';

type Props = {
    size: any
    uri: any
    additionalStyle?: any
}
const defaultAvatar = require('../assets/default-avatar.jpg')

class AvatarContainer extends Component<Props, any>{
    constructor(props) {
        super(props)
    }

    render() {
        const { uri, size, additionalStyle } = this.props
        return <Avatar
            accessible={true}
            accessibilityLabel='Avatar'
            accessibilityStates={['disabled']}
            accessibilityRole='image'
            source={uri ? { uri: uri } : defaultAvatar}
            size={size}
            rounded
        />
    }
}

const mapStateToprops = state => {
    return {
        uri: getAvatarSelector(state)
    }
}

export default connect(mapStateToprops, null)(AvatarContainer)