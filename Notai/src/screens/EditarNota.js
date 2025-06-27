import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'

export default function EditNota({ navigation, route }) {
  const notaOriginal = route.params?.nota
  const pastas = route.params?.pastas || []

  const [titulo, setTitulo] = useState(notaOriginal?.titulo || '')
  const [descricao, setDescricao] = useState(notaOriginal?.descricao || '')
  const [pastaId, setPastaId] = useState(notaOriginal?.pastaId || '')

  const salvarEdicao = () => {
    if (!titulo.trim()) {
      Alert.alert('Erro', 'O título não pode estar vazio.')
      return
    }

    const notaEditada = {
      ...notaOriginal,
      titulo,
      descricao,
      pastaId,
      data: new Date(),
    }

    if (pastaId) {
      const pastaSelecionada = pastas.find((p) => p.id === pastaId)
      navigation.replace('PastaDetalhe', {
        pasta: pastaSelecionada,
        notas: [notaEditada], 
      })
    } else {
      navigation.replace('Notas', { notaEditada })
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Digite o título"
            placeholderTextColor="#555"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Pasta</Text>
          <View
            style={[
              styles.pickerContainer,
              Platform.OS === 'android' && {
                borderWidth: 1,
                borderColor: '#00ff88',
                borderRadius: 8,
              },
            ]}
          >
            <Picker
              selectedValue={pastaId}
              onValueChange={setPastaId}
              style={
                Platform.OS === 'ios'
                  ? { color: '#00ff88', fontSize: 16 }
                  : { color: '#00ff88' }
              }
              dropdownIconColor="#00ff88"
            >
              <Picker.Item label="Nenhuma" value="" />
              {pastas.map((pasta) => (
                <Picker.Item key={pasta.id} label={pasta.nome} value={pasta.id} />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.descricaoContainer}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.descricaoInput}
          value={descricao}
          onChangeText={setDescricao}
          multiline
          placeholder="Digite a descrição"
          placeholderTextColor="#555"
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity style={styles.botao} onPress={salvarEdicao}>
        <Text style={styles.textoBotao}>Salvar Alterações</Text>
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputGroup: {
    flex: 1,
    marginRight: 10,
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
    marginBottom: 0,
  },
  pickerContainer: {
    backgroundColor: '#121212',
  },
  descricaoContainer: {
    flex: 1,
    marginTop: 20,
  },
  descricaoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#00ff88',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#00ff88',
    textAlignVertical: 'top',
  },
  botao: {
    backgroundColor: '#00ff88',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotao: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
})
