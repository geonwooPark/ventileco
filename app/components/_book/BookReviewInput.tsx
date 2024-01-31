import React, { useMemo, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import { UseFormSetValue } from 'react-hook-form'
import { BookReviewFormType } from './BookReviewForm'
import ErrorMessage from '../common/ErrorMessage'

interface BookReviewInputProps {
  setValue: UseFormSetValue<BookReviewFormType>
  content: string
  errorMessage?: string
}

export default function BookReviewInput({
  setValue,
  content,
  errorMessage,
}: BookReviewInputProps) {
  const quillRef = useRef<any>()

  const onChange = (newContent: string) => {
    setValue('content', newContent)
  }

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ color: [] }, { background: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
        ],
      },
    }
  }, [])

  return (
    <div className="mb-4">
      <div className="relative mb-1 h-[500px] rounded-md border">
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={onChange}
          modules={modules}
          theme="bubble"
          className={`h-full w-full outline-none focus:outline-none`}
        />
      </div>
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  )
}
