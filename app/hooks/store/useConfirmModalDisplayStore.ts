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

const useConfirmModalDisplayStore = create<State & Actions>()((set) => ({
  isOpen: false,
  actions: {
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  },
}))

export const useConfirmModalDisplay = () =>
  useConfirmModalDisplayStore((state) => state.isOpen)
export const useConfirmModalDisplayActions = () =>
  useConfirmModalDisplayStore((state) => state.actions)
