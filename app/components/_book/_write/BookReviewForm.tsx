'use client'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import BookTitleInput from './BookTitleInput'
import BookRecommendationToggle from './BookRecommendationToggle'
import Button from '../../common/Button'
import dynamic from 'next/dynamic'
import EmptyState from '../../common/EmptyState'
import BookCategorySelector from './BookCategorySelector'
import useWriteBookReviewMutation from '@/hooks/mutation/useWriteBookReviewMutation'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { BookReviewFormDataType } from '@/interfaces/interface'
import { useGoBack } from '@/hooks/useGoBack'
import ConfirmModal from '@/components/common/Modal/ConfirmModal'
import { useModalActions } from '@/hooks/store/useModalStore'

const BookReviewEditor = dynamic(() => import('./BookReviewEditor'), {
  ssr: false,
  loading: () => (
    <EmptyState
      label="에디터를 불러오고 있어요!"
      className="!h-[500px] rounded-md border"
    />
  ),
})

export default function BookReviewForm() {
  const router = useRouter()
  const { addModal } = useModalActions()
  const { data: session } = useSession()
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<BookReviewFormDataType>({
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

  const onSubmit: SubmitHandler<BookReviewFormDataType> = async (data) => {
    if (!session || session.user.role !== 'admin') return

    writeBookReviewMutation.mutate(
      { data },
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

  useGoBack(() => {
    addModal({
      key: 'confirm-modal',
      component: (
        <ConfirmModal
          title="Cancel"
          bodyContent={
            <p className="text-beige-light">리뷰 작성을 그만하시겠습니까?</p>
          }
          onSubmit={() => router.push('/book')}
          actionLabel="그만하기"
          secondaryActionLabel="취소"
        />
      ),
    })
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
        label="등록하기"
        onClick={handleSubmit(onSubmit)}
        disabled={writeBookReviewMutation.isPending}
      />
    </form>
  )
}
