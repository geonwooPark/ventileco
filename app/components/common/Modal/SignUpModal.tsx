'use client'

import React from 'react'
import Modal from './Modal'
import { toast } from 'react-toastify'
import { SubmitHandler, useForm } from 'react-hook-form'
import InputWithLabel from '../Input/InputWithLabel'
import { emailRegex, nameRegex, passwordRegex } from '@/constants/regex'
import useSignUpMutation from '@/hooks/mutation/useSignUpMutation'
import { useFireWorkActions } from '@/hooks/store/useFireWorkStore'
import { useIsModalOpen, useModalActions } from '@/hooks/store/useModalStore'
import LoginModal from './LoginModal'

interface SignUpFormDataType {
  email: string
  name: string
  password: string
}

export default function SignUpModal() {
  const isModalOpen = useIsModalOpen()
  const { removeModal, addModal } = useModalActions()
  const { mutation: signUpMutation } = useSignUpMutation()
  const { onOpen: openFireWork } = useFireWorkActions()

  const { register, handleSubmit, reset } = useForm<SignUpFormDataType>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  })

  const onClose = () => {
    removeModal('signup-modal')
  }

  const onSubmit: SubmitHandler<SignUpFormDataType> = async (data) => {
    signUpMutation.mutate(data, {
      onSuccess: () => {
        reset()
        onClose()
        toast.success('회원가입에 성공했습니다!')
        openFireWork()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  const onLogin = () => {
    removeModal('signup-modal')
    addModal({
      key: 'login-modal',
      component: <LoginModal />,
    })
  }

  const onError = (error: any) => {
    if (error === null) return
    for (const key in error) {
      toast.error(error[key].message)
      break
    }
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
      <hr className="mb-3 border-beige-normal" />
      <p className="mt-4 text-center text-xs text-beige-light">
        이미 계정이 있으신가요?{' '}
        <span onClick={onLogin} className="cursor-pointer text-beige-normal">
          로그인
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      title="Sign Up"
      body={bodyContent}
      footer={footerContent}
      isOpen={isModalOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit, onError)}
      actionLabel="가입하기"
      isLoading={signUpMutation.isPending}
    />
  )
}
