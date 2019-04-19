import React, { Component } from 'react'
import email from 'react-native-email'
import { Input, Overlay, Button } from 'react-native-elements';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Layout from '../constants/Layout';
import Icons from '../constants/Icons';
import Colors from '../constants/Colors';

type Props = {
    isVisible: boolean
    onClosePress: any
}

type State = {
    to: string | string[],
    cc: string | string[],
    bcc: string | string[],
    subject: string,
    body: string,
}
export default class EmailForm extends Component<Props, State>{
    constructor(props) {
        super(props)
        this.state = {
            to: 'etienne.monnet@gmail.com',
            cc: [],
            bcc: 'etienne.monnet@gmail.com',
            subject: '',
            body: '',
        }
    }

    handleEmail = () => {
        const { to, cc, bcc, subject, body } = this.state
        email(to, { cc, bcc, subject, body }).catch(this.handleError)
    }

    setField = (key, value) => {
        this.setState({ [key]: value })
    }

    render() {
        const { isVisible, onClosePress } = this.props
        const { to, cc, bcc, subject, body } = this.state
        return (
            <Overlay
                isVisible={isVisible}
                windowBackgroundColor="rgba(0, 0, 0, .5)"
                overlayBackgroundColor='white'
                width="auto"
                height="auto"
            >
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClosePress}>
                        {Icons.close(30, Colors.darkGrey)}
                    </TouchableOpacity>
                    <Input
                        placeholder='Votre email'
                        keyboardType='email-address'
                        leftIcon={Icons.mail(20, Colors.lightGreyText)}
                        leftIconContainerStyle={{ marginRight: 5 }}
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={(value) => this.setField('bcc', value)}
                    />
                    <View style={styles.messageContainer}>
                        <Input
                            placeholder='Sujet du message'
                            onChangeText={(value) => this.setField('subject', value)}
                        />
                        <Input
                            placeholder='Votre message'
                            value={body}
                            onChangeText={(value) => this.setField('body', value)}
                            multiline
                            numberOfLines={10}
                            inputContainerStyle={{ height: 100 }}
                        />
                    </View>
                    <Button
                        title='Envoyer'
                        onPress={this.handleEmail}
                        type='solid'
                        containerStyle={styles.sendButtonContainer} 
                        buttonStyle={styles.sendButton}/>
                </View>

            </Overlay>
        )

    }
}
const styles = StyleSheet.create({
    container: {
        width: Layout.window.width - 60,
        height: Layout.window.height - 300,
        alignItems: 'center'
    },
    title: {

    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    sendButtonContainer:{
        marginTop:30
    },
    sendButton:{
        backgroundColor:Colors.options
    },
    messageContainer: {
        marginTop: 30,
        alignSelf: 'stretch'
    }
})