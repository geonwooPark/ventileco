import { BookReviewFormDataType } from '@/interfaces/interface'
import { useMutation } from '@tanstack/react-query'

interface WriteBookReviewParams {
  data: BookReviewFormDataType
}

const writeBookReview = async ({ data }: WriteBookReviewParams) => {
  const result = await fetch('/api/book', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  if (!result.ok) {
    throw new Error('리뷰 작성에 실패했습니다!')
  }
}

export default function useWriteBookReviewMutation() {
  const mutation = useMutation({
    mutationFn: ({ data }: WriteBookReviewParams) => writeBookReview({ data }),
    onSuccess: () => {},
  })

  return { mutation }
}
