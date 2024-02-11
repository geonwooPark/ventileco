import { BookReviewFormDataType } from '@/interfaces/interface'
import { useMutation } from '@tanstack/react-query'

interface EditBookReviewParams {
  data: BookReviewFormDataType
  bookId: string
}

const editBookReview = async ({ data, bookId }: EditBookReviewParams) => {
  const result = await fetch('/api/book', {
    method: 'PUT',
    body: JSON.stringify({ data, bookId }),
  })
  if (!result.ok) throw new Error('리뷰 수정에 실패했습니다!')
}

export default function useEditBookReviewMutation() {
  const mutation = useMutation({
    mutationFn: ({ data, bookId }: EditBookReviewParams) =>
      editBookReview({ data, bookId }),
    onSuccess: () => {},
  })

  return { mutation }
}
