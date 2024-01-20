import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { HotPlaceFormDataType } from '@/interfaces/interface'
import {
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form'
import ErrorMessage from './ErrorMessage'

interface HashtagInputProps {
  setValue: UseFormSetValue<HotPlaceFormDataType>
  setError: UseFormSetError<HotPlaceFormDataType>
  clearErrors: UseFormClearErrors<HotPlaceFormDataType>
  errorMessage?: string
}

export default function HashtagInput({
  setValue,
  setError,
  clearErrors,
  errorMessage,
}: HashtagInputProps) {
  const [hashtags, setHashtags] = useState<string[]>([])
  const [hashtagInput, setHashtagsInput] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setHashtagsInput(value)
  }

  const onDelete = (tag: string) => {
    setHashtags((prev) => prev.filter((item) => item !== tag))
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (e.nativeEvent.isComposing) return
      setHashtagsInput('')

      if (!hashtagInput) return
      if (hashtags.includes(hashtagInput)) return
      if (hashtags.length > 4) {
        return setError('hashtags', {
          message: '해시태그는 최대 5개까지 입력 가능합니다.',
        })
      }
      setHashtags((prev) => [...prev, hashtagInput])
    }
  }

  useEffect(() => {
    setValue('hashtags', hashtags)
    clearErrors('hashtags')
  }, [hashtags])

  useEffect(() => {
    const timer = setTimeout(() => {
      clearErrors('hashtags')
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [errorMessage])

  return (
    <div className="mb-2">
      <div className="mb-1 h-[52px] rounded border text-sm">
        <div className="flex h-full items-center overflow-x-scroll px-4">
          <ul
            className={`flex shrink-0 gap-2 ${hashtags.length !== 0 && 'mr-4'}`}
          >
            {hashtags.map((tag, i) => (
              <li
                key={i}
                className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm text-blue-400"
              >
                {tag}
                <AiOutlineClose
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => onDelete(tag)}
                />
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={hashtagInput}
            autoComplete="off"
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder="태그를 설정해보세요😘 (최대 5개)"
            className="h-full w-[240px] shrink-0 outline-none placeholder:text-sm"
          />
        </div>
      </div>
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  )
}
