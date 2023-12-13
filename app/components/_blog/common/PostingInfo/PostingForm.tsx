import React from 'react'
import RefWrapper from '../../../common/RefWrapper'
import DropDownMenu from '../Dropdown/DropDownMenu'
import Input from '../../../common/Input'
import { categories } from '@/app/utils/categoryArr'
import { OmittedPostingType } from '@/app/interfaces/interface'

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
        ref={categoryRef}
        className="flex justify-end mt-10 mb-4 md:mt-0"
      >
        <DropDownMenu
          categories={categories}
          category={category}
          label="카테고리를 선택하세요"
          setPosting={setPosting}
        />
      </RefWrapper>
      <RefWrapper
        ref={titleRef}
        className={`w-full ${titleError ? 'text-red-500' : 'text-white'}`}
      >
        <Input
          type="text"
          name="title"
          value={title}
          placeholder="제목을 입력하세요"
          onChange={onTextChange}
          className={`w-full !text-2xl md:!text-4xl text-right font-bold !bg-transparent mb-3 !p-0 border-none outline-none focus:outline-none placeholder:text-gray-300`}
        />
      </RefWrapper>
      <RefWrapper
        ref={descriptionRef}
        className={`w-full ${descriptionError ? 'text-red-500' : 'text-white'}`}
      >
        <Input
          type="text"
          name="description"
          value={description}
          placeholder="설명을 추가해보세요"
          onChange={onTextChange}
          className={`w-full !text-sm md:!text-base text-right !bg-transparent mb-6 !p-0 border-none outline-none focus:outline-none placeholder:text-gray-300`}
        />
      </RefWrapper>
    </div>
  )
}
