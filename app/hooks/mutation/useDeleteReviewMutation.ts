import { useMutation, useQueryClient } from '@tanstack/react-query'

interface deleteReviewParams {
  bookId: string
}

const deleteStore = async ({ bookId }: deleteReviewParams) => {
  const result = await fetch('/api/book', {
    method: 'DELETE',
    body: JSON.stringify(bookId),
  })
  if (!result.ok) {
    throw new Error('리뷰 제거에 실패했습니다.')
  }
}

export default function useDeleteReviewMutation() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ bookId }: deleteReviewParams) => deleteStore({ bookId }),
    onSuccess: () => {},
  })

  return { mutation }
}
