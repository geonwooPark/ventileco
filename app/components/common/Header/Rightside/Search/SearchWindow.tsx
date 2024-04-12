import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SearchHistory from './SearchHistory'
import InputWithIcon from '@/components/common/Input/InputWithIcon'
import ProjectTitle from '@/components/common/ProjectTitle'
import Container from '@/components/common/Container'
import { IconSearch } from '../../../../../../public/svgs/icons'

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
          className={`absolute left-0 top-[56px] h-[320px] w-full overflow-hidden border-b-4 border-dashed border-beige-light bg-brown-dark shadow-2xl`}
        >
          <Container className="w-full pt-10">
            <ProjectTitle title="Wanted" />
            <form
              className="flex h-full w-full justify-center"
              onSubmit={onSubmit}
            >
              <div className="w-[80%] md:w-[60%]">
                <InputWithIcon
                  type="text"
                  name="search"
                  value={text}
                  placeholder="검색어를 입력하세요"
                  onChange={onChange}
                  className="w-full rounded-sm px-4 py-3 text-black outline-none "
                  icon={<IconSearch />}
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
            </form>
          </Container>
          {/* <hr className="mt-10 " /> */}
        </div>
      )}
    </div>
  )
}
