import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import colores from '../utils/colores';
import ModalCustomizado from '../components/ModalCustomizado';
import BotonCustomizado from '../components/BotonCustomizado';

export const Home = () => {
  const [books, setBooks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleOpenModal = book => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    setModalVisible(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://192.168.1.120:4000/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    }
  };

  const handleDelete = async bookId => {
    try {
      await axios.delete(`http://192.168.1.120:4000/books/${bookId}`);
      setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
      Alert.alert('Éxito', 'Libro eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el libro:', error);
      Alert.alert('Error', 'Hubo un error al eliminar el libro');
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleOpenModal(item)}>
      <Text style={styles.title}>{item.titulo}</Text>
      <Text style={styles.author}>{item.autor}</Text>
      <Text style={styles.style}>{item.estilo}</Text>
      <Text style={styles.synopsis}>{item.sinopsis}</Text>
      <BotonCustomizado
        onPress={() => handleDelete(item.id)}
        title="Eliminar"
        customBackgroundColor={colores.delete}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <ModalCustomizado
        visible={modalVisible}
        onClose={handleCloseModal}
        book={selectedBook}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    marginBottom: 5,
  },
  style: {
    fontSize: 16,
    marginBottom: 5,
  },
  synopsis: {
    fontSize: 16,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.primary,
    padding: 40,
  },
  texModalTitulo: {
    color: colores.textPrimary,
    fontSize: 40,
    textAlign: 'center',
  },
  texModal: {
    color: colores.textPrimary,
    paddingBottom: 50,
    fontSize: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
