import { create } from 'zustand'
import { v4 as uuid } from 'uuid'
import { ToastType } from '@/interfaces/interface'

interface AlertType {
  type: ToastType
  id: string
  message: string
}

interface State {
  alerts: AlertType[]
}

interface Actions {
  actions: {
    addAlert: (type: ToastType) => (message: string, duration?: number) => void
    removeAlert: (id: string) => void
  }
}

const useAlertStore = create<State & Actions>()((set) => ({
  alerts: [],
  actions: {
    addAlert:
      (type: ToastType) =>
      (message: string, duration: number = 4000) => {
        const id = uuid()
        set((state) => ({
          alerts: [...state.alerts, { type, id, message }],
        }))

        setTimeout(() => {
          set((state) => ({
            alerts: state.alerts.filter((r) => r.id !== id),
          }))
        }, duration)
      },
    removeAlert: (id: string) => {
      set((state) => ({
        alerts: state.alerts.filter((r) => r.id !== id),
      }))
    },
  },
}))

export const useAlerts = () => useAlertStore((state) => state.alerts)
export const useAlertActions = () => useAlertStore((state) => state.actions)
