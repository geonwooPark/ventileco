import { create } from 'zustand'

interface State {
  isOpen: boolean
}

interface Actions {
  actions: {
    handleModal: () => void
  }
}

const useAddListItemModalStore = create<State & Actions>()((set) => ({
  isOpen: false,
  actions: {
    handleModal: () => set((state) => ({ isOpen: !state.isOpen })),
  },
}))

export const useIsAddListItemModalOpen = () =>
  useAddListItemModalStore((state) => state.isOpen)
export const useAddListItemModalActions = () =>
  useAddListItemModalStore((state) => state.actions)
