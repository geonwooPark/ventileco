import { create } from 'zustand'
import { v4 as uuid } from 'uuid'

interface ModalType {
  id: string
  component: React.ReactNode
}

interface State {
  isOpen: boolean
  modals: ModalType[]
}

interface Actions {
  actions: {
    addModal: (modal: React.ReactNode) => void
    removeModal: () => void
    clearModal: () => void
  }
}

const useModalStore = create<State & Actions>()((set) => ({
  isOpen: false,
  modals: [],
  actions: {
    addModal: (modal: React.ReactNode) => {
      set((state) => {
        if (!state.isOpen) {
          return { isOpen: true }
        } else return { isOpen: true }
      })
      set((state) => ({
        modals: [...state.modals, { id: uuid(), component: modal }],
      }))
    },
    removeModal: () => {
      set((state) => {
        if (state.modals.length === 1) {
          return { isOpen: false }
        } else return { isOpen: true }
      })
      set((state) => ({
        modals: state.modals.slice(0, -1),
      }))
    },
    clearModal: () => set(() => ({ modals: [] })),
  },
}))

export const useIsModalOpen = () => useModalStore((state) => state.isOpen)
export const useModals = () => useModalStore((state) => state.modals)
export const useModalActions = () => useModalStore((state) => state.actions)
