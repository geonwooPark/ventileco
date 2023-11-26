import React, { useEffect, useState } from 'react'
import Input from '../common/Input'
import { AiOutlineSearch } from 'react-icons/ai'
import { useRouter } from 'next/navigation'

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

    router.push(`/search?search=${text}`)
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
          className={`absolute w-full h-[320px] md:h-[420px] bg-black top-0 left-0`}
        >
          <form className="h-full" onSubmit={onSubmit}>
            <div className="h-full flex justify-center items-center">
              <div className="w-[60%]">
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
