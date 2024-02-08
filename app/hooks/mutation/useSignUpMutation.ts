import { useMutation } from '@tanstack/react-query'

interface FormData {
  email: string
  name: string
  password: string
}

const handleSignUp = async (data: FormData) => {
  await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.error) {
        throw new Error(result.error)
      }
    })
}

export default function useSignUpMutation() {
  const mutation = useMutation({
    mutationFn: (data: FormData) => handleSignUp(data),
  })

  return { mutation }
}
