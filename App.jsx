import React from 'react';
import {StyleSheet, SafeAreaView, StatusBar, Text, View} from 'react-native';
import {Navigation} from './src/components/Navigation';

export default function App() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar />
      <View style={styles.container}>
        <Text style={styles.text}>HOLA</Text>
      </View>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#151E21',
    /* backgroundColor: '#7DDFEE',
    backgroundColor: '#00C8E0', */
  },
  container: {
    flex: 1,
  },
  text: {
    color: '#fff',
  },
});
