import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import SearchHistory from './SearchHistory'
import InputWithIcon from '@/components/common/Input/InputWithIcon'

interface SearchProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SearchWindow({ isOpen, setIsOpen }: SearchProps) {
  const router = useRouter()
  const [fade, setFade] = useState(false)
  const [text, setText] = useState('')
  const [keywords, setKeywords] = useState<string[]>(
    typeof window !== 'undefined' &&
      JSON.parse(localStorage.getItem('keyword') as string)
      ? JSON.parse(localStorage.getItem('keyword') as string)
      : [],
  )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setText(value)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!text) return
    if (text.trim() === '') return

    const storage = localStorage.getItem('keyword')

    const storageArr: string[] = storage ? JSON.parse(storage as string) : []
    const newStorageArr =
      storageArr.length < 5
        ? [text, ...storageArr]
        : [text, ...storageArr.slice(0, storageArr.length - 1)]
    const newRecentlyViewArr = Array.from(new Set(newStorageArr))
    localStorage.setItem('keyword', JSON.stringify(newRecentlyViewArr))

    setText('')
    setIsOpen(false)
    setKeywords((prev) => {
      return prev.length < 5
        ? [text, ...prev]
        : [text, ...prev.slice(0, prev.length - 1)]
    })

    router.push(`/blog/search?search=${text}`)
  }

  const onKeywordDelete = (keyword: string) => {
    setKeywords((prev) => {
      const arr = prev.filter((s) => s !== keyword)
      localStorage.setItem('keyword', JSON.stringify(arr))
      return arr
    })
  }

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (isOpen) {
      setFade(true)
    } else {
      timer = setTimeout(() => {
        setFade(false)
      }, 200)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [isOpen])

  return (
    <div
      className={`font-normal transition duration-200 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {fade && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute left-0 top-[64px] h-[320px] w-full overflow-hidden bg-black/70 md:h-[420px]`}
        >
          <form
            className="mx-auto h-full max-w-[1120px] px-4 sm:px-2 md:px-10 xl:px-20"
            onSubmit={onSubmit}
          >
            <div className="flex h-full items-center justify-center">
              <div className="w-[80%] md:w-[60%]">
                <InputWithIcon
                  type="text"
                  name="search"
                  value={text}
                  placeholder="검색어를 입력하세요"
                  onChange={onChange}
                  className="w-full rounded-sm px-4 py-3 text-black outline-none"
                  icon={AiOutlineSearch}
                  iconAction={() => onSubmit}
                  iconType="submit"
                />
                <SearchHistory
                  keywords={keywords}
                  onKeywordDelete={onKeywordDelete}
                  setText={setText}
                  setIsOpen={setIsOpen}
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
