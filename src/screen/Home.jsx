import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  ImageBackground,
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

  const handleDelete = bookId => {
    console.log(bookId, 'BOOK ID');
    axios
      .delete(`http://192.168.1.120:4000/books/${bookId}`)
      .then(response => {
        setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
        Alert.alert('Éxito', 'Libro eliminado correctamente');
      })
      .catch(error => {
        console.error('Error al eliminar el libro:', error);
        Alert.alert('Error', 'Hubo un error al eliminar el libro');
      });
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleOpenModal(item)}>
      <View>
        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.textNoTitle}>{item.autor}</Text>
        <Text style={styles.textNoTitle}>{item.estilo}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <BotonCustomizado
          onPress={() => handleDelete(item.id)}
          title="Modificar"
          customBackgroundColor={colores.accent}
        />
        <BotonCustomizado
          onPress={() => handleDelete(item.id)}
          title="Eliminar"
          customBackgroundColor={colores.delete}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../assets/books.jpg')}
      style={styles.backgroundImage}>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    // backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  itemContainer: {
    marginBottom: 20,
    backgroundColor: colores.primary,
    opacity: 0.9,
    borderWidth: 1,
    borderColor: colores.accent,
    borderRadius: 18,
    padding: 18,
  },
  title: {
    fontSize: 18,
    color: colores.textPrimary,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  textNoTitle: {
    fontSize: 14,
    color: colores.textPrimary,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
