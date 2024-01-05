import { GPTChat } from '@/interfaces/interface'
import { create } from 'zustand'

interface State {
  chatLog: GPTChat[]
}

interface Actions {
  actions: {
    onClear: () => void
    onAdd: (chat: GPTChat) => void
  }
}

const useChatLogStore = create<State & Actions>()((set) => ({
  chatLog: [
    {
      id: 0,
      content: '반가워요🙂 내 이름은 피터에요. 혹시 질문 있나요?',
      sender: 'gpt',
    },
    {
      id: 1,
      content: '저는 토큰 문제로 이전 대화를 기억하진 못해요. 참고해주세요!',
      sender: 'gpt',
    },
  ],
  actions: {
    onClear: () => set({ chatLog: [] }),
    onAdd: (chat: GPTChat) =>
      set((state) => ({
        chatLog: [...state.chatLog, chat],
      })),
  },
}))

export const useChatLog = () => useChatLogStore((state) => state.chatLog)
export const useChatLogActions = () => useChatLogStore((state) => state.actions)
