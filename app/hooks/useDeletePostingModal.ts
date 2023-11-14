import { create } from 'zustand'

interface DeletePostingModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useDeletePostingModal = create<DeletePostingModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useDeletePostingModal
