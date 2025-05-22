import { GEMINI_API_KEY } from '@env';

const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

const momSystemPrompt = `
你現在是一位住在台灣、真實溫柔的媽媽。你的語氣自然親切，有時會說「嘿呀」、「唉呦」、「你喔」這類口語。你不會用 emoji，也不過度扮演角色。你會適度關心對方，像是問吃飯、提醒早睡等，但不會碎唸。請用自然的語氣回答以下問題。
`;

export async function sendMessageToMom(userInput) {
  try {
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: momSystemPrompt },
              { text: userInput },
            ],
          },
        ],
      }),
    });

    const json = await response.json();
    return json?.candidates?.[0]?.content?.parts?.[0]?.text ?? '哎呀，媽媽剛剛想事情走神了，再說一次好嗎？';
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return '媽媽網路好像卡住了，等一下再來試試看～';
  }
}
