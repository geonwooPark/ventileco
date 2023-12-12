import React, { useEffect, useState } from 'react'
import Avatar from '../../../common/Avatar'
import MenuItem from './MenuItem'
import useLoginModal from '@/app/hooks/useLoginModal'
import useSignUpModal from '@/app/hooks/useSignUpModal'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'

interface MenuProps {
  session: Session | null
}

export default function Menu({ session }: MenuProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [fade, setFade] = useState(false)
  const loginModal = useLoginModal()
  const signUpModal = useSignUpModal()

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
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
    <div className="relative">
      <div onClick={handleToggle} className="cursor-pointer">
        <Avatar src={session?.user?.image} />
      </div>
      <div
        className={`transition duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {fade && (
          <div className="absolute rounded-sm shadow-md w-[40vw] md:w-[140px] bg-white overflow-hidden top-12 right-0 md:-right-10 text-sm">
            <div className="flex flex-col curser-pointer">
              {session ? (
                <>
                  <MenuItem
                    onClick={() => signOut()}
                    label="로그아웃"
                    className="text-red-500"
                  />
                  <MenuItem
                    onClick={() => {
                      handleToggle()
                      router.push('/mypage')
                    }}
                    label="마이페이지"
                    className="border-t"
                  />
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={() => {
                      signUpModal.onClose()
                      loginModal.onOpen()
                    }}
                    label="로그인"
                  />
                  <MenuItem
                    onClick={() => {
                      loginModal.onClose()
                      signUpModal.onOpen()
                    }}
                    label="회원가입"
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
