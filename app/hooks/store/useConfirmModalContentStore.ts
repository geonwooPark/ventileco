import { create } from 'zustand'

interface DataType {
  title: string
  description: string
  action: any
  actionLabel: string
  isLoading?: boolean
}

interface State {
  data: DataType
}

interface Actions {
  actions: {
    onChange: ({
      title,
      description,
      action,
      actionLabel,
      isLoading,
    }: DataType) => void
    onReset: () => void
  }
}

const useConfirmModalContentStore = create<State & Actions>()((set) => ({
  data: {
    title: '',
    description: '',
    action: null,
    actionLabel: '',
    isLoading: false,
  },
  actions: {
    onChange: ({
      title,
      description,
      action,
      actionLabel,
      isLoading,
    }: DataType) =>
      set({
        data: {
          title,
          description,
          action,
          actionLabel,
          isLoading,
        },
      }),
    onReset: () =>
      set({
        data: {
          title: '',
          description: '',
          action: null,
          actionLabel: '',
          isLoading: false,
        },
      }),
  },
}))

export const useConfirmModalContent = () =>
  useConfirmModalContentStore((state) => state.data)
export const useConfirmModalContentActions = () =>
  useConfirmModalContentStore((state) => state.actions)
