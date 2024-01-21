'use client'

import Button from '@/components/common/Button'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import CategorySelector from '@/components/_hot-place/CreateModal/CreateForm/CategorySelector'
import RatingStar from '@/components/_hot-place/CreateModal/CreateForm/RatingStar'
import AddressResearch from '@/components/_hot-place/CreateModal/CreateForm/AddressResearch'
import StoreInput from '@/components/_hot-place/CreateModal/CreateForm/StoreInput'
import AddressInput from '@/components/_hot-place/CreateModal/CreateForm/AddressInput'
import DescriptionInput from '@/components/_hot-place/CreateModal/CreateForm/DescriptionInput'
import { toast } from 'react-toastify'
import {
  HotPlaceFormDataType,
  HotPlaceListingType,
  ImageType,
  UserType,
} from '@/interfaces/interface'
import { useSession } from 'next-auth/react'
import HashtagInput from '../CreateModal/CreateForm/HashtagInput'
import ImageEditor from './EditForm/ImageEditor'
import useEditHotPlaceMutation from '@/hooks/mutation/useEditHotPlaceMutation'

interface EditModalBodyProps {
  listing: {
    store: HotPlaceListingType | null
    user: UserType | null
  }
}

export default function EditModalBody({ listing }: EditModalBodyProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const { store } = listing
  if (!store) return
  const {
    _id: storeId,
    creator,
    store: storeName,
    category,
    address,
    description,
    hashtags,
    rating,
    images,
    coordinate,
  } = store

  const [prevImagesArray, setPrevImagesArray] = useState(images ?? [])
  const [deletedImagesArray, setDeletedImagesArray] = useState<ImageType[]>([])
  const [showAddressResearch, setShowAddressResearch] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<HotPlaceFormDataType>({
    defaultValues: {
      images: [],
      store: storeName,
      category,
      rating,
      address,
      hashtags,
      coordinate,
      description,
    },
  })
  const { mutation: editHotPlaceMutation } = useEditHotPlaceMutation()

  const onSubmit: SubmitHandler<HotPlaceFormDataType> = async (data) => {
    editHotPlaceMutation.mutate(
      {
        data,
        session,
        deletedImagesArray,
        storeId,
        creator,
        prevImagesArray,
      },
      {
        onSuccess: () => {
          reset()
          router.back()
          toast.success('스토어 수정 완료!')
        },
        onError: (error) => {
          toast.error(error.message)
        },
      },
    )
  }

  const imagesRegister = register('images')
  const categoryRegister = register('category', {
    required: '카테고리가 선택되지 않았습니다.',
  })
  const storeRegister = register('store', {
    required: '스토어명이 입력되지 않았습니다.',
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
        <ImageEditor
          setValue={setValue}
          setError={setError}
          clearErrors={clearErrors}
          imagesRegister={imagesRegister}
          errorMessage={errors.images?.message}
          prevImagesArray={prevImagesArray}
          setPrevImagesArray={setPrevImagesArray}
          setDeletedImagesArray={setDeletedImagesArray}
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
        <HashtagInput
          setValue={setValue}
          setError={setError}
          clearErrors={clearErrors}
          errorMessage={errors.hashtags?.message}
          prevHashtags={hashtags}
        />
        <RatingStar
          ratingRegister={ratingRegister}
          rating={rating}
          errorMessage={errors.rating?.message}
        />
      </div>

      <div className="p-4">
        <Button
          type="submit"
          level="primary"
          size="s"
          fullWidth={true}
          label="수정하기"
          onClick={() => handleSubmit(onSubmit)}
          disabled={editHotPlaceMutation.isPending}
        />
      </div>
    </form>
  )
}
