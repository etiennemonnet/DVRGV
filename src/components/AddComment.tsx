import React, { PureComponent } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { fontSize } from '../constants/globalStyle';
import AvatarContainer from '../containers/AvatarContainer';

type Props = {
    onSubmit: any
    name: string,
    email: string,
    avatarUrl: string
}
export default class AddComment extends PureComponent<Props, any>{
    constructor(props) {
        super(props)
        this.state = {
            content: ''
        }
    }

    handleOnSubmit = () => {
        const { onSubmit, name, email, avatarUrl } = this.props
        const { content } = this.state
        onSubmit({ name, email, avatarUrl, content })
        this.setState({ content: '' })
    }
    handleOnChange = (content) => {
        this.setState({ content })
    }
    render() {
        const { content } = this.state

        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}
                keyboardVerticalOffset={Platform.OS == 'ios' ? 100 : -100}>
                <AvatarContainer size='medium' />
                <View style={styles.commentContainer}>
                    <Input
                        placeholder='Ajouter un commentaire'
                        value={content}
                        inputStyle={styles.input}
                        onChangeText={this.handleOnChange}
                        multiline />
                    <Button
                        type='clear'
                        title='Ajouter'
                        titleStyle={styles.buttonTitle}
                        onPress={this.handleOnSubmit}
                        containerStyle={styles.buttonContainer} />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#909090',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 10
    },
    input: {
        padding: 5,
        fontSize: 14
    },
    avatarContainer: {
        flex: 1
    },
    commentContainer: {
        flex: 4
    },
    buttonContainer: {
        alignItems: 'flex-end'
    },
    buttonTitle: {
        fontSize: 14
    },
    name: {
        fontSize: fontSize.normal
    }
})