import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import axios from 'axios';
import colores from '../utils/colores';

const initialValue = {
  titulo: '',
  autor: '',
  estilo: '',
  sinopsis: '',
};

export const ModalEditarLibro = ({visible, onClose, bookData, fetchBooks}) => {
  const [editedBook, setEditedBook] = useState(bookData);
  // console.log('EDIT DEL LIBRO', editedBook.id);
  // console.log('BOOK ID ', book?.id);
  // console.log('BOOKDATA EDIT', bookData);
  useEffect(() => {
    if (bookData) {
      setEditedBook(bookData);
    }
  }, [bookData]);
  /* console.log('Dentro MODAL: ', bookData);
  console.log('EStado dentro MODAL: ', editedBook); */
  /* const fetchBookDetails = async bookId => {
    try {
      // console.log('BOOK ID :', bookId);
      const response = await axios.get(
        `http://192.168.1.120:4000/books/${bookId}`,
      );
      setEditedBook(response.data);
    } catch (error) {
      console.error('Error al obtener los detalles del libro:', error);
      // Puedes manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario.
    }
  };

  useEffect(() => {
    if (visible && bookId) {
      fetchBookDetails(bookId);
    }
  }, [visible, bookId]); */
  /* console.log(book, 'BOOK');

  console.log(editedBook, 'Edit'); */

  const handleChange = (name, value) => {
    setEditedBook({...editedBook, [name]: value});
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://192.168.1.120:4000/books/${editedBook.id}`,
        editedBook,
      );
      Alert.alert('Éxito', 'Libro actualizado correctamente');
      onClose();
      fetchBooks;
    } catch (error) {
      console.error('Error al actualizar el libro:', error);
      Alert.alert('Error', 'Hubo un error al actualizar el libro');
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      animationType="slide">
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={editedBook?.titulo}
          onChangeText={text => handleChange('titulo', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Autor"
          value={editedBook?.autor}
          onChangeText={text => handleChange('autor', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Estilo"
          value={editedBook?.estilo}
          onChangeText={text => handleChange('estilo', text)}
        />
        <TextInput
          style={[styles.input, {height: 150}]}
          placeholder="Sinopsis"
          value={editedBook?.sinopsis}
          onChangeText={text => handleChange('sinopsis', text)}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Actualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.primary,
    padding: 40,
  },
  input: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    width: '80%',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
