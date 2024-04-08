import React, { useMemo, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import { UseFormSetValue } from 'react-hook-form'
import ErrorMessage from '../../common/ErrorMessage'
import { BookReviewFormDataType } from '@/interfaces/interface'

interface BookReviewEditorProps {
  setValue?: UseFormSetValue<BookReviewFormDataType>
  theme: 'snow' | 'bubble'
  readOnly?: boolean
  content: string
  errorMessage?: string
}

export default function BookReviewEditor({
  setValue,
  theme,
  readOnly,
  content,
  errorMessage,
}: BookReviewEditorProps) {
  const quillRef = useRef<any>()

  const onChange = (newContent: string) => {
    if (!setValue) return
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
      <div
        className={`${
          readOnly ? 'h-full' : 'h-[500px]'
        } relative mb-1  rounded-md border`}
      >
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={onChange}
          modules={modules}
          theme={theme}
          readOnly={readOnly}
          className={`h-full w-full text-beige-light outline-none focus:outline-none`}
        />
      </div>
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  )
}
