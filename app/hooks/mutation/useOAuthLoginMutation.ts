import { OAuthType } from '@/interfaces/interface'
import { useMutation } from '@tanstack/react-query'
import { signIn } from 'next-auth/react'

const handleOAuthLogin = async (oauth: OAuthType) => {
  await signIn(oauth).then((callback) => {
    if (callback?.error) {
      throw new Error(callback.error)
    }
  })
}

export default function useOAuthLoginMutation() {
  const mutation = useMutation({
    mutationFn: (oauth: OAuthType) => handleOAuthLogin(oauth),
  })

  return { mutation }
}
