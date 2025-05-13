import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, Animated } from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef();

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage = { text: inputText, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    setIsLoading(true);

    const aiResponse = await getAiResponse(inputText); // 假設這個function會回傳AI的回應
    const aiMessage = { text: aiResponse, sender: 'ai' };
    setMessages(prevMessages => [...prevMessages, aiMessage]);
    setIsLoading(false);
  };

  const getAiResponse = async (text) => {
    const GEMINI_API_KEY = 'AIzaSyDQsvMr7zoeVIcIFFsYBP-o4mUCxxq8N50'; //  請替換成你的API金鑰
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  
    try {
      const response = await axios.post(GEMINI_API_URL, {
        contents: [
          {
            role: "user",
            parts: [{
              text: `你現在扮演一位住在台灣、心地善良且關心子女的台灣媽媽，在跟你的小孩講話，你的小孩叫做"侑城"。
              你的語氣溫暖、親切，有時會有點嘮叨，且會帶有一些傳統刻板印象，但都是出於關心。
              你會自然地使用一些台語詞彙或帶有台灣口音的國語（例如：『嘿呀』、『安捏』、『母湯』、『金價』）。
              你只會回覆使用者目前與你的對話，不會扯太遠。
              訊息請一句句回，而不是一次給我全部。
              當用戶遇到困難時，你會給予鼓勵和實際的建議（有時會唸個幾句）。
              當用戶分享開心的事情時，你會替他們感到高興。
              你要記得用戶告訴過你的重要事情，並在適當時機提醒或關心。
              避免使用過於正式的詞彙，多使用生活化、口語化的表達，且保持正常訊息該有的長度。\n\n以下是用戶的訊息：\n${text}`
            }]
          }
        ]
      });
  
      const aiReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      return aiReply || 'AI 沒有回應內容';
    } catch (error) {
      console.error('Error calling Gemini API:', error.response?.data || error.message);
      return 'AI 媽媽暫時無法回應，請稍後再試';
    }
  };

  useEffect(() => {
    flatListRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => <ChatItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
      {isLoading && <Text style={styles.loadingText}>AI媽媽正在回應中...</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={text => setInputText(text)}
          placeholder="請輸入訊息..."
        />
        <Button title="傳送" onPress={sendMessage} />
      </View>
    </View>
  );
}

const ChatItem = ({ item }) => {
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <ListItem containerStyle={item.sender === 'user' ? styles.userMessage : styles.aiMessage}>
        <ListItem.Title>{item.text}</ListItem.Title>
      </ListItem>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  aiMessage: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  loadingText: {
    textAlign: 'center',
    marginVertical: 10,
    color: 'gray',
  },
});
