import React, { PureComponent } from 'react'
import { StyleSheet, SafeAreaView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icons from '../constants/Icons';
import Colors from '../constants/Colors';
import AvatarContainer from '../containers/AvatarContainer';
import Layout from '../constants/Layout';


type Props = {
    name: string
    email: string
    avatarUrl: string,
    onSubmit: any
}
export default class EditProfileForm extends PureComponent<Props, any>{
    constructor(props: Props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            avatarUrl: ''
        }
    }
    componentDidMount() {
        const { name, email, avatarUrl } = this.props
        this.setState({
            name, email, avatarUrl
        })
    }
    handleOnChange = (key, value) => {
        this.setState({ [key]: value })
    }

    render() {
        const { onSubmit } = this.props
        return (
            <SafeAreaView style={styles.container}>
                <AvatarContainer
                    size='xlarge'
                    additionalStyle={styles.avatarContainer}
                />
                <Input
                    leftIcon={Icons.card(30, Colors.lightGreyText)}
                    placeholder='Nom'
                    leftIconContainerStyle={styles.inputLeftIcon}
                    value={this.state.name}
                    onChangeText={(value) => this.handleOnChange('name', value)}
                    textContentType='givenName'
                    keyboardType='default'
                    containerStyle={styles.inputContainer}
                />
                <Input
                    leftIcon={Icons.mail(30, Colors.lightGreyText)}
                    placeholder='Email'
                    leftIconContainerStyle={styles.inputLeftIcon}
                    value={this.state.email}
                    onChangeText={(value) => this.handleOnChange('email', value)}
                    textContentType='emailAddress'
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    containerStyle={styles.inputContainer}
                />
                <Button
                    title='Valider'
                    type='solid'
                    accessibilityRole='button'
                    accessibilityHint='Toucher deux fois pour sauvegarder vos informations de profil'
                    onPress={() => onSubmit(this.state)}
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer} />
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        width:Layout.window.width * 0.8,
        flex: 1,
        alignItems: 'center',
        marginTop: 5
    },
    avatarContainer: {
        marginBottom: 20
    },
    inputContainer: {
        alignSelf: 'stretch',
        marginBottom: 20
    },
    inputLeftIcon: {
        marginRight: 5
    },
    button: {
        backgroundColor: Colors.options,
        width: 200
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 30
    }
})