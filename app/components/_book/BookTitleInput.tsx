import React, { useState } from 'react'
import {
  UseFormClearErrors,
  UseFormRegisterReturn,
  UseFormSetValue,
} from 'react-hook-form'
import InputWithLabel from '@/components/common/Input/InputWithLabel'
import ErrorMessage from '../common/ErrorMessage'
import { BookReviewFormType } from './BookReviewForm'
import FindBookByBookName from './FindBookByBookName'

interface BookTitleInputProps {
  titleRegister: UseFormRegisterReturn<'title'>
  setValue: UseFormSetValue<BookReviewFormType>
  clearErrors: UseFormClearErrors<BookReviewFormType>
  errorMessage?: string
}

export default function BookTitleInput({
  titleRegister,
  setValue,
  clearErrors,
  errorMessage,
}: BookTitleInputProps) {
  const [keyword, setKeyword] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setKeyword(value)
  }

  return (
    <div className="relative mb-2 w-full">
      <InputWithLabel
        register={titleRegister}
        label="도서명"
        type="text"
        onChange={onChange}
        className="mb-1"
      />
      <FindBookByBookName
        setValue={setValue}
        keyword={keyword}
        clearErrors={clearErrors}
      />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  )
}
