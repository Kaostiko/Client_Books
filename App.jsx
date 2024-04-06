import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, StatusBar, Text, View} from 'react-native';
import {Navigation} from './src/components/Navigation';
import colores from './src/utils/colores';
import {Home} from './src/screen/Home';
import {AddBook} from './src/screen/AddBook';

export default function App() {
  const [showScreenA, setShowScreenA] = useState(true);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar />
      <View style={styles.container}>
        {/* <Text style={styles.text}>HOLA</Text> */}
        {showScreenA ? <Home /> : <AddBook />}
      </View>
      <Navigation setShowScreenA={setShowScreenA} showScreenA={showScreenA} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colores.primary,
  },
  container: {
    flex: 1,
  },
  text: {
    color: colores.textPrimary,
  },
});
