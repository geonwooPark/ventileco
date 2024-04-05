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
      content: '프론트엔드 개발자 박건우나 프로젝트에 대해 질문해보세요!',
      sender: 'gpt',
    },
    {
      id: 1,
      content: '예)블로그 프로젝트에 대해 알려줘',
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
