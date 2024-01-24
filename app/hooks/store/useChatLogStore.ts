import { GPTChatType } from '@/interfaces/interface'
import { create } from 'zustand'

interface State {
  chatLog: GPTChatType[]
}

interface Actions {
  actions: {
    onClear: () => void
    onAdd: (chat: GPTChatType) => void
  }
}

const useChatLogStore = create<State & Actions>()((set) => ({
  chatLog: [
    {
      id: 0,
      content: '저는 토큰 문제로 이전 대화를 기억하진 못해요. 참고해주세요!',
      sender: 'gpt',
    },
    {
      id: 1,
      content:
        'Vercel 무료 버전으로 배포해서 10초 이상으로 답변이 길어지면 에러나요ㅜㅜ ',
      sender: 'gpt',
    },
  ],
  actions: {
    onClear: () => set({ chatLog: [] }),
    onAdd: (chat: GPTChatType) =>
      set((state) => ({
        chatLog: [...state.chatLog, chat],
      })),
  },
}))

export const useChatLog = () => useChatLogStore((state) => state.chatLog)
export const useChatLogActions = () => useChatLogStore((state) => state.actions)
