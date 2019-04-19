import React, { PureComponent, Component } from 'react'
import PostExcerpt from './PostExcerpt';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { Section } from '../types';


interface Props {
    section?: Section
    posts: []
    onSelect: (post: any) => void
    onEnd?: any,
    onScroll?: any
    loading?: boolean
}
export default class PostsList extends PureComponent<Props, any>{
    constructor(props) {
        super(props)
    }

    renderPost = ({ item, index }) => {
        const color = this.props.section == 'articles' ? Colors.actus : Colors.podcasts
        return (
            <PostExcerpt post={item}
                index={index}
                onPress={this.props.onSelect}
                color={color} />
        )
    }
    renderRefetchLoading = () => {
        const { loading } = this.props
        if (!loading) {
            return null
        }
        else {
            return (
                <View
                    style={styles.refetchLoader}>
                    <ActivityIndicator accessibilityLabel='Chargement' />
                </View>
            )
        }

    }
    renderSeparator = () => {
        return <View style={styles.itemSeparator}></View>
    }

    render() {
        const {
            posts,
            section,
            onEnd,
            onScroll } = this.props
        return (
            <FlatList
                data={posts}
                extraData={section}
                initialNumToRender={10}
                ListFooterComponent={this.renderRefetchLoading}
                renderItem={this.renderPost}
                onEndReached={onEnd}
                onEndReachedThreshold={0.5}
                ItemSeparatorComponent={this.renderSeparator}
                keyExtractor={(item,index) => String(index)}
                contentContainerStyle={{ paddingTop: 10 }}
            />)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.tabBar
    },
    header: {
        marginTop: 40,
        height: 44,
        borderWidth: 1
    },
    refetchLoader: {
        padding: 20,
    },
    itemSeparator: {
        height: 15,
        backgroundColor: Colors.tabBar
    }
})