import React, { Component } from 'react'
import { Alert, View } from 'react-native';
import { connect } from 'react-redux';
import { appHasErrorSelector } from '../redux/selectors/error_selectors';
import { resetError } from '../redux/actions/ErrorActions'


class ErrorContainer extends Component<any, any>{
    constructor(props) {
        super(props)
    }

    handleOnPress = () => {
        this.props.resetError()
    }
    renderError = ({ title, message }) => {
        return Alert.alert(
            title,
            message,
            [
                { text: 'OK', onPress: () => this.handleOnPress },
            ],
        )
    }
    render() {
        const { error } = this.props

        return (
            <View>
                {error && this.renderError(error)}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: appHasErrorSelector(state)
    }
}

const mapDispatchToProps = {
    resetError
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorContainer)