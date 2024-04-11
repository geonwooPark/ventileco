import { create } from 'zustand'

interface State {
  isOpen: boolean
}

interface Actions {
  actions: {
    handleModal: () => void
  }
}

const useConfirmModalDisplayStore = create<State & Actions>()((set) => ({
  isOpen: false,
  actions: {
    handleModal: () => set((state) => ({ isOpen: !state.isOpen })),
  },
}))

export const useConfirmModalDisplay = () =>
  useConfirmModalDisplayStore((state) => state.isOpen)
export const useConfirmModalDisplayActions = () =>
  useConfirmModalDisplayStore((state) => state.actions)
