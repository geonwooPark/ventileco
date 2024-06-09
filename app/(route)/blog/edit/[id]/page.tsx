'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Button from '@/components/common/Button'
import dynamic from 'next/dynamic'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage'
import EmptyState from '@common/EmptyState'
import { ImageType, OmittedPostingType } from '@/interfaces/interface'
import { storage } from '@/lib/firebase'
import EditTopSection from '@blog/_edit/EditTopSection/EditTopSection'
import Main from '@common/Main'
import Section from '@/components/common/Section'
import { useGoBack } from '@/hooks/useGoBack'
import { useModalActions } from '@/hooks/store/useModalStore'
import ConfirmModal from '@/components/common/Modals/ConfirmModal'
import { useAlert } from '@/hooks/useAlert'

const Editor = dynamic(() => import('@blog/common/Editor/Editor'), {
  ssr: false,
  loading: () => <EmptyState label="에디터를 불러오고 있어요!" />,
})

const thumbnailUpload = async (thumbnailFile: File | null) => {
  if (!thumbnailFile) return

  const imgRef = ref(
    storage,
    `ThumbnailImages/${Date.now()} - ${thumbnailFile.name}`,
  )
  const result = await uploadBytes(imgRef, thumbnailFile)
  const thumbnailURL = await getDownloadURL(ref(storage, result.ref.fullPath))
  return thumbnailURL
}

const deleteImage = async (uploadImages: ImageType[], content: string) => {
  uploadImages.map(async (uploadImage) => {
    if (
      !content
        .replaceAll('amp;', '')
        .includes(uploadImage.url.replace('amp;', ''))
    ) {
      await deleteObject(ref(storage, uploadImage.path))
    }
  })
}

export default function Edit() {
  const router = useRouter()
  const { id: postingId } = useParams()
  const { addModal } = useModalActions()
  const alert = useAlert()

  const [posting, setPosting] = useState<OmittedPostingType>({
    category: '',
    title: '',
    description: '',
    thumbnailURL: '',
    content: '',
  })
  const { category, title, description, content } = posting
  const [fetchLoading, setFetchLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [uploadImages, setUploadImages] = useState<ImageType[]>([])

  const categoryRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const refs = {
    categoryRef,
    titleRef,
    descriptionRef,
  }

  useGoBack(() => {
    addModal(
      <ConfirmModal
        title="Cancel"
        description="글 수정을 그만하시겠습니까?"
        onSubmit={() => router.push(`/blog/detail/${postingId}`)}
        actionLabel="그만하기"
      />,
    )
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(`/api/blog/posting?postingId=${postingId}`, {
          method: 'GET',
        })
          .then((res) => res.json())
          .then((result) => {
            setPosting(result)
          })
      } catch (error) {
        if (error instanceof Error) {
          alert.error(error.message)
        }
      } finally {
        setFetchLoading(false)
      }
    }
    fetchData()
  }, [postingId])

  const editPosting = async () => {
    setIsLoading(true)

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

      await fetch('/api/blog/posting', {
        method: 'PUT',
        body: JSON.stringify({ ...posting, thumbnailURL, postingId }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            router.push(`/blog/detail/${postingId}`)
            router.refresh()
            alert.success(result.message)
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
        alert.error(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="h-[100vh]">
        <EmptyState label="데이터를 불러오는 중이에요!" />
      </div>
    )
  }

  return (
    <Main>
      <EditTopSection
        posting={posting}
        setPosting={setPosting}
        setThumbnailFile={setThumbnailFile}
        refs={refs}
      />
      <Section className="pb-10">
        <Editor
          content={content}
          theme="snow"
          setPosting={setPosting}
          setUploadImages={setUploadImages}
        />
        <Button
          type="button"
          level="primary"
          size="l"
          label="수정하기"
          fullWidth={true}
          disabled={isLoading}
          onClick={editPosting}
        />
      </Section>
    </Main>
  )
}
