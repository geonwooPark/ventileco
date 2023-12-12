'use client'

import React, { useMemo, useRef } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import { ImageResize } from 'quill-image-resize-module-ts'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { toast } from 'react-toastify'
import { ImagesType, PostingType } from '../../../interfaces/interface'
import { storage } from '@/app/firebase'
Quill.register('modules/ImageResize', ImageResize)

interface EditorProps {
  content: string
  theme: string
  readOnly?: boolean
  setPosting?: React.Dispatch<
    React.SetStateAction<
      Omit<PostingType, '_id' | 'createdAt' | 'updatedAt' | 'views'>
    >
  >
  setUploadImages?: React.Dispatch<React.SetStateAction<ImagesType[]>>
}

export default function Editor({
  content,
  theme,
  readOnly,
  setPosting,
  setUploadImages,
}: EditorProps) {
  const quillRef = useRef<any>()

  const onChange = (content: string) => {
    if (setPosting) {
      setPosting((prev) => {
        return { ...prev, content }
      })
    }
  }

  const imageHandler = async () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = async () => {
      if (!input.files) return
      const file = input.files[0]
      const editor = quillRef.current.getEditor()
      const range = editor.getSelection()

      try {
        const imgRef = ref(storage, `uploadImages/${Date.now()} - ${file.name}`)
        const result = await uploadBytes(imgRef, file)
        const fileUrl = await getDownloadURL(ref(storage, result.ref.fullPath))

        editor.insertEmbed(range.index, 'image', fileUrl)
        editor.setSelection(range.index + 1)

        if (setUploadImages) {
          setUploadImages((prev) => [
            ...prev,
            { imageURL: fileUrl, imagePath: result.ref.fullPath },
          ])
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error('이미지 업로드에 실패했습니다!')
        }
      }
    }
  }

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ color: [] }, { background: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
          ['image', 'link', 'code-block'],
        ],
        handlers: { image: imageHandler },
      },
      ImageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
      },
      clipboard: {
        matchVisual: false,
      },
    }
  }, [])

  return (
    <ReactQuill
      ref={quillRef}
      value={content}
      onChange={onChange}
      modules={theme === 'snow' ? modules : undefined}
      theme={theme}
      readOnly={readOnly}
      className="w-full h-full outline-none focus:outline-none"
    />
  )
}
