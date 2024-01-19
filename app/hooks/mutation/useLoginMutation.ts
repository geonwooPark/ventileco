import { useMutation } from '@tanstack/react-query'
import { signIn } from 'next-auth/react'

interface FormData {
  email: string
  password: string
}

const handleLogin = async (data: FormData) => {
  await signIn('credentials', {
    ...data,
    redirect: false,
  }).then((callback) => {
    if (callback?.error) {
      throw new Error(callback.error)
    }
  })
}

export default function useLoginMutation() {
  const mutation = useMutation({
    mutationFn: (data: FormData) => handleLogin(data),
  })

  return { mutation }
}
