'use client'

import Button from '@/components/common/Button'
import EmptyState from '@/components/common/EmptyState'
import { BookReviewFormDataType, BookReviewType } from '@/interfaces/interface'
import dynamic from 'next/dynamic'
import React from 'react'
import BookTitleInput from '../_write/BookTitleInput'
import BookCategorySelector from '../_write/BookCategorySelector'
import BookRecommendationToggle from '../_write/BookRecommendationToggle'
import { toast } from 'react-toastify'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useEditBookReviewMutation from '@/hooks/mutation/useEditBookReviewMutation'

const BookReviewInput = dynamic(() => import('../_write/BookReviewInput'), {
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
    if (!session || session.user.role !== 'admin')
      throw new Error('권한이 없습니다!')
    editBookReviewMutation.mutate(
      { data, bookId: _id },
      {
        onSuccess: () => {
          reset()
          router.push(`/book/detail/${_id.toString()}`)
          toast.success('도서 수정 완료!')
        },
        onError: (error) => {
          toast.error(error.message)
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
      <BookReviewInput
        setValue={setValue}
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
