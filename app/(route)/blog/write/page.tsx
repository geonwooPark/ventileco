'use client'

import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/app/components/common/Button'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage'
import EmptyState from '@/app/components/common/EmptyState'
import { ImagesType, OmittedPostingType } from '@/app/interfaces/interface'
import { storage } from '@/app/utils/firebase'
import WriteTopSection from '@/app/components/_blog/_write/WriteTopSection/WriteTopSection'

const EditorSection = dynamic(
  () => import('@/app/components/_blog/common/Editor/Editor'),
  {
    ssr: false,
    loading: () => <EmptyState label="에디터를 불러오고 있어요!" />,
  },
)

const thumbnailUpload = async (thumbnailFile: File | null) => {
  try {
    if (!thumbnailFile) return

    const imgRef = ref(
      storage,
      `ThumbnailImages/${Date.now()} - ${thumbnailFile.name}`,
    )
    const result = await uploadBytes(imgRef, thumbnailFile)
    const thumbnailURL = await getDownloadURL(ref(storage, result.ref.fullPath))
    return thumbnailURL
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message)
    }
  }
}

const deleteImage = async (uploadImages: ImagesType[], content: string) => {
  uploadImages.map(async (uploadImage) => {
    if (
      !content
        .replaceAll('amp;', '')
        .includes(uploadImage.imageURL.replace('amp;', ''))
    ) {
      await deleteObject(ref(storage, uploadImage.imagePath))
    }
  })
}

export default function Write() {
  const router = useRouter()

  const [posting, setPosting] = useState<OmittedPostingType>({
    category: '',
    title: '',
    description: '',
    thumbnailURL: '',
    content: '',
  })
  const { category, title, description, content } = posting
  const [isLoading, setisLoading] = useState(false)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [uploadImages, setUploadImages] = useState<ImagesType[]>([])

  const categoryRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const refs = {
    categoryRef,
    titleRef,
    descriptionRef,
  }

  const createPosting = async () => {
    setisLoading(true)

    const thumbnailURL = await thumbnailUpload(thumbnailFile)
    await deleteImage(uploadImages, content)

    try {
      if (!category) {
        categoryRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
        throw new Error('카테고리를 선택해주세요.')
      }
      if (!title) {
        titleRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
        throw new Error('제목을 입력해주세요.')
      }
      if (title.length > 40) {
        titleRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
        throw new Error('제목은 40자 이하로 입력해주세요.')
      }
      if (description.length > 90) {
        descriptionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
        throw new Error('설명은 90자 이하로 입력해주세요.')
      }

      await fetch('/api/posting', {
        method: 'POST',
        body: JSON.stringify({ ...posting, thumbnailURL }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            router.push(`/blog`)
            router.refresh()
            toast.success(result.message)
          } else {
            if (result.focus === 'category') {
              categoryRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              })
            }
            if (result.focus === 'title') {
              titleRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              })
            }
            if (result.focus === 'description') {
              descriptionRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              })
            }
            throw new Error(result.error)
          }
        })
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setisLoading(false)
    }
  }

  return (
    <main>
      <WriteTopSection
        posting={posting}
        setPosting={setPosting}
        setThumbnailFile={setThumbnailFile}
        refs={refs}
      />
      <EditorSection
        content={content}
        theme="snow"
        setPosting={setPosting}
        setUploadImages={setUploadImages}
      />
      <Button
        type="button"
        level="primary"
        size="l"
        label="등록하기"
        fullWidth={true}
        disabled={isLoading}
        onClick={createPosting}
      />
    </main>
  )
}
