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

const useDeletePostingModalStore = create<State & Actions>()((set) => ({
  isOpen: false,
  actions: {
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  },
}))

export const useDeletePostingModalIsOpen = () =>
  useDeletePostingModalStore((state) => state.isOpen)
export const useDeletePostingModalActions = () =>
  useDeletePostingModalStore((state) => state.actions)
