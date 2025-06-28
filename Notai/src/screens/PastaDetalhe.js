import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native'
import { Swipeable, RectButton } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width } = Dimensions.get('window')
const itemWidth = (width - 48) / 2

export default function PastaDetalhe({ navigation, route }) {
  const { pasta } = route.params || {}
  const [notas, setNotas] = useState([])

  // Carrega as notas da pasta
  const carregarNotas = async () => {
    try {
      const dados = await AsyncStorage.getItem(`notas_${pasta.id}`)
      if (dados) {
        setNotas(JSON.parse(dados))
      }
    } catch (e) {
      console.error('Erro ao carregar notas:', e)
    }
  }

  // Salva as notas da pasta
  const salvarNotas = async (notasParaSalvar) => {
    try {
      await AsyncStorage.setItem(`notas_${pasta.id}`, JSON.stringify(notasParaSalvar))
    } catch (e) {
      console.error('Erro ao salvar notas:', e)
    }
  }

  useEffect(() => {
    carregarNotas()
  }, [])

  useEffect(() => {
    if (route.params?.notaEditada) {
      const notasAtualizadas = notas.map((nota) =>
        nota.id === route.params.notaEditada.id
          ? route.params.notaEditada
          : nota
      )
      setNotas(notasAtualizadas)
      salvarNotas(notasAtualizadas)
      navigation.setParams({ notaEditada: null })
    }

    if (route.params?.novaNota) {
      const novaLista = [...notas, route.params.novaNota]
      setNotas(novaLista)
      salvarNotas(novaLista)
      navigation.setParams({ novaNota: null })
    }
  }, [route.params])

  const handleDeleteNota = (id) => {
    Alert.alert('Excluir nota', 'Deseja excluir esta nota?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          const atualizadas = notas.filter((n) => n.id !== id)
          setNotas(atualizadas)
          salvarNotas(atualizadas)
        }
      },
    ])
  }

  const renderRightActions = (progress, dragX, onDelete) => (
    <RectButton style={styles.rightAction} onPress={onDelete}>
      <Text style={styles.actionText}>Excluir</Text>
    </RectButton>
  )

  const renderNota = ({ item }) => (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, () => handleDeleteNota(item.id))}>
      <TouchableOpacity
        style={styles.notaContainer}
        onPress={() =>
          navigation.navigate('EditNota', { nota: item, pastaId: pasta?.id })}>
        <Text style={styles.tituloNota}>{item.titulo}</Text>
        <Text style={styles.descricaoNota}>{item.descricao}</Text>
      </TouchableOpacity>
    </Swipeable>
  )

  if (!pasta) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#00ff88', fontSize: 18 }}>
          Pasta não encontrada.
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{pasta.nome}</Text>

      <FlatList
        data={notas}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listaNotas}
        renderItem={renderNota}
        ListEmptyComponent={
          <View style={styles.vazioContainer}>
            <Text style={styles.vazioTexto}>Nenhuma nota nesta pasta.</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          navigation.navigate('Nova Nota', {
            pastaId: pasta.id
          })
        }}
      >
        <Text style={styles.fabTexto}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00ff88',
    textAlign: 'center',
    marginVertical: 12,
  },
  listaNotas: {
    paddingBottom: 100,
  },
  notaContainer: {
    backgroundColor: '#222',
    width: itemWidth,
    minHeight: 120,
    borderRadius: 20,
    margin: 8,
    padding: 15,
    elevation: 4,
  },
  tituloNota: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00ff88',
    marginBottom: 6,
  },
  descricaoNota: {
    fontSize: 14,
    color: '#ddd',
  },
  vazioContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  vazioTexto: {
    color: '#666',
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#00ff88',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabTexto: {
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold',
  },
  rightAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 20,
    marginVertical: 8,
    marginRight: 8,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})
