import { BookReviewFormType } from '@/components/_book/BookReviewForm'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Session } from 'next-auth'

interface WriteBookReviewParams {
  data: BookReviewFormType
  session: Session | null
}

const writeBookReview = async ({ data, session }: WriteBookReviewParams) => {
  if (!session || session.user.role !== 'admin')
    throw new Error('권한이 없습니다!')

  await fetch('/api/book', {
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

export default function useWriteBookReviewMutation() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ data, session }: WriteBookReviewParams) =>
      writeBookReview({ data, session }),
    onSuccess: () => {},
  })

  return { mutation }
}
