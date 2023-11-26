import { create } from 'zustand'

interface State {
  isOpen: boolean
}

interface Actions {
  onOpen: () => void
  onClose: () => void
}

const useSignUpModal = create<State & Actions>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useSignUpModal