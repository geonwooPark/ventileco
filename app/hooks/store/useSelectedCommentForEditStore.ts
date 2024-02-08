import { create } from 'zustand'

interface State {
  target: {
    commentId: string
    userId: string
    type: 'origin' | 'reply'
  }
}

interface Actions {
  actions: {
    onChange: (id: string, userId: string, type: 'origin' | 'reply') => void
    onReset: () => void
  }
}

const useSelectedCommentForEditStore = create<State & Actions>()((set) => ({
  target: {
    commentId: '',
    userId: '',
    type: 'origin',
  },
  actions: {
    onChange: (id, userId, type) =>
      set({ target: { commentId: id, userId, type } }),
    onReset: () =>
      set({
        target: {
          commentId: '',
          userId: '',
          type: 'origin',
        },
      }),
  },
}))

export const useSelectedCommentForEdit = () =>
  useSelectedCommentForEditStore((state) => state.target)
export const useSelectedCommentForEditActions = () =>
  useSelectedCommentForEditStore((state) => state.actions)
