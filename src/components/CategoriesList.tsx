import React, { PureComponent } from 'react'
import { Text } from 'react-native-elements'
import { View, StyleSheet, TouchableOpacity, Animated, Easing, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import { fontSize } from '../constants/globalStyle';
type Props = {
    visible: boolean
    categories: any[],
    loading?: boolean,
    selectedCategories: any[],
    color?: string,
    onAdd: any,
    onRemove: any
}
export default class CategoriesList extends PureComponent<Props, any>{
    constructor(props: Props) {
        super(props)
        this.animatedValue = new Animated.Value(0)
    }

    componentDidUpdate() {
        const { visible } = this.props
        visible && this.openAnimation()
    }
    openAnimation = () => {
        Animated.timing(this.animatedValue, {
            toValue: 1,
            duration: 200,
            easing: Easing.elastic(1),
        }).start()
    }

    closeAnimation = () => {
        Animated.timing(this.animatedValue, {
            toValue: 0,
            duration: 200,
            easing: Easing.elastic(0),
        }).start()
    }



    setMaxHeight = (event) => {
        this.setState({
            maxHeight: event.nativeEvent.layout.height
        });
    }


    isSelected = (id: number) => {
        const { selectedCategories } = this.props
        return selectedCategories.includes(id)

    }

    renderLoading = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator />
        </View>
    )

    renderCategories = () => {
        const { categories, onAdd, onRemove, color } = this.props
        return categories.map((category) => {
            const isSelected = this.isSelected(category.id)
            return (
                <TouchableOpacity
                    accessibilityHint={`Toucher deux fois pour filtrer la liste par ${category.name}`}
                    accessibilityRole='button'
                    accessibilityStates={isSelected ? ['selected'] : undefined}
                    key={category.id}
                    style={[styles.category, isSelected ? { borderColor: color, backgroundColor: color } : undefined]}
                    onPress={() => isSelected ? onRemove(category.id) : onAdd(category.id)}
                >
                    <Text
                        style={[styles.text, isSelected ? styles.nameSelected : styles.name]}
                    >{category.name}</Text>
                </TouchableOpacity>
            )
        })
    }


    render() {
        /* const height = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 50]
        }) */
        return (
            <View style={[styles.container, { height: 50 }]}>
                {this.renderCategories()}
            </View >

        )
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: Colors.tabBar,
        overflow: 'hidden'
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    category: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        padding: 5,
        margin: 5,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: Colors.lightGreyText,
        borderRadius: 5,
    },
    name: {
        color: 'black'
    },
    text: {
        fontSize: fontSize.normal
    },
    nameSelected: {
        color: 'white',
    }
})