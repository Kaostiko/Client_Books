import React from 'react';
import {Image, Pressable, View, StyleSheet} from 'react-native';
import colores from '../utils/colores';

export const Navigation = ({setShowScreenA}) => {
  const cambioPantallaAdd = () => {
    setShowScreenA(true);
  };
  const cambioPantallaHome = () => {
    setShowScreenA(false);
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={cambioPantallaAdd}>
        <Image source={require('../assets/libro.png')} style={styles.icon} />
      </Pressable>
      <Pressable onPress={cambioPantallaHome}>
        <Image source={require('../assets/mas.png')} style={styles.icon} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: colores.accent,
  },
});
