import React from 'react';
import {Modal, View, Text, StyleSheet} from 'react-native';
import colores from '../utils/colores';
import BotonCustomizado from './BotonCustomizado';

const ModalCustomizado = ({visible, onClose, book}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        {book && (
          <View>
            <Text style={styles.texModalTitulo}>{book.titulo}</Text>
            <Text style={styles.texModal}>{book.autor}</Text>
            <Text style={styles.texModal}>{book.estilo}</Text>
            <Text style={styles.texModal}>{book.sinopsis}</Text>
            <BotonCustomizado
              onPress={onClose}
              title="Cerrar"
              customBackgroundColor={colores.accent}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 55,
  },
  texModal: {
    color: colores.textPrimary,
    paddingBottom: 50,
    fontSize: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default ModalCustomizado;
