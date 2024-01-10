'use client'

import Button from '@/components/common/Button'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import ImageSelector from '@hot-place/CreateModal/CreateForm/ImageSelector'
import CategorySelector from '@/components/_hot-place/CreateModal/CreateForm/CategorySelector'
import RatingStar from '@/components/_hot-place/CreateModal/CreateForm/RatingStar'
import AddressResearch from '@/components/_hot-place/CreateModal/CreateForm/AddressResearch'
import StoreInput from '@/components/_hot-place/CreateModal/CreateForm/StoreInput'
import AddressInput from '@/components/_hot-place/CreateModal/CreateForm/AddressInput'
import DescriptionInput from '@/components/_hot-place/CreateModal/CreateForm/DescriptionInput'
import useCreateHotPlace from '@/hooks/mutation/useCreateHotPlace'
import { toast } from 'react-toastify'
import { HotPlaceFormData } from '@/interfaces/interface'

export default function CreateModalBody() {
  const router = useRouter()
  const [showAddressResearch, setShowAddressResearch] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<HotPlaceFormData>({
    defaultValues: {
      images: [],
      store: '',
      category: '',
      rating: 0,
      address: '',
      coordinate: {
        latitude: 0,
        longitude: 0,
      },
      description: '',
    },
  })
  const { mutation } = useCreateHotPlace()

  const onSubmit: SubmitHandler<HotPlaceFormData> = async (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        reset()
        router.back()
        toast.success('맛집 등록 완료!')
      },
    })
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
    required: '점포명이 입력되지 않았습니다.',
  })
  const addressRegister = register('address', {
    required: '주소가 입력되지 않았습니다.',
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
        <div className="flex gap-2">
          <StoreInput
            storeRegister={storeRegister}
            errorMessage={errors.store?.message}
          />
          <AddressInput
            addressRegister={addressRegister}
            errorMessage={errors.address?.message}
            setShowAddressResearch={setShowAddressResearch}
          />
        </div>
        {showAddressResearch && (
          <AddressResearch
            setValue={setValue}
            clearErrors={clearErrors}
            setShowAddressResearch={setShowAddressResearch}
          />
        )}
        <DescriptionInput
          descriptionRegister={descriptionRegister}
          errorMessage={errors.description?.message}
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
          onClick={() => handleSubmit(onSubmit)}
          disabled={mutation.isPending}
        />
      </div>
    </form>
  )
}
