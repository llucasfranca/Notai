import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native'
import { Swipeable, RectButton } from 'react-native-gesture-handler'

const { width } = Dimensions.get('window')
const itemWidth = (width - 48) / 2

export default function Home({ navigation, route }) {
  const [notas, setNotas] = useState([])
  const [pastas, setPastas] = useState([])

  useEffect(() => {
    if (route.params?.novaPasta) {
      setPastas((prev) => [...prev, route.params.novaPasta])
      navigation.setParams({ novaPasta: undefined })
    }
    if (route.params?.novaNota) {
      setNotas((prev) => [...prev, route.params.novaNota])
      navigation.setParams({ novaNota: undefined })
    }
  }, [route.params])

  const handleDeleteNota = (id) => {
    Alert.alert('Excluir nota', 'Deseja excluir esta nota?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => setNotas((prev) => prev.filter((n) => n.id !== id)),
      },
    ])
  }

  const handleDeletePasta = (id) => {
    Alert.alert('Excluir pasta', 'Deseja excluir esta pasta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => setPastas((prev) => prev.filter((p) => p.id !== id)),
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
        renderRightActions(progress, dragX, () => handleDeleteNota(item.id))
      }
    >
      <TouchableOpacity
        style={[styles.notaContainer, { backgroundColor: '#222' }]}
        onPress={() =>
          navigation.navigate('EditNota', { nota: item, pastas })
        }
      >
        <Text style={styles.tituloNota} numberOfLines={1}>
          {item.titulo}
        </Text>
        <Text style={styles.descricaoNota} numberOfLines={3}>
          {item.descricao}
        </Text>
      </TouchableOpacity>
    </Swipeable>
  )

  const renderPasta = ({ item }) => (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, () => handleDeletePasta(item.id))
      }
    >
      <TouchableOpacity
        style={[styles.pastaContainer, { borderColor: item.cor }]}
        onPress={() =>
          navigation.navigate('PastaDetalhe', {
            pasta: item,
            onGoBack: (novaNota) => {
              if (novaNota) setNotas((prev) => [...prev, novaNota])
            },
          })
        }
      >
        <Text style={styles.nomePasta}>{item.nome}</Text>
      </TouchableOpacity>
    </Swipeable>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Minhas Pastas</Text>

      <FlatList
        data={pastas}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={styles.listaPastas}
        renderItem={renderPasta}
        ListEmptyComponent={
          <Text style={styles.vazioTexto}>Nenhuma pasta criada.</Text>
        }
      />

      <TouchableOpacity
        style={styles.botaoNovaPasta}
        onPress={() =>
          navigation.navigate('NovaPasta', {
            onGoBack: (novaPasta) => setPastas((prev) => [...prev, novaPasta]),
          })
        }
      >
        <Text style={styles.textoBotaoNovaPasta}>+ Nova Pasta</Text>
      </TouchableOpacity>

      <Text style={[styles.titulo, { marginTop: 20 }]}>Minhas Notas</Text>

      <FlatList
        data={notas}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listaNotas}
        renderItem={renderNota}
        ListEmptyComponent={
          <View style={styles.vazioContainer}>
            <Text style={styles.vazioTexto}>Nenhuma nota ainda.</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          navigation.navigate('Nova Nota', {
            pastas,
            onGoBack: (novaNota) => setNotas((prev) => [...prev, novaNota]),
          })
        }
      >
        <Text style={styles.fabTexto}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  listaPastas: {
    paddingVertical: 10,
  },
  pastaContainer: {
    borderWidth: 2,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  nomePasta: {
    color: '#00ff88',
    fontSize: 16,
  },
  botaoNovaPasta: {
    backgroundColor: '#00ff88',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginBottom: 10,
  },
  textoBotaoNovaPasta: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listaNotas: {
    paddingBottom: 100,
  },
  notaContainer: {
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
