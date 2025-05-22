import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { sendMessageToMom } from '../utils/api';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);

    const momReply = await sendMessageToMom(input);
    const aiMessage = { role: 'mom', content: momReply };

    setMessages((prev) => [...prev, aiMessage]);
    setInput('');
  };

  const renderItem = ({ item }) => (
    <View style={item.role === 'user' ? styles.userBubble : styles.momBubble}>
      <Text>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="輸入訊息..."
        />
        <Button title="送出" onPress={handleSend} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  chatContainer: { paddingBottom: 10 },
  inputContainer: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginRight: 8 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#dcf8c6', padding: 10, borderRadius: 6, marginVertical: 4 },
  momBubble: { alignSelf: 'flex-start', backgroundColor: '#f1f0f0', padding: 10, borderRadius: 6, marginVertical: 4 },
});
