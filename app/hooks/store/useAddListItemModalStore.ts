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

const useAddListItemModalStore = create<State & Actions>()((set) => ({
  isOpen: false,
  actions: {
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  },
}))

export const useAddListItemModalIsOpen = () =>
  useAddListItemModalStore((state) => state.isOpen)
export const useAddListItemModalActions = () =>
  useAddListItemModalStore((state) => state.actions)
