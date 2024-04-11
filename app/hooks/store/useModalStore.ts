import { create } from 'zustand'

interface Modal {
  key:
    | 'login-modal'
    | 'signup-modal'
    | 'confirm-modal'
    | 'calendar-modal'
    | 'addListItem-modal'
  component: React.ReactNode
}

interface State {
  isOpen: boolean
  modals: Modal[]
}

interface Actions {
  actions: {
    addModal: (modal: Modal) => void
    removeModal: (id: string) => void
    clearModal: () => void
  }
}

const useModalStore = create<State & Actions>()((set) => ({
  isOpen: false,
  modals: [],
  actions: {
    addModal: (modal) => {
      set((state) => {
        if (!state.isOpen) {
          return { isOpen: true }
        } else return { isOpen: true }
      })
      set((state) => ({ modals: [...state.modals, modal] }))
    },
    removeModal: (key) => {
      set((state) => {
        if (state.modals.length === 1) {
          return { isOpen: false }
        } else return { isOpen: true }
      })
      set((state) => ({
        modals: state.modals.filter((r) => r.key !== key),
      }))
    },
    clearModal: () => set(() => ({ modals: [] })),
  },
}))

export const useIsModalOpen = () => useModalStore((state) => state.isOpen)
export const useModals = () => useModalStore((state) => state.modals)
export const useModalActions = () => useModalStore((state) => state.actions)
