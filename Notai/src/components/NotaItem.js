import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'

export default function NotaItem({ nota, onDelete }) {
    const formattedDate = moment(nota.data).locale('pt-br').format('D [de] MMM YYYY')

    const rightActions = () => (
        <TouchableOpacity style={styles.right} onPress={() => onDelete(nota.id)}>
            <Icon name="trash" size={25} color="#fff" />
        </TouchableOpacity>
    )

    return (
        <Swipeable renderRightActions={rightActions}>
            <View style={styles.container}>
                <Text style={styles.titulo}>{nota.titulo}</Text>
                <Text style={styles.descricao} numberOfLines={2}>{nota.descricao}</Text>
                <Text style={styles.data}>{formattedDate}</Text>
            </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 5,
        borderRadius: 8,
        elevation: 2
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 16
    },
    descricao: {
        fontSize: 14,
        color: '#555',
        marginVertical: 5
    },
    data: {
        fontSize: 12,
        color: '#888'
    },
    right: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        flex: 1
    }
})
