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

const useLoginModalStore = create<State & Actions>()((set) => ({
  isOpen: false,
  actions: {
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  },
}))

export const useLoginModalIsOpen = () =>
  useLoginModalStore((state) => state.isOpen)
export const useLoginModalActions = () =>
  useLoginModalStore((state) => state.actions)
