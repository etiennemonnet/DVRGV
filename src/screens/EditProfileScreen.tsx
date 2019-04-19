import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getProfileSelector } from '../redux/selectors/direct_selectors';
import EditProfileForm from '../components/EditProfileForm';
import { setProfile } from '../redux/actions/UsersActions'
import OfflineNoticeContainer from '../containers/OfflineNoticeContainer';

class EditProfileScreen extends Component<any, any>{
    constructor(props) {
        super(props)

    }
    static navigationOptions = {
        title: 'Modifier mon profil',
    }

    handleOnSubmit = ({ ...profile }) => {
        this.props.setProfile(profile)
    }

    render() {
        const { profile } = this.props
        return (
            <View style={styles.container}>
                <OfflineNoticeContainer />
                <EditProfileForm {...profile} onSubmit={this.handleOnSubmit} />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        profile: getProfileSelector(state)
    }
}
const mapDispatchToProps = {
    setProfile
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})