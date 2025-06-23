import React, { useState } from 'react'
import { View, FlatList, StyleSheet, SafeAreaView, Button } from 'react-native'
import NotaItem from '../components/NotaItem'

export default function Home({ navigation }) {
    const [notas, setNotas] = useState([])

    const handleAddNota = (novaNota) => {
        setNotas([...notas, novaNota])
    }

    return (
        <SafeAreaView style={styles.container}>
            <Button
                title="Adicionar Nota"
                onPress={() => navigation.navigate('Nova Nota', { onSave: handleAddNota })}
            />

            <FlatList
                data={notas}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <NotaItem nota={item} onDelete={id => {
                        setNotas(notas.filter(n => n.id !== id))
                    }} />
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0'
    }
})
