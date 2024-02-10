import { BookReviewFormDataType } from '@/interfaces/interface'
import { useMutation } from '@tanstack/react-query'

interface EditBookReviewParams {
  data: BookReviewFormDataType
  bookId: string
}

const editBookReview = async ({ data, bookId }: EditBookReviewParams) => {
  await fetch('/api/book', {
    method: 'PUT',
    body: JSON.stringify({ data, bookId }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.error) {
        throw new Error(result.error)
      }
    })
}

export default function useEditBookReviewMutation() {
  const mutation = useMutation({
    mutationFn: ({ data, bookId }: EditBookReviewParams) =>
      editBookReview({ data, bookId }),
    onSuccess: () => {},
  })

  return { mutation }
}
