'use client'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import BookTitleInput from './BookTitleInput'
import BookRecommendationToggle from './BookRecommendationToggle'
import Button from '../common/Button'
import dynamic from 'next/dynamic'
import EmptyState from '../common/EmptyState'
import BookCategorySelector from './BookCategorySelector'
import useWriteBookReviewMutation from '@/hooks/mutation/useWriteBookReviewMutation'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const BookReviewInput = dynamic(() => import('./BookReviewInput'), {
  ssr: false,
  loading: () => (
    <EmptyState
      label="에디터를 불러오고 있어요!"
      className="!h-[500px] rounded-md border"
    />
  ),
})

export interface BookReviewFormType {
  recommended: boolean
  title: string
  description: string
  authors: string[]
  thumbnail: string
  content: string
  category: string
}

export default function BookReviewForm() {
  const router = useRouter()
  const { data: session } = useSession()
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<BookReviewFormType>({
    defaultValues: {
      recommended: false,
      title: '',
      description: '',
      authors: [],
      thumbnail: '',
      content: '',
      category: '',
    },
  })
  const content = getValues('content')
  const { mutation: writeBookReviewMutation } = useWriteBookReviewMutation()

  const onSubmit: SubmitHandler<BookReviewFormType> = async (data) => {
    writeBookReviewMutation.mutate(
      { data, session },
      {
        onSuccess: () => {
          reset()
          router.push('/book')
          toast.success('도서 등록 완료!')
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
      <BookRecommendationToggle recommendedRegister={recommendedRegister} />
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
        label="등록하기"
        onClick={handleSubmit(onSubmit)}
        disabled={writeBookReviewMutation.isPending}
      />
    </form>
  )
}
