import { create } from 'zustand'

interface State {
  isOpen: boolean
}

interface Actions {
  actions: {
    onOpen: () => void
    onClose: () => void
  }
}

const useDeleteCommentModalStore = create<State & Actions>()((set) => ({
  isOpen: false,
  actions: {
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  },
}))

export const useDeleteCommentModalIsOpen = () =>
  useDeleteCommentModalStore((state) => state.isOpen)
export const useDeleteCommentModalActions = () =>
  useDeleteCommentModalStore((state) => state.actions)
