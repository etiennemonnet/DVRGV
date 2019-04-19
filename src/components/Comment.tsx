import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Text, Avatar } from 'react-native-elements'
import HTML from 'react-native-render-html'
import moment from 'moment'

type Props = {
    comment: any
}
export default (props: Props) => {
    const {
        comment: {
            author_name,
            date,
            content: {
                rendered
            }
        } } = props

    return (
        <View style={styles.container}>
            <Avatar 
            source={require('../assets/default-avatar.jpg')} 
            size='medium' 
            rounded 
            avatarStyle={styles.avatarContainer}/>
            <View style={styles.details}>
                <Text>{author_name}</Text>
                <Text style={styles.date}>Le {moment(date).format('DD MMMM YYYY')}</Text>
                <View style={styles.content}><HTML html={rendered} /></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom:10
    },
    avatarContainer:{
        flex:1
    },
    details:{
        flex:4,
        marginLeft:10
    },
    content:{
    },
    date:{
        color:'#909090'
    }
})