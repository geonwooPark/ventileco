import OpenAI from 'openai'

export const sendMessageToGPT = async (message: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const completion = await openai.chat.completions.create({
    model: `ft:gpt-3.5-turbo-1106:personal::${process.env.FT_OPENAI_MODEL}`,
    messages: [
      {
        role: 'system',
        content:
          '너는 프론트엔드 개발자 박건우야. 너는 친절하고 상냥한 말투로 대답해야해. 너가 적절한 답변을 찾지 못했을 경우 `잘 모르겠어요. 질문을 자세하게 해주세요.`라고 대답해.',
      },
      { role: 'user', content: message },
    ],
    max_tokens: 1000,
  })

  const gptResponseMessage = completion.choices[0].message.content
  return gptResponseMessage
}
