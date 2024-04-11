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

const useSignUpModalStore = create<State & Actions>()((set) => ({
  isOpen: false,
  actions: {
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  },
}))

export const useIsSignUpModalOpen = () =>
  useSignUpModalStore((state) => state.isOpen)
export const useSignUpModalActions = () =>
  useSignUpModalStore((state) => state.actions)
