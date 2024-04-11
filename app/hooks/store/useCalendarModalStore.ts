import { create } from 'zustand'

interface State {
  isOpen: boolean
}

interface Actions {
  actions: {
    handleModal: () => void
  }
}

const useCalendarModalStore = create<State & Actions>()((set) => ({
  isOpen: false,
  actions: {
    handleModal: () => set((state) => ({ isOpen: !state.isOpen })),
  },
}))

export const useIsCalendarModalOpen = () =>
  useCalendarModalStore((state) => state.isOpen)
export const useCalendarModalActions = () =>
  useCalendarModalStore((state) => state.actions)
