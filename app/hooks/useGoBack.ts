import { useEffect } from 'react'
import { useModalActions } from './store/useModalStore'

export const useGoBack = (modal: {
  key: 'confirm-modal'
  component: React.ReactNode
}) => {
  const { addModal } = useModalActions()

  useEffect(() => {
    history.pushState(null, '', location.href)

    const browserPreventEvent = () => {
      history.pushState(null, '', location.href)
      addModal(modal)
    }

    window.addEventListener('popstate', browserPreventEvent)
    return () => {
      window.removeEventListener('popstate', browserPreventEvent)
    }
  }, [])
}
