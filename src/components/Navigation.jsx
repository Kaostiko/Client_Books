import React from 'react';
import {Image, Pressable, View, StyleSheet} from 'react-native';
import colores from '../utils/colores';

export const Navigation = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log('Home pressed')}>
        <Image source={require('../assets/libro.png')} style={styles.icon} />
      </Pressable>
      <Pressable onPress={() => console.log('AddBook pressed')}>
        <Image source={require('../assets/mas.png')} style={styles.icon} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
    tintColor: colores.accent,
  },
});
