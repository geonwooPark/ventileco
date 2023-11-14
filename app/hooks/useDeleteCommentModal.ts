import { create } from 'zustand'

interface DeleteCommentModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useDeleteCommentModal = create<DeleteCommentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useDeleteCommentModal
