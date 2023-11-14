import { create } from 'zustand'

interface SelectedCommentStore {
  commentId: string
  onChange: (id: string) => void
}

const useSelectedComment = create<SelectedCommentStore>((set) => ({
  commentId: '',
  onChange: (id) => set({ commentId: id }),
}))

export default useSelectedComment
