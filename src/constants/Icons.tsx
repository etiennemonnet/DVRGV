import React from 'react'
import FontAweSomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import Colors from './Colors';
import { Image } from 'react-native-elements';
export default {
    tabBar: {
        radio: 'radio',
        podcasts: 'podcast',
        actus: 'newspaper',
        plus: 'plus',
        player: 'music-circle-o'
    },
    networkOff: (size, color) => <MaterialIcon accessibilityLabel='Icone connexion désactivée' accessibilityRole='image' name='access-point-network-off' size={size} color={color} />,
    volumeUp: (size, color) => <FontAweSomeIcon name='volume-up' size={size} color={color} />,
    volumeDown: (size, color) => <FontAweSomeIcon name='volume-down' size={size} color={color} />,
    share: (size, color) => <MaterialIcon name='share-variant' size={size} color={color} />,
    facebook: <FontAweSomeIcon name='facebook' size={40} color='#4469b0' />,
    twitter: <FontAweSomeIcon name='twitter' size={40} color='#2aa3ef' />,
    phone: (size, color) => <FontAweSomeIcon name='phone' size={size} color={color} />,
    card: (size, color) => <MaterialIcon name='card-text' size={size} color={color} />,
    mail: (size, color) => <FontAweSomeIcon name='envelope' size={size} color={color} />,
    comments: <FontAweSomeIcon name='comments' size={40} color='#707070' />,
    search: <FontAweSomeIcon name='search' size={30} color='white' />,
    close: (size, color) => <FontAweSomeIcon name='close' size={size} color={color} />,
    filter: <FontAweSomeIcon name='filter' size={30} color='white' />,
    player: (size, color) => <FontAweSomeIcon name='circle-o' size={size} color={color} />,
    playPodcast: <FontAweSomeIcon name='play-circle-o' size={90} color={Colors.darkGrey} />,
    pause: (size, color) => <FontAweSomeIcon name='pause-circle-o' size={size} color={color} />,
    play: (size, color) => <FontAweSomeIcon name='play-circle-o' size={size} color={color} />,
    stop: (size, color) => <FontAweSomeIcon name='stop-circle-o' size={size} color={color} />,
    animated: {
        playing: () => <Image source={require('../assets/playing.gif')} />
    }
}