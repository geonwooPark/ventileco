import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import SearchHistory from './SearchHistory'
import InputWithIcon from '@/components/common/Input/InputWithIcon'

interface SearchProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Search({ isOpen, setIsOpen }: SearchProps) {
  const router = useRouter()
  const [fade, setFade] = useState(false)
  const [text, setText] = useState('')
  const [keywords, setKeywords] = useState<string[]>([])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setText(value)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!text) return
    if (text.trim() === '') return

    const storage = localStorage.getItem('keyword')
    if (storage) {
      const storageArr: string[] = JSON.parse(storage)
      let newStorageArr: string[] = []
      if (storageArr.length < 5) {
        newStorageArr = [text, ...storageArr]
      } else {
        newStorageArr = [text, ...storageArr.slice(0, storageArr.length - 1)]
      }
      const newRecentlyViewArr = Array.from(new Set(newStorageArr))
      localStorage.setItem('keyword', JSON.stringify(newRecentlyViewArr))
    } else {
      localStorage.setItem('keyword', JSON.stringify([text]))
    }

    router.push(`/blog/search?search=${text}`)
    setText('')
    setIsOpen(false)
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

  useEffect(() => {
    const storage = localStorage.getItem('keyword')
    if (storage) {
      const storageArr: string[] = JSON.parse(storage)
      setKeywords(storageArr)
    }
  }, [isOpen])

  return (
    <div
      className={`transition duration-200 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {fade && (
        <div
          className={`absolute left-0 top-0 h-[320px] w-full overflow-hidden bg-black md:h-[420px]`}
        >
          <form
            className="mx-auto h-full max-w-[1120px] px-4 sm:px-2 md:px-10 xl:px-20"
            onSubmit={onSubmit}
          >
            <div className="flex h-full items-center justify-center">
              <div className="relative w-[80%] md:w-[60%]">
                <InputWithIcon
                  type="text"
                  name="search"
                  value={text}
                  placeholder="검색어를 입력하세요"
                  onChange={onChange}
                  className="w-full rounded-sm px-4 py-3 outline-none"
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
