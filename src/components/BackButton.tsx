import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


export default (navigation) => {

    return (
        <Icon
            accessibilityLabel='Retour'
            accessibilityRole='button'
            accessibilityHint="Toucher deux fois pour revenir à l'écran précédent"
            style={{ alignSelf: 'center' }}
            name='chevron-left' color='white'
            size={45}
            onPress={() => { navigation.goBack() }}
        />
    )
}