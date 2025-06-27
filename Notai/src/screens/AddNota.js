import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native'

export default function AddNota({ navigation, route }) {
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')

    const pastaId = route.params?.pastaId || null

    const salvarNota = () => {
        if (!titulo.trim()) {
            Alert.alert('Erro', 'O título não pode estar vazio.')
            return
        }

        const novaNota = {
            id: Date.now(),
            titulo,
            descricao,
            data: new Date(),
            pastaId,  
        }
        if (route.params?.onGoBack) {
            route.params.onGoBack(novaNota)
        }
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Título</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o título"
                placeholderTextColor="#555"
                value={titulo}
                onChangeText={setTitulo}
            />

            <Text style={styles.label}>Descrição</Text>
            <TextInput
                style={styles.descricaoInput}
                placeholder="Digite a descrição"
                placeholderTextColor="#555"
                value={descricao}
                onChangeText={setDescricao}
                multiline
                textAlignVertical="top" 
            />

            <TouchableOpacity style={styles.botao} onPress={salvarNota}>
                <Text style={styles.textoBotao}>Salvar Nota</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0A0A',
        padding: 20,
    },
    label: {
        fontSize: 16,
        color: '#00ff88',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#00ff88',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#00ff88',
        marginBottom: 20,
    },
    descricaoInput: {
        flex: 1,               
        borderWidth: 1,
        borderColor: '#00ff88',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#00ff88',
        marginBottom: 20,
    },
    botao: {
        backgroundColor: '#00ff88',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
    },
    textoBotao: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
})
