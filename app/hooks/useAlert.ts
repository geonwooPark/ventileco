import { useAlertActions } from './store/useAlertStore'

export const useAlert = () => {
  const { addAlert } = useAlertActions()

  return {
    success: addAlert('success'),
    info: addAlert('info'),
    error: addAlert('error'),
  }
}
