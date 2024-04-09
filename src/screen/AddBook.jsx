import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import colores from '../utils/colores';
import BotonCustomizado from '../components/BotonCustomizado';

export const AddBook = () => {
  const initialValues = {
    titulo: '',
    autor: '',
    estilo: '',
    sinopsis: '',
  };

  const [book, setBook] = useState(initialValues);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      if (!book.titulo || !book.autor || !book.estilo || !book.sinopsis) {
        setError('Faltan campos obligatorios');
        return;
      }
      setError('');
      // Envía la solicitud al servidor para crear un nuevo libro
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/books`,
        book,
      );
      // Muestra un mensaje de éxito
      Alert.alert('Éxito', 'Libro creado correctamente');

      // Limpiar los campos después de la creación exitosa
      setBook(initialValues);
    } catch (error) {
      console.error('Error al crear el libro:', error);
      Alert.alert('Error', 'Hubo un error al crear el libro');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/books.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Añadir Libro</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Título"
          placeholderTextColor={colores.textPrimary}
          value={book.titulo}
          onChangeText={text => setBook({...book, titulo: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Autor"
          placeholderTextColor={colores.textPrimary}
          value={book.autor}
          onChangeText={text => setBook({...book, autor: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Estilo"
          placeholderTextColor={colores.textPrimary}
          value={book.estilo}
          onChangeText={text => setBook({...book, estilo: text})}
        />
        <TextInput
          style={[styles.input, {height: 150}]}
          placeholder="Sinopsis"
          placeholderTextColor={colores.textPrimary}
          value={book.sinopsis}
          onChangeText={text => setBook({...book, sinopsis: text})}
          multiline
        />
        <BotonCustomizado
          onPress={handleSubmit}
          title="Guardar"
          customBackgroundColor={colores.accent}
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
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: colores.textPrimary,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: colores.accent,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: colores.primary,
    opacity: 0.7,
    color: 'white',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 18,
  },
});
