import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import colores from '../utils/colores';

const BotonCustomizado = ({onPress, title, customBackgroundColor}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor: customBackgroundColor || colores.accent},
      ]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    height: 30,
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  buttonText: {
    color: colores.textPrimary,
    fontSize: 18,
  },
});

export default BotonCustomizado;
