import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>你永遠是媽媽心中的寶</Text>
      <Text style={styles.subtitle}>媽媽今天有什麼事幫得上忙嗎？</Text>

      <View style={styles.buttonContainer}> 
        <Button title="找媽媽聊聊" onPress={() => navigation.navigate('Chat')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="查看待辦提醒" onPress={() => navigation.navigate('Todo')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="看看天氣如何" onPress={() => navigation.navigate('Weather')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
});
