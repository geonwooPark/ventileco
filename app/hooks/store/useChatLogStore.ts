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
    {
      id: 2,
      content:
        '현재 답변이 불완전하여 모델에 대한 파인 튜닝을 계속 진행하고 있답니다..',
      sender: 'gpt',
    },
    {
      id: 3,
      content:
        'Vercel 무료 버전으로 배포해서 10초 이상으로 답변이 길어지면 에러가 발생할 수 있어요ㅜㅜ ',
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
