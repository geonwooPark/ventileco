'use client'

import Button from '@/components/common/Button'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { SubmitHandler, useForm } from 'react-hook-form'
import ImageSelector from '@hot-place/CreateForm/ImageSelector'
import CategorySelector from '@/components/_hot-place/CreateForm/CategorySelector'
import RatingStar from '@/components/_hot-place/CreateForm/RatingStar'
import AddressResearch from '@/components/_hot-place/CreateForm/AddressResearch'
import StoreInput from '@/components/_hot-place/CreateForm/StoreInput'
import AddressInput from '@/components/_hot-place/CreateForm/AddressInput'
import DescriptionInput from '@/components/_hot-place/CreateForm/DescriptionInput'
import useCreateHotPlace from '@/hooks/mutation/useCreateHotPlace'
import { toast } from 'react-toastify'

export interface FormData {
  images: File[]
  store: string
  category: string
  rating: number
  address: string
  coordinate: {
    latitude: number
    longitude: number
  }
  description: string
}

export default function CreateModal() {
  const router = useRouter()
  const [showAddressResearch, setShowAddressResearch] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>()
  const { address } = getValues()
  const { mutation } = useCreateHotPlace()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        reset()
        router.back()
        toast.success('맛집 등록 완료!')
      },
    })
  }

  const categoryRegister = register('category', {
    required: '카테고리가 선택되지 않았습니다.',
  })
  const storeRegister = register('store', {
    required: '점포명이 입력되지 않았습니다.',
  })
  const addressRegister = register('address', {
    required: '주소가 입력되지 않았습니다.',
  })
  const descriptionRegister = register('description')
  const ratingRegister = register('rating', {
    required: '별점을 정해지지 않았습니다.',
  })

  return (
    <div className="fixed left-0 top-0 z-[100] flex h-full w-full items-center bg-black/30">
      <div className="mx-auto h-full w-full bg-white md:h-[auto] md:w-[500px]">
        <div className="flex justify-between p-4">
          <div className="text-lg font-semibold">맛집 등록</div>
          <button onClick={() => router.back()}>
            <AiOutlineClose size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-4">
            <ImageSelector setValue={setValue} />
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
                address={address}
              />
            </div>
            {showAddressResearch && (
              <AddressResearch
                setShowAddressResearch={setShowAddressResearch}
                setValue={setValue}
              />
            )}
            <DescriptionInput descriptionRegister={descriptionRegister} />
            <RatingStar
              ratingRegister={ratingRegister}
              errorMessage={errors.rating?.message}
            />
          </div>

          <div className="p-4">
            <div className="flex justify-center gap-2">
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
          </div>
        </form>
      </div>
    </div>
  )
}
