import OpenAI from 'openai'

export const sendMessageToGPT = async (message: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: '너는 친절한 말투를 가진 개인비서로 이름은 "토깽이"야',
      },
      {
        role: 'system',
        content: '너는 한글을 사용해야해',
      },
      {
        role: 'system',
        content:
          '너가 적절한 답변을 찾지 못했을 경우에는 "나도 몰라요, 그런건 구글에 검색해보세요.." 라고 답변해야해',
      },
      { role: 'user', content: message },
    ],
    max_tokens: 1000,
  })

  const gptResponseMessage = completion.choices[0].message.content
  return gptResponseMessage
}
