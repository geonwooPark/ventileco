'use client'

import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { BiLogoGithub } from 'react-icons/bi'
import Button from '../../common/Button'
import { toast } from 'react-toastify'
import Modal from './Modal'
import { SubmitHandler, useForm } from 'react-hook-form'
import InputWithLabel from '../Input/InputWithLabel'
import { emailRegex, passwordRegex } from '@/constants/regex'
import useLoginMutation from '@/hooks/mutation/useLoginMutation'
import useOAuthLoginMutation from '@/hooks/mutation/useOAuthLoginMutation'
import { OAuthType } from '@/interfaces/interface'
import { useIsModalOpen, useModalActions } from '@/hooks/store/useModalStore'
import SignUpModal from './SignUpModal'

interface LoginFormDataType {
  email: string
  password: string
}

export default function LoginModal() {
  const isModalOpen = useIsModalOpen()
  const { removeModal, addModal } = useModalActions()
  const { mutation: loginMutation } = useLoginMutation()
  const { mutation: OAuthMutation } = useOAuthLoginMutation()

  const { register, handleSubmit, reset } = useForm<LoginFormDataType>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onClose = () => {
    removeModal('login-modal')
  }

  const onLogin: SubmitHandler<LoginFormDataType> = async (data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        reset()
        onClose()
        toast.success('로그인에 성공했습니다')

        setTimeout(() => window.location.reload(), 1000)
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  const onOAuthLogin = async (oauth: OAuthType) => {
    OAuthMutation.mutate(oauth, {
      onSuccess: () => {
        onClose()
        toast.success('로그인에 성공했습니다')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  const onSignUp = () => {
    removeModal('login-modal')
    addModal({
      key: 'signup-modal',
      component: () => <SignUpModal />,
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
  const passwordRegister = register('password', {
    required: '비밀번호를 입력해주세요.',
    pattern: {
      value: passwordRegex,
      message: '비밀번호는 영문을 포함하여 8~15자리이어야 합니다.',
    },
  })

  const bodyContent = (
    <form onSubmit={handleSubmit(onLogin, onError)}>
      <InputWithLabel
        register={emailRegister}
        type="text"
        label="이메일"
        className="mb-1"
      />
      <InputWithLabel
        register={passwordRegister}
        type="password"
        label="비밀번호"
      />
    </form>
  )

  const footerContent = (
    <div className="mt-3">
      <hr className="mb-3 border-beige-normal" />
      <Button
        type="button"
        level="outline"
        size="s"
        fullWidth={true}
        label="구글로 로그인"
        icon={FcGoogle}
        disabled={OAuthMutation.isPending || loginMutation.isPending}
        className="mb-1"
        onClick={() => onOAuthLogin('google')}
      />
      <Button
        type="button"
        level="outline"
        size="s"
        fullWidth={true}
        label="깃허브로 로그인"
        icon={BiLogoGithub}
        disabled={OAuthMutation.isPending || loginMutation.isPending}
        onClick={() => onOAuthLogin('github')}
      />
      <p className="mt-4 text-center text-xs text-beige-light">
        계정이 없으신가요?{' '}
        <span onClick={onSignUp} className="cursor-pointer text-beige-normal">
          회원가입
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      title="Login"
      body={bodyContent}
      footer={footerContent}
      isOpen={isModalOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onLogin, onError)}
      actionLabel="계속하기"
      isLoading={OAuthMutation.isPending || loginMutation.isPending}
    />
  )
}
