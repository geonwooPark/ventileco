import { create } from 'zustand'

interface State {
  commentId: string
}

interface Actions {
  actions: {
    onChange: (id: string) => void
  }
}

const useSelectedCommentForEditStore = create<State & Actions>()((set) => ({
  commentId: '',
  actions: {
    onChange: (id) => set({ commentId: id }),
  },
}))

export const useSelectedCommentIdForEdit = () =>
  useSelectedCommentForEditStore((state) => state.commentId)
export const useSelectedCommentForEditActions = () =>
  useSelectedCommentForEditStore((state) => state.actions)
