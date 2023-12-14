import React, { useEffect, useState } from 'react'
import DropDownItem from './DropDownItem'
import { PostingType } from '@/app/interfaces/interface'
interface DropDownMenuProps {
  categories: string[]
  category: string
  label: string
  setPosting: React.Dispatch<
    React.SetStateAction<
      Omit<PostingType, '_id' | 'createdAt' | 'updatedAt' | 'views'>
    >
  >
}

export default function DropDownMenu({
  categories,
  category,
  label,
  setPosting,
}: DropDownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [animation, setAnimation] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (isOpen) {
      setAnimation(true)
    } else {
      timer = setTimeout(() => {
        setAnimation(false)
      }, 300)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [isOpen])

  return (
    <div className="relative text-xs text-white">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-[140px] cursor-pointer bg-gray-700 p-2 text-center"
      >
        {category ? category : label}
      </div>
      <div className="absolute z-20 w-full overflow-hidden">
        <div
          className={`${
            isOpen ? 'animate-slideFadeIn' : 'animate-slideFadeOut'
          }`}
        >
          {animation && (
            <ul>
              {categories.map((category, i) => {
                return (
                  <DropDownItem
                    key={i}
                    category={category}
                    setIsOpen={setIsOpen}
                    setPosting={setPosting}
                  />
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
