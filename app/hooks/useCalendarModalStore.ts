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

const useCalendarModalStore = create<State & Actions>()((set) => ({
  isOpen: false,
  actions: {
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  },
}))

export const useCalendarModalIsOpen = () =>
  useCalendarModalStore((state) => state.isOpen)
export const useCalendarModalActions = () =>
  useCalendarModalStore((state) => state.actions)
