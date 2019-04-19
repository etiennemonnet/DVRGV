import React, { PureComponent } from 'react'
import { ScrollView, RefreshControl, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Colors from '../constants/Colors';
import Comment from './Comment';

type Props = {
    comments: [],
    onRefresh: any
}

export default class CommentsList extends PureComponent<Props, any>{
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false
        }
    }

    renderNoComments = () => (
        <View style={styles.noCommentsContainer}>
            <Text style={styles.noCommentsTitle}>Aucun commentaire</Text>
        </View>
    )
    render() {
        const { refreshing } = this.state
        const { onRefresh, comments } = this.props
        return (
            <ScrollView
                style={styles.container}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />}
            >
                {!comments.length && this.renderNoComments()}
                {comments.map((comment, index) => (
                    <Comment
                        key={index}
                        comment={comment} />
                ))}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        padding: 5,
    },
    noCommentsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noCommentsTitle: {
        color: Colors.lightGreyText
    }
})