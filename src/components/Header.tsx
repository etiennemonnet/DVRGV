import React from 'react'
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { Text, Input, Header } from 'react-native-elements';
import Colors from '../constants/Colors';
import Icons from '../constants/Icons';
import { Section } from '../types';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
    section: Section
    onClickSearch: any
    onClickFilter: any
    onSearch: any
    searchTerm: string
    ui: any
    totalPosts: number,
    displayedPosts: number
}
export default (props: Props) => {
    const {
        section,
        onClickSearch,
        onClickFilter,
        totalPosts,
        displayedPosts,
        ui,
        onSearch,
        searchTerm,
    } = props

    const showSearch = ui[section].showSearch
    const backgroundColors = section == 'articles' ? [Colors.actus, '#9e050d'] : [Colors.podcasts, '#df671d']
    const title = section == 'articles' ? 'Articles' : 'Podcasts'
    return (
        <LinearGradient
            colors={backgroundColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >
            <Header
                backgroundColor='transparent'
            >
                {/* <TouchableOpacity
                    onPress={onClickSearch}
                    accessibilityLabel='Rechercher'
                    accessibilityRole='button'
                    accessibilityHint="Toucher deux fois pour ouvrir le champ de recherche"

                >
                    {showSearch ? Icons.close(30, 'white') : Icons.search}
                </TouchableOpacity> */}
                <View></View>
                <View>
                    <Text
                        accessibilityRole='header'
                        accessibilityLabel={`${title} : ${displayedPosts} sur ${totalPosts}`}
                        style={styles.title}>{title} : {displayedPosts} / {totalPosts}
                    </Text>
                </View>
                <View></View>

                {/*
                {showSearch ?
                    <Input
                        placeholder='Saisir votre recherche'
                        onChangeText={onSearch}
                        value={searchTerm}
                        autoCapitalize='none'
                        inputStyle={styles.searchInput}
                        inputContainerStyle={styles.searchInputContainer}
                        containerStyle={styles.searchInputOuterContainer}
                    />
                    
                 <TouchableOpacity
                    accessibilityLabel='Filtrer par catégories'
                    accessibilityHint='Toucher deux fois pour ouvrir le panel contenant toutes les catégories, retoucher deux fois pour fermer le panel'
                    accessibilityRole='button'
                    onPress={onClickFilter}>
                    {Icons.filter}
                </TouchableOpacity> */}
            </Header>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#dededf'
    },
    leftContainer: {
        flex: 1,
    },
    centerContainer: {
        flex: 4,
        alignItems:'center'
    },
    rightContainer: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: Platform.OS == 'android' ? 20 : 16
    },
    searchInput: {
        backgroundColor: 'white',
        fontSize: 15,
        padding: 5
    },
    searchInputContainer: {
        height: 25,
    },
    searchInputOuterContainer: {
        width: 220,
    }
})