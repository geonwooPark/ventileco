import React, { useEffect, useState } from 'react'
import Avatar from '../../../../common/Avatar'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import MenuItem from './MenuItem'
import { useModalActions } from '@/hooks/store/useModalStore'
import LoginModal from '@/components/common/Modal/LoginModal'
import SignUpModal from '@/components/common/Modal/SignUpModal'

interface MenuProps {
  session: Session | null
}

export default function Menu({ session }: MenuProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [fade, setFade] = useState(false)
  const { addModal } = useModalActions()

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  const onLogin = () => {
    addModal({
      key: 'login-modal',
      component: <LoginModal />,
    })
  }

  const onSignUp = () => {
    addModal({
      key: 'signup-modal',
      component: <SignUpModal />,
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
    <div className="relative font-normal">
      <div onClick={handleToggle} className="cursor-pointer">
        <Avatar src={session?.user?.image} />
      </div>
      <div
        className={`transition duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {fade && (
          <div className="absolute right-0 top-[50px] w-[40vw] overflow-hidden rounded-md text-sm shadow-md md:-right-10 md:w-[140px]">
            <div className="flex cursor-pointer flex-col">
              {session ? (
                <>
                  <MenuItem
                    onClick={signOut}
                    label="로그아웃"
                    className="text-red-600"
                  />
                  <MenuItem
                    onClick={() => {
                      handleToggle()
                      router.push('/mypage')
                    }}
                    label="마이페이지"
                    className="text-black"
                  />
                </>
              ) : (
                <>
                  <MenuItem onClick={onLogin} label="로그인" />
                  <MenuItem onClick={onSignUp} label="회원가입" />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
