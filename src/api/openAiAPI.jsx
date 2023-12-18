const OPENAI_API_KEY = 'aaaa';
const URL = 'https://api.openai.com/v1/chat/completions';

export async function OpenAiDialog(conversation) {
  try {
    const messages = conversation;
    const requestBody = {
      model: "gpt-3.5-turbo",
      messages,
    };

    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`error ${response.status} with OpenAI`);
    }

    const completion = await response.json();
    return completion.choices[0].message.content;
  } catch (error) {
    throw error;
  }
}

