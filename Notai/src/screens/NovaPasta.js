import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native'

const coresContorno = [
  '#4CAF50', // verde
  '#2196F3', // azul
  '#FF9800', // laranja
  '#9C27B0', // roxo
  '#00ff88', // verde neon
]

export default function NovaPasta({ navigation, route }) {
  const [nome, setNome] = useState('')
  const [corSelecionada, setCorSelecionada] = useState(coresContorno[0])

  const salvarPasta = () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'O nome da pasta não pode estar vazio.')
      return
    }

    const novaPasta = {
      id: Date.now().toString(),
      nome,
      cor: corSelecionada,
    }
    if (route.params?.onGoBack) {
      route.params.onGoBack(novaPasta)
    }
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nova Pasta</Text>

      <Text style={styles.label}>Nome da Pasta</Text>
      <TextInput
        style={[styles.input, { borderColor: corSelecionada }]}
        placeholder="Digite o nome da pasta"
        placeholderTextColor="#555"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={[styles.label, { marginTop: 20 }]}>Cor do contorno</Text>
      <View style={styles.coresContainer}>
        {coresContorno.map((cor) => (
          <TouchableOpacity
            key={cor}
            style={[
              styles.corCircle,
              { borderColor: cor },
              corSelecionada === cor && styles.corSelecionada,
            ]}
            onPress={() => setCorSelecionada(cor)}
          />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.botaoSalvar, { backgroundColor: corSelecionada }]}
        onPress={salvarPasta}
      >
        <Text style={styles.textoBotaoSalvar}>Salvar Pasta</Text>
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
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00ff88',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#00ff88',
    marginBottom: 10,
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#00ff88',
  },
  coresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  corCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    marginHorizontal: 5,
  },
  corSelecionada: {
    backgroundColor: '#00ff88',
  },
  botaoSalvar: {
    marginTop: 40,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  textoBotaoSalvar: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
})
