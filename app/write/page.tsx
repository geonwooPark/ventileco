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

const categories = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React.JS',
  'Next.JS',
  '컴퓨터과학',
  '라이브러리',
]

const EditorWrapper = dynamic(() => import('../components/Editor'), {
  ssr: false,
  loading: () => <p className="text-center">Loading ...</p>,
})

export interface Images {
  imagePath: string
  imageURL: string
}

export default function Write() {
  const router = useRouter()

  const [category, setCategory] = useState('')
  const categoryRef = useRef<HTMLDivElement>(null)
  const [title, setTitle] = useState('')
  const titleRef = useRef<HTMLDivElement>(null)
  const [description, setDescription] = useState('')
  const [previewURL, setPreviewURL] = useState('')
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [content, setContent] = useState('')
  const [uploadImage, setUploadImage] = useState<Images[]>([])
  const [isLoading, setisLoading] = useState(false)

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'title') {
      setTitle(value)
    } else {
      setDescription(value)
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

  const thumbnailUpload = async (thumbnailURL: string) => {
    try {
      if (!thumbnailFile) return

      const imgRef = ref(
        storage,
        `ThumbnailImages/${Date.now()} - ${thumbnailFile.name}`,
      )
      const result = await uploadBytes(imgRef, thumbnailFile)
      return (thumbnailURL = await getDownloadURL(
        ref(storage, result.ref.fullPath),
      ))
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  const deleteImage = async () => {
    uploadImage.map(async (a) => {
      if (
        !content.replaceAll('amp;', '').includes(a.imageURL.replace('amp;', ''))
      ) {
        await deleteObject(ref(storage, a.imagePath))
      }
    })
  }

  const onSubmit = async () => {
    setisLoading(true)

    let thumbnailURL = ''
    thumbnailURL = (await thumbnailUpload(thumbnailURL)) as string
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
      await fetch('/api/postings', {
        method: 'POST',
        body: JSON.stringify({
          category,
          title,
          description,
          thumbnailURL,
          content,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.status === '201') {
            toast.success(result.message)
            router.push('/')
            router.refresh()
          } else if (result.status === '409') {
            throw new Error(result.message)
          } else {
            throw new Error(result.message)
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
      <section className="w-full h-[320px] md:h-[420px]">
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
          <div className="mb-3" ref={categoryRef}>
            <DropDownMenu
              categories={categories}
              category={category}
              label="카테고리를 선택하세요"
              setCategory={setCategory}
            />
          </div>
          <div ref={titleRef}>
            <Input
              type="text"
              name="title"
              value={title}
              placeholder="제목을 입력하세요"
              onChange={onTextChange}
              className={`w-full !text-4xl text-white md:!text-6xl text-right font-bold !bg-transparent mb-3 !p-0 border-none outline-none focus:outline-none placeholder:text-gray-300`}
            />
          </div>
          <Input
            type="text"
            name="description"
            value={description}
            placeholder="설명을 추가해보세요"
            onChange={onTextChange}
            className={`w-full !text-sm md:!text-base text-white text-right !bg-transparent mb-6 !p-0 border-none outline-none focus:outline-none placeholder:text-gray-300`}
          />
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
        <div className="my-container h-[500px]">
          <EditorWrapper
            content={content}
            theme="snow"
            setContent={setContent}
            setUploadImage={setUploadImage}
          />
          <Button
            type="button"
            level="primary"
            size="l"
            label="등록하기"
            fullWidth={true}
            disabled={isLoading}
            className="mt-20 md:mt-12 mb-6"
            onClick={onSubmit}
          />
        </div>
      </section>
    </>
  )
}
