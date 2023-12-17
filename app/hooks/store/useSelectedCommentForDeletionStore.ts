import { create } from 'zustand'

interface State {
  commentId: string
}

interface Actions {
  actions: {
    onChange: (id: string) => void
    onReset: () => void
  }
}

const useSelectedCommentForDeletionStore = create<State & Actions>()((set) => ({
  commentId: '',
  actions: {
    onChange: (id) => set({ commentId: id }),
    onReset: () => set({ commentId: '' }),
  },
}))

export const useSelectedCommentIdForDeletion = () =>
  useSelectedCommentForDeletionStore((state) => state.commentId)
export const useSelectedCommentForDeletionActions = () =>
  useSelectedCommentForDeletionStore((state) => state.actions)
