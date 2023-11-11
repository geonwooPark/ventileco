'use client'

import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '../components/Button'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import Input from '../components/Input'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage'
import { storage } from '../firebase'
import DropDownMenu from '../components/dropdown/DropDownMenu'
import EmptyState from '../components/EmptyState'
import { PostingType } from '../actions/getPosting'

const categories = [
  'React.JS',
  'Next.JS',
  'TypeScript',
  '컴퓨터과학',
  '라이브러리',
]

const EditorWrapper = dynamic(() => import('../components/Editor'), {
  ssr: false,
  loading: () => <EmptyState label="에디터를 불러오고 있어요!" />,
})

export interface Images {
  imagePath: string
  imageURL: string
}

export type Posting = Omit<PostingType, '_id' | 'createdAt' | 'updatedAt'>

export default function Write() {
  const router = useRouter()

  const [posting, setPosting] = useState<Posting>({
    category: '',
    title: '',
    description: '',
    thumbnailURL: '',
    content: '',
  })

  const { category, title, description, thumbnailURL, content } = posting

  const [errorSign, setErrorSign] = useState({
    category: false,
    title: false,
    description: false,
  })

  const categoryRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const [previewURL, setPreviewURL] = useState('')
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [uploadImages, setUploadImages] = useState<Images[]>([])
  const [isLoading, setisLoading] = useState(false)

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'title') {
      setPosting((prev) => {
        return { ...prev, title: value }
      })
      if (value.length > 40) {
        setErrorSign({ ...errorSign, title: true })
      } else {
        setErrorSign({ ...errorSign, title: false })
      }
    }
    if (name === 'description') {
      setPosting((prev) => {
        return { ...prev, description: value }
      })
      if (value.length > 90) {
        setErrorSign({ ...errorSign, description: true })
      } else {
        setErrorSign({ ...errorSign, description: false })
      }
    }
  }

  const onThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!files) return
    const file = files[0]
    setThumbnailFile(file)

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if (typeof result === 'string') {
        setPreviewURL(result)
      }
    }
    reader.readAsDataURL(file)
  }

  const thumbnailUpload = async () => {
    try {
      if (!thumbnailFile) return

      const imgRef = ref(
        storage,
        `ThumbnailImages/${Date.now()} - ${thumbnailFile.name}`,
      )
      const result = await uploadBytes(imgRef, thumbnailFile)
      const thumbnailURL = await getDownloadURL(
        ref(storage, result.ref.fullPath),
      )
      return thumbnailURL
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  const deleteImage = async () => {
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

  const onSubmit = async () => {
    setisLoading(true)

    const thumbnailURL = await thumbnailUpload()
    await deleteImage()

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

      await fetch('/api/postings', {
        method: 'POST',
        body: JSON.stringify({ ...posting, thumbnailURL }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            toast.success(result.message)
            router.push(`/`)
            router.refresh()
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
    <>
      <section className="w-full h-[320px] md:h-[420px] mb-10">
        <div className="my-container h-full flex flex-col justify-center items-end">
          <div className="w-full h-[320px] md:h-[420px] absolute top-0 left-0 -z-10">
            {previewURL ? (
              <img
                src={previewURL}
                className="w-full h-full object-cover brightness-50"
              />
            ) : (
              <div className="w-full h-full bg-slate-400"></div>
            )}
          </div>
          <div className="mt-10 md:mt-0 mb-4" ref={categoryRef}>
            <DropDownMenu
              categories={categories}
              category={category}
              label="카테고리를 선택하세요"
              setPosting={setPosting}
            />
          </div>
          <div
            ref={titleRef}
            className={`w-full ${
              errorSign.title ? 'text-red-500' : 'text-white'
            }`}
          >
            <Input
              type="text"
              name="title"
              value={title}
              placeholder="제목을 입력하세요"
              onChange={onTextChange}
              className={`w-full !text-2xl md:!text-4xl text-right font-bold !bg-transparent mb-3 !p-0 border-none outline-none focus:outline-none placeholder:text-gray-300`}
            />
          </div>
          <div
            ref={descriptionRef}
            className={`w-full ${
              errorSign.description ? 'text-red-500' : 'text-white'
            }`}
          >
            <Input
              type="text"
              name="description"
              value={description}
              placeholder="설명을 추가해보세요"
              onChange={onTextChange}
              className={`w-full !text-sm md:!text-base text-right !bg-transparent mb-6 !p-0 border-none outline-none focus:outline-none placeholder:text-gray-300`}
            />
          </div>
          <label
            htmlFor="photo"
            className="flex justify-center items-center w-40 h-11 md:h-12 px-4 text-xs md:text-sm text-white bg-gray-700 rounded transition duration-200 ease-in-out hover:opacity-80 cursor-pointer"
          >
            썸네일 추가하기
          </label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            className="hidden"
            onChange={onThumbnailChange}
          />
        </div>
      </section>
      <section>
        <div className="my-container">
          <div className="h-[500px] mb-10">
            <EditorWrapper
              content={content}
              theme="snow"
              setPosting={setPosting}
              setUploadImages={setUploadImages}
            />
          </div>
          <Button
            type="button"
            level="primary"
            size="l"
            label="등록하기"
            fullWidth={true}
            disabled={isLoading}
            className="mb-6"
            onClick={onSubmit}
          />
        </div>
      </section>
    </>
  )
}
