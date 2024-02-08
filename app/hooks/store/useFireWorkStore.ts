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

const useFireWorkStore = create<State & Actions>()((set) => ({
  isOpen: false,
  actions: {
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  },
}))

export const useFireWorkIsOpen = () => useFireWorkStore((state) => state.isOpen)
export const useFireWorkActions = () =>
  useFireWorkStore((state) => state.actions)
