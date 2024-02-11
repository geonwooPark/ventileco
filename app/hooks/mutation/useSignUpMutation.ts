import { useMutation } from '@tanstack/react-query'

interface FormData {
  email: string
  name: string
  password: string
}

const handleSignUp = async (data: FormData) => {
  const result = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  if (!result.ok) {
    throw new Error('회원가입에 실패했습니다!')
  }
}

export default function useSignUpMutation() {
  const mutation = useMutation({
    mutationFn: (data: FormData) => handleSignUp(data),
  })

  return { mutation }
}
