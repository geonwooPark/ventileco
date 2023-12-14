'use client'

import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import Input from '../../common/Input'
import { toast } from 'react-toastify'
import {
  useSignUpModalActions,
  useSignUpModalIsOpen,
} from '@/app/hooks/useSignUpModalStore'
import { useLoginModalActions } from '@/app/hooks/useLoginModalStore'

export default function SignUpModal() {
  const signUpModalIsOpen = useSignUpModalIsOpen()
  const { onClose: closeSignUpModal } = useSignUpModalActions()
  const { onOpen: openLoginModal } = useLoginModalActions()
  const [values, setValues] = useState({
    email: '',
    name: '',
    password: '',
  })
  const { email, name, password } = values
  const [focus, setFocus] = useState({
    email: false,
    name: false,
    password: false,
  })
  const [isLoading, setisLoading] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const onSubmit = async () => {
    setisLoading(true)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,15}$/

    try {
      if (!email || email.trim() === '') {
        setFocus({ ...focus, email: true })
        throw new Error('이메일을 입력해주세요.')
      }
      if (!emailRegex.test(email)) {
        setFocus({ ...focus, email: true })
        throw new Error('잘못된 이메일 형식입니다.')
      }
      if (!name || name.trim() === '') {
        setFocus({ ...focus, name: true })
        throw new Error('이름을 입력해주세요.')
      }
      if (name.length > 10) {
        setFocus({ ...focus, name: true })
        throw new Error('이름은 10자 이하로 입력해주세요.')
      }
      if (!password || password.trim() === '') {
        setFocus({ ...focus, password: true })
        throw new Error('비밀번호를 입력해주세요.')
      }
      if (
        parseInt(password.length.toString(), 10) < 8 ||
        !passwordRegex.test(password)
      ) {
        setFocus({ ...focus, password: true })
        throw new Error('비밀번호는 영문을 포함하여 8~15자리이어야 합니다.')
      }

      await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) {
            closeSignUpModal()
            toast.success(result.message)
            setValues({
              email: '',
              name: '',
              password: '',
            })
          } else {
            if (result.focus === 'email') {
              setFocus({ ...focus, email: true })
            }
            if (result.focus === 'name') {
              setFocus({ ...focus, name: true })
            }
            if (result.focus === 'password') {
              setFocus({ ...focus, password: true })
            }
            throw new Error(result.error)
          }
        })
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setisLoading(false)
    }
  }

  useEffect(() => {
    setFocus({
      email: false,
      name: false,
      password: false,
    })
  }, [email, name, password])

  const bodyContent = (
    <>
      <Input
        type="email"
        name="email"
        value={email}
        placeholder="이메일"
        onChange={onChange}
        className={`mb-2 w-full ${
          focus.email ? 'border-red-400' : 'border-gray-300'
        }`}
      />
      <Input
        type="name"
        name="name"
        value={name}
        placeholder="이름"
        onChange={onChange}
        className={`mb-2 w-full ${
          focus.name ? 'border-red-400' : 'border-gray-300'
        }`}
      />
      <Input
        type="password"
        name="password"
        value={password}
        placeholder="비밀번호"
        onChange={onChange}
        className={`mb-2 w-full ${
          focus.password ? 'border-red-400' : 'border-gray-300'
        }`}
      />
    </>
  )

  const footerContent = (
    <div className="mt-3">
      <hr className="mb-3" />
      <p className="mt-4 text-center text-xs font-light text-gray-500">
        이미 계정이 있으신가요?{' '}
        <span
          onClick={() => {
            closeSignUpModal()
            openLoginModal()
          }}
          className="cursor-pointer font-normal text-gray-800"
        >
          로그인
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      title="회원가입"
      body={bodyContent}
      footer={footerContent}
      isOpen={signUpModalIsOpen}
      onClose={closeSignUpModal}
      onSubmit={onSubmit}
      actionLabel="계속"
      isLoading={isLoading}
    />
  )
}
