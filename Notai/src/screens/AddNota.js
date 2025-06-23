import React, { useState } from 'react'
import {
    View, Text, TextInput, StyleSheet, Button, Alert
} from 'react-native'

export default function AddNota({ navigation, route }) {
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')

    const salvarNota = () => {
        if (!titulo.trim()) {
            Alert.alert('Erro', 'O título não pode estar vazio.')
            return
        }

        const novaNota = {
            id: Date.now(), 
            titulo,
            descricao,
            data: new Date()
        }

        route.params?.onSave?.(novaNota) 
        navigation.goBack() 
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Título</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o título"
                value={titulo}
                onChangeText={setTitulo}
            />

            <Text style={styles.label}>Descrição</Text>
            <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Digite a descrição"
                value={descricao}
                onChangeText={setDescricao}
                multiline
            />

            <Button title="Salvar Nota" onPress={salvarNota} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1
    },
    label: {
        fontSize: 16,
        marginBottom: 5
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20
    }
})
