import React, { PureComponent } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import HTML from 'react-native-render-html';
import DatePost from './DatePost';
import Colors from '../constants/Colors';
import { fontSize } from '../constants/globalStyle';
import Layout from '../constants/Layout';
import moment from 'moment'


const POST_HEIGHT = 120
type Props = {
    color: string
    post: any,
    index: number
    onPress: Function
}
export default class PostExcerpt extends PureComponent<Props, any>{
    constructor(props) {
        super(props)
    }


    renderCategories = () => {
        const { categories } = this.props.post
        return (
            < View style={styles.categoriesContainer} >
                {
                    categories.map((category, index) => {
                        return <View style={styles.category} key={index}><Text style={styles.categoryName}>{category.name}</Text></View>
                    })
                }
            </View >
        )
    }
    render() {

        const { post, onPress, color } = this.props
        const { date, title, categories, author, _embedded } = post

        const featuredImage = _embedded['wp:featuredmedia']
            ? { uri: _embedded['wp:featuredmedia'][0]['media_details']['sizes']['medium']['source_url'] }
            : require('../assets/no-photo.png')

        const formattedTitle = `<h2>${title.rendered}</h2>`
        const formattedDate = moment(date).format('Do MMMM YYYY')

        return (
            <TouchableOpacity
                onPress={() => onPress(post)}
                activeOpacity={0.8}
                accessibilityRole='button'
                accessibilityHint='Toucher deux fois pour naviguer vers article'
                accessibilityLabel={Platform.OS == 'android' ? `${title.rendered}, par ${author.name} le ${formattedDate}` : undefined}
            >
                <View style={styles.container}>
                    <View style={styles.overlay}></View>
                    <Image
                        source={featuredImage}
                        style={styles.image}
                    />
                    <View
                        style={[styles.titleContainer, { borderColor: color }]}>
                        <HTML html={formattedTitle}
                            tagsStyles={{ h2: { fontSize: 13, fontWeight: 'bold', } }}
                        />
                        <Text style={[styles.author, { borderColor: color, backgroundColor: color }]}>Par {author.name}</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <DatePost
                            date={date}
                            containerStyle={styles.dateContainer}
                            color={color} />
                        <View>
                            <Icon name='chevron-right' size={60} color='white' />
                        </View>
                    </View>
                </View>

            </TouchableOpacity>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Layout.window.width,
        height: POST_HEIGHT,
        borderBottomWidth: 1,
        backgroundColor: 'white',
        borderBottomColor: '#bdbdbd',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: POST_HEIGHT,
        width: Layout.window.width,
        zIndex: -1,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    image: {
        position: 'absolute',
        left: 0,
        width: Layout.window.width,
        height: POST_HEIGHT,
        top: 0,
        flex: 1,
        zIndex: -2,
        resizeMode: 'cover'
    },
    titleContainer: {
        flex: 4,
        alignSelf: 'flex-start',
        paddingHorizontal: 5,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomRightRadius: 20
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingTop: 5
    },
    category: {
        paddingRight: 5,
        fontSize: fontSize.normal
    },
    categoryName: {
        color: '#b5b5b5'
    },
    author: {
        alignSelf: 'flex-start',
        fontSize: fontSize.normal,
        marginVertical: 5,
        borderWidth: 1,
        padding: 2,
        fontWeight: '500',
        color: 'white',
        opacity: 0.9
    },
    dateContainer: {
        marginTop: -10
    }
})