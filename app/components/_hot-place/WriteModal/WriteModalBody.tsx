'use client'

import Button from '@/components/common/Button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { HotPlaceFormDataType } from '@/interfaces/interface'
import { useSession } from 'next-auth/react'
import HashtagInput from './WriteForm/HashtagInput'
import ImageSelector from './WriteForm/ImageSelector'
import CategorySelector from './WriteForm/CategorySelector'
import StoreInput from './WriteForm/StoreInput'
import DescriptionInput from './WriteForm/DescriptionInput'
import RatingStar from './WriteForm/RatingStar'
import useWriteHotPlaceMutation from '@/hooks/mutation/useWriteHotPlaceMutation'
import { useAlert } from '@/hooks/useAlert'

export default function WriteModalBody() {
  const router = useRouter()
  const { data: session } = useSession()
  const alert = useAlert()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<HotPlaceFormDataType>({
    defaultValues: {
      images: [],
      store: '',
      category: '',
      rating: 0,
      address: '',
      hashtags: [],
      coordinate: {
        latitude: 0,
        longitude: 0,
      },
      description: '',
    },
  })
  const { mutation: writeHotPlaceMutation } = useWriteHotPlaceMutation()

  const onSubmit: SubmitHandler<HotPlaceFormDataType> = async (data) => {
    if (!session) return

    writeHotPlaceMutation.mutate(
      { data },
      {
        onSuccess: () => {
          reset()
          router.back()
          alert.success('스토어 등록 완료!')
        },
        onError: (error) => {
          alert.error(error.message)
        },
      },
    )
  }

  const imagesRegister = register('images', {
    validate: () => {
      const { images } = getValues()
      return images.length !== 0 || '이미지가 입력되지 않았습니다.'
    },
  })
  const categoryRegister = register('category', {
    required: '카테고리가 선택되지 않았습니다.',
  })
  const storeRegister = register('store', {
    required: '스토어명이 입력되지 않았습니다.',
  })
  const descriptionRegister = register('description', {
    required: '후기가 입력되지 않았습니다.',
  })
  const ratingRegister = register('rating', {
    required: '별점을 정해지지 않았습니다.',
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4">
        <ImageSelector
          setValue={setValue}
          setError={setError}
          clearErrors={clearErrors}
          imagesRegister={imagesRegister}
          errorMessage={errors.images?.message}
        />
        <CategorySelector
          categoryRegister={categoryRegister}
          errorMessage={errors.category?.message}
        />
        <StoreInput
          storeRegister={storeRegister}
          setValue={setValue}
          clearErrors={clearErrors}
          errorMessage={errors.store?.message}
        />
        <DescriptionInput
          descriptionRegister={descriptionRegister}
          errorMessage={errors.description?.message}
        />
        <HashtagInput
          setValue={setValue}
          setError={setError}
          clearErrors={clearErrors}
          errorMessage={errors.hashtags?.message}
        />
        <RatingStar
          ratingRegister={ratingRegister}
          errorMessage={errors.rating?.message}
        />
      </div>

      <div className="p-4">
        <Button
          type="submit"
          level="primary"
          size="s"
          fullWidth={true}
          label="등록하기"
          onClick={handleSubmit(onSubmit)}
          disabled={writeHotPlaceMutation.isPending}
        />
      </div>
    </form>
  )
}
