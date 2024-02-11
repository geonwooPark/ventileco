'use client'

import Button from '@/components/common/Button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import ImageSelector from '@hot-place/CreateModal/CreateForm/ImageSelector'
import CategorySelector from '@/components/_hot-place/CreateModal/CreateForm/CategorySelector'
import RatingStar from '@/components/_hot-place/CreateModal/CreateForm/RatingStar'
import StoreInput from '@/components/_hot-place/CreateModal/CreateForm/StoreInput'
import DescriptionInput from '@/components/_hot-place/CreateModal/CreateForm/DescriptionInput'
import useCreateHotPlaceMutation from '@/hooks/mutation/useCreateHotPlaceMutation'
import { toast } from 'react-toastify'
import { HotPlaceFormDataType } from '@/interfaces/interface'
import HashtagInput from './CreateForm/HashtagInput'
import { useSession } from 'next-auth/react'

export default function CreateModalBody() {
  const router = useRouter()
  const { data: session } = useSession()
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
  const { mutation: createHotPlaceMutation } = useCreateHotPlaceMutation()

  const onSubmit: SubmitHandler<HotPlaceFormDataType> = async (data) => {
    if (!session) return

    createHotPlaceMutation.mutate(
      { data },
      {
        onSuccess: () => {
          reset()
          router.back()
          toast.success('스토어 등록 완료!')
        },
        onError: (error) => {
          toast.error(error.message)
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
          disabled={createHotPlaceMutation.isPending}
        />
      </div>
    </form>
  )
}
