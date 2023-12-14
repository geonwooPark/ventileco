import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import Input from '../../../Input'

interface SearchProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Search({ isOpen, setIsOpen }: SearchProps) {
  const router = useRouter()
  const [fade, setFade] = useState(false)
  const [text, setText] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setText(value)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!text) return
    if (text.trim() === '') return

    router.push(`/blog/search?search=${text}`)
    setText('')
    setIsOpen(false)
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
      className={`transition duration-200 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {fade && (
        <div
          className={`absolute left-0 top-0 h-[320px] w-full bg-black md:h-[420px]`}
        >
          <form className="my-container h-full" onSubmit={onSubmit}>
            <div className="flex h-full items-center justify-center">
              <div className="w-[80%] md:w-[60%]">
                <Input
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
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
