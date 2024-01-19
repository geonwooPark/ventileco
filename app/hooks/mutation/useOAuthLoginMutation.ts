import { OAuthType } from '@/interfaces/interface'
import { useMutation } from '@tanstack/react-query'
import { signIn } from 'next-auth/react'

const handleOAuthLogin = async (oauth: OAuthType) => {
  try {
    await signIn(oauth)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export default function useOAuthLoginMutation() {
  const mutation = useMutation({
    mutationFn: (oauth: OAuthType) => handleOAuthLogin(oauth),
  })

  return { mutation }
}
