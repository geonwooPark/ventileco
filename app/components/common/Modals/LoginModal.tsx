'use client'

import React from 'react'
import Button from '../../common/Button'
import { toast } from 'react-toastify'
import Modal from './Modal/Modal'
import { SubmitHandler, useForm } from 'react-hook-form'
import InputWithLabel from '../Input/InputWithLabel'
import { emailRegex, passwordRegex } from '@/constants/regex'
import useLoginMutation from '@/hooks/mutation/useLoginMutation'
import useOAuthLoginMutation from '@/hooks/mutation/useOAuthLoginMutation'
import { OAuthType } from '@/interfaces/interface'
import { useModalActions } from '@/hooks/store/useModalStore'
import SignUpModal from './SignUpModal'
import { IconGithub, IconGoogle } from '../../../../public/svgs/icons'

interface LoginFormDataType {
  email: string
  password: string
}

export default function LoginModal() {
  const { removeModal, addModal } = useModalActions()
  const { mutation: loginMutation } = useLoginMutation()
  const { mutation: OAuthMutation } = useOAuthLoginMutation()

  const { register, handleSubmit, reset } = useForm<LoginFormDataType>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onLogin: SubmitHandler<LoginFormDataType> = async (data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        reset()
        removeModal()
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
        removeModal()
        toast.success('로그인에 성공했습니다')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  const onSignUp = () => {
    removeModal()
    addModal(<SignUpModal />)
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

  return (
    <Modal>
      <Modal.Dim>
        <Modal.Card size="small">
          <Modal.Header>
            <Modal.Title>Login</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Content>
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

            <div className="mt-6">
              <Button
                type="button"
                level="primary"
                size="s"
                label="계속하기"
                fullWidth={true}
                disabled={OAuthMutation.isPending || loginMutation.isPending}
                onClick={handleSubmit(onLogin, onError)}
              />
              <hr className="my-3 border-beige-normal" />
              <Button
                type="button"
                level="outline"
                size="s"
                fullWidth={true}
                label="구글로 로그인"
                icon={<IconGoogle />}
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
                icon={<IconGithub className="text-white" />}
                disabled={OAuthMutation.isPending || loginMutation.isPending}
                onClick={() => onOAuthLogin('github')}
              />
              <p className="mt-4 text-center text-xs text-beige-light">
                계정이 없으신가요?{' '}
                <span
                  onClick={onSignUp}
                  className="cursor-pointer text-beige-normal"
                >
                  회원가입
                </span>
              </p>
            </div>
          </Modal.Content>
        </Modal.Card>
      </Modal.Dim>
    </Modal>
  )
}
