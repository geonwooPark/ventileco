'use client'

import Button from '@/components/common/Button'
import EmptyState from '@/components/common/EmptyState'
import { BookReviewFormDataType, BookReviewType } from '@/interfaces/interface'
import dynamic from 'next/dynamic'
import React from 'react'
import BookTitleInput from '../_write/BookTitleInput'
import BookCategorySelector from '../_write/BookCategorySelector'
import BookRecommendationToggle from '../_write/BookRecommendationToggle'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useEditBookReviewMutation from '@/hooks/mutation/useEditBookReviewMutation'
import { useGoBack } from '@/hooks/useGoBack'
import { useModalActions } from '@/hooks/store/useModalStore'
import ConfirmModal from '@/components/common/Modals/ConfirmModal'
import { useAlert } from '@/hooks/useAlert'

const BookReviewEditor = dynamic(() => import('../_write/BookReviewEditor'), {
  ssr: false,
  loading: () => (
    <EmptyState
      label="에디터를 불러오고 있어요!"
      className="!h-[500px] rounded-md border"
    />
  ),
})

interface BookReviewEditFormProps {
  review: BookReviewType
}

export default function BookReviewEditForm({
  review,
}: BookReviewEditFormProps) {
  const router = useRouter()
  const alert = useAlert()
  const { addModal } = useModalActions()
  const { data: session } = useSession()
  const {
    _id,
    recommended,
    title,
    description,
    authors,
    thumbnail,
    content: prevContent,
    category,
  } = review
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<BookReviewFormDataType>({
    defaultValues: {
      recommended,
      title,
      description,
      authors,
      thumbnail,
      content: prevContent,
      category,
    },
  })
  const content = getValues('content')
  const { mutation: editBookReviewMutation } = useEditBookReviewMutation()

  const onSubmit: SubmitHandler<BookReviewFormDataType> = async (data) => {
    if (!session || session.user.role !== 'admin') return

    editBookReviewMutation.mutate(
      { data, bookId: _id },
      {
        onSuccess: () => {
          reset()
          router.push(`/book/detail/${_id.toString()}`)
          alert.success('리뷰 수정 완료!')
        },
        onError: (error) => {
          alert.error(error.message)
        },
      },
    )
  }

  const recommendedRegister = register('recommended')
  const categoryRegister = register('category', {
    required: '카테고리를 선택해주세요.',
  })
  const titleRegister = register('title', {
    required: '제목을 입력해주세요.',
  })
  const contentRegister = register('content', {
    required: '후기를 입력해주세요.',
  })

  useGoBack(() => {
    addModal(
      <ConfirmModal
        title="Cancel"
        description="리뷰 수정을 그만하시겠습니까?"
        onSubmit={() => router.push(`/book/detail/${_id}`)}
        actionLabel="그만하기"
      />,
    )
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BookRecommendationToggle
        recommendedRegister={recommendedRegister}
        recommended={recommended}
      />
      <BookCategorySelector
        categoryRegister={categoryRegister}
        errorMessage={errors.category?.message}
      />
      <BookTitleInput
        titleRegister={titleRegister}
        setValue={setValue}
        clearErrors={clearErrors}
        errorMessage={errors.title?.message}
      />
      <BookReviewEditor
        setValue={setValue}
        theme="bubble"
        content={content}
        errorMessage={errors.content?.message}
      />
      <Button
        type="submit"
        level="primary"
        size="s"
        fullWidth={true}
        label="수정하기"
        onClick={handleSubmit(onSubmit)}
        disabled={editBookReviewMutation.isPending}
      />
    </form>
  )
}
