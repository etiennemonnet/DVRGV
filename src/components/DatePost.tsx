import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import moment from 'moment'

import { fontSize } from '../constants/globalStyle';
import Colors from '../constants/Colors';

type Props = {
    date: string,
    color?: string
    containerStyle: any
}

export default (props: Props) => {
    const { date, containerStyle, color } = props
    const explosedDate = moment(date).toObject()
    const month = moment().month(explosedDate.months).format('MMM')
    return (
        <View style={[styles.container, containerStyle, { borderTopColor: color }]}>
            <View style={[styles.dateMonthContainer, { backgroundColor: color }]}>
                <View><Text style={[styles.text, styles.date]}>{explosedDate.date}</Text></View>
                <View><Text style={[styles.text, styles.month]}>{month}</Text></View>
            </View>
            <View style={styles.yearContainer}><Text style={[styles.text, styles.year]}>{explosedDate.years}</Text></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    dateMonthContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderTopLeftRadius:3,
        borderTopRightRadius:3
    },
    yearContainer: {
        padding: 5,
        backgroundColor: 'white',
        borderBottomLeftRadius:3,
        borderBottomRightRadius:3
    },
    text: {
        fontWeight: '600'

    },
    date: {
        color: 'white',
        fontSize: fontSize.normal
    },
    month: {
        color: 'white',
        fontSize: fontSize.normal
    },
    year: {
        fontSize: fontSize.big,
    }
})