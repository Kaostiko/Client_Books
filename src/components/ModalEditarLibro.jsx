import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Alert, Modal, TextInput} from 'react-native';
import axios from 'axios';
import colores from '../utils/colores';
import BotonCustomizado from './BotonCustomizado';

export const ModalEditarLibro = ({visible, onClose, bookData, fetchBooks}) => {
  const [editedBook, setEditedBook] = useState(bookData);

  useEffect(() => {
    if (bookData) {
      setEditedBook(bookData);
    }
  }, [bookData]);

  const handleChange = (name, value) => {
    setEditedBook({...editedBook, [name]: value});
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${process.env.EXPO_PUBLIC_API_URL}/books/${editedBook.id}`,
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
        <BotonCustomizado
          onPress={handleUpdate}
          title="Actualizar"
          customBackgroundColor={colores.accent}
        />
        <BotonCustomizado
          onPress={onClose}
          title="Cancelar"
          customBackgroundColor={colores.delete}
        />
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
});
