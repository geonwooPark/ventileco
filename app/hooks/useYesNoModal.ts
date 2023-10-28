import { create } from 'zustand'

interface YesNoModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useYesNoModal = create<YesNoModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useYesNoModal
