import React from 'react'
import RefWrapper from '../../../common/RefWrapper'
import DropDownMenu from '../Dropdown/DropDownMenu'
import Input from '../../../common/Input'
import { OmittedPostingType } from '@/app/interfaces/interface'
import { categories } from '@/app/constants'

interface PostingInfoProps {
  posting: OmittedPostingType
  refs: {
    [key: string]: React.RefObject<HTMLDivElement>
  }
  errorSign: {
    [key: string]: boolean
  }
  setPosting: React.Dispatch<React.SetStateAction<OmittedPostingType>>
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PostingForm({
  posting,
  refs,
  errorSign,
  setPosting,
  onTextChange,
}: PostingInfoProps) {
  const { category, title, description } = posting
  const { categoryRef, titleRef, descriptionRef } = refs
  const { titleError, descriptionError } = errorSign

  return (
    <div>
      <RefWrapper
        innerRef={categoryRef}
        className="mb-4 mt-10 flex justify-end md:mt-0"
      >
        <DropDownMenu
          categories={categories}
          category={category}
          label="카테고리를 선택하세요"
          setPosting={setPosting}
        />
      </RefWrapper>
      <RefWrapper
        innerRef={titleRef}
        className={`w-full ${titleError ? 'text-red-500' : 'text-white'}`}
      >
        <Input
          type="text"
          name="title"
          value={title}
          placeholder="제목을 입력하세요"
          onChange={onTextChange}
          className={`mb-3 w-full border-none !bg-transparent !p-0 text-right !text-2xl font-bold outline-none placeholder:text-gray-300 focus:outline-none md:!text-4xl`}
        />
      </RefWrapper>
      <RefWrapper
        innerRef={descriptionRef}
        className={`w-full ${descriptionError ? 'text-red-500' : 'text-white'}`}
      >
        <Input
          type="text"
          name="description"
          value={description}
          placeholder="설명을 추가해보세요"
          onChange={onTextChange}
          className={`mb-6 w-full border-none !bg-transparent !p-0 text-right !text-sm outline-none placeholder:text-gray-300 focus:outline-none md:!text-base`}
        />
      </RefWrapper>
    </div>
  )
}
