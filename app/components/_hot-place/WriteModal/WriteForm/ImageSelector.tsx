import React, { useEffect, useState } from 'react'
import {
  UseFormClearErrors,
  UseFormRegisterReturn,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form'
import ErrorMessage from '../../../common/ErrorMessage'
import { HotPlaceFormDataType } from '@/interfaces/interface'
import { IconClose, IconPlus } from '../../../../../public/svgs/icons'

interface ImageSelectorProps {
  setValue: UseFormSetValue<HotPlaceFormDataType>
  setError: UseFormSetError<HotPlaceFormDataType>
  clearErrors: UseFormClearErrors<HotPlaceFormDataType>
  imagesRegister: UseFormRegisterReturn<'images'>
  errorMessage?: string
}

export default function ImageSelector({
  setValue,
  setError,
  clearErrors,
  imagesRegister,
  errorMessage,
}: ImageSelectorProps) {
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [images, setImages] = useState<File[]>([])

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!files) {
      return
    }

    if (previewImages.length + files.length > 9) {
      return setError('images', {
        message: '이미지는 최대 9개까지 첨부 가능합니다.',
      })
    }
    setImages((prev) => [...prev, ...files])

    for (const file of files) {
      const reader = new FileReader()
      reader.onload = () => {
        const { result } = reader
        if (typeof result === 'string') {
          setPreviewImages((prev) => [...prev, result])
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const onImageDelete = (i: number) => {
    setPreviewImages((prev) => {
      const copy = [...prev]
      copy.splice(i, 1)
      return copy
    })
    setImages((prev) => {
      const copy = [...prev]
      copy.splice(i, 1)
      return copy
    })
  }

  useEffect(() => {
    setValue('images', images)
    clearErrors('images')
  }, [images])

  return (
    <div className="mb-2">
      <div className="relative mb-1">
        <div className="absolute left-0 top-0 z-10 pt-2.5">
          <label
            htmlFor="input-file"
            className="flex h-[70px] w-[70px] cursor-pointer items-center justify-center rounded bg-beige-light text-brown-dark"
          >
            <div className="size-5">
              <IconPlus />
            </div>
          </label>
        </div>
        <input
          {...imagesRegister}
          type="file"
          id="input-file"
          accept=".jpg, .png, .jpeg"
          multiple
          className="hidden"
          onChange={onFileChange}
        />
        <div
          className={`hide-scroll flex gap-4 overflow-x-scroll pt-2.5 ${
            images.length < 5 ? 'hide-scroll' : ''
          }`}
        >
          <div className="invisible">
            <div className="h-[70px] w-[70px] rounded-md" />
          </div>
          {previewImages.map((previewImage, i) => (
            <div key={i}>
              <div className="relative w-[70px]">
                <img
                  src={previewImage}
                  alt="preview-image"
                  className="h-[70px] w-[70px] rounded-md border border-beige-normal object-cover"
                />
                <button
                  type="button"
                  onClick={() => onImageDelete(i)}
                  className="absolute -right-2 -top-2 size-5 rounded-3xl bg-beige-light p-1 text-brown-dark"
                >
                  <IconClose />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  )
}
