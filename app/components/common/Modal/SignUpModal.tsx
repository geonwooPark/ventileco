'use client'

import React from 'react'
import Modal from './Modal'
import { toast } from 'react-toastify'
import { useLoginModalActions } from '@/hooks/store/useLoginModalStore'
import { SubmitHandler, useForm } from 'react-hook-form'
import InputWithLabel from '../Input/InputWithLabel'
import { emailRegex, nameRegex, passwordRegex } from '@/constants/regex'
import {
  useSignUpModalActions,
  useSignUpModalIsOpen,
} from '@/hooks/store/useSignUpModalStore'
import useSignUpMutation from '@/hooks/mutation/useSignUpMutation'
import { useFireWorkActions } from '@/hooks/store/useFireWorkStore'

interface SignUpFormDataType {
  email: string
  name: string
  password: string
}

export default function SignUpModal() {
  const signUpModalIsOpen = useSignUpModalIsOpen()
  const { onClose: closeSignUpModal } = useSignUpModalActions()
  const { onOpen: openLoginModal } = useLoginModalActions()
  const { mutation: signUpMutation } = useSignUpMutation()
  const { onOpen: openFireWork } = useFireWorkActions()

  const { register, handleSubmit, reset } = useForm<SignUpFormDataType>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<SignUpFormDataType> = async (data) => {
    signUpMutation.mutate(data, {
      onSuccess: () => {
        reset()
        closeSignUpModal()
        toast.success('회원가입에 성공했습니다!')
        openFireWork()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  const onError = (error: any) => {
    if (error === null) return
    for (const key in error) {
      toast.error(error[key].message)
      break
    }
  }

  const handleModal = () => {
    closeSignUpModal()
    openLoginModal()
  }

  const emailRegister = register('email', {
    required: '이메일을 입력해주세요.',
    pattern: { value: emailRegex, message: '잘못된 이메일 형식입니다.' },
  })
  const nameRegister = register('name', {
    required: '닉네임을 입력해주세요.',
    pattern: {
      value: nameRegex,
      message: '닉네임은 한글 및 영문으로 10자 이내로 입력해주세요.',
    },
  })
  const passwordRegister = register('password', {
    required: '비밀번호를 입력해주세요.',
    pattern: {
      value: passwordRegex,
      message: '비밀번호는 영문을 포함하여 8~15자리이어야 합니다.',
    },
  })

  const bodyContent = (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <InputWithLabel
        register={emailRegister}
        type="text"
        label="이메일"
        className="mb-1"
      />
      <InputWithLabel
        register={nameRegister}
        type="text"
        label="닉네임"
        className="mb-1"
      />
      <InputWithLabel
        register={passwordRegister}
        type="password"
        label="비밀번호"
        className="mb-1"
      />
    </form>
  )

  const footerContent = (
    <div className="mt-3">
      <hr className="mb-3" />
      <p className="mt-4 text-center text-xs font-light text-gray-500">
        이미 계정이 있으신가요?{' '}
        <span
          onClick={handleModal}
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
      onSubmit={handleSubmit(onSubmit, onError)}
      actionLabel="계속"
      isLoading={signUpMutation.isPending}
    />
  )
}
