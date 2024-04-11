import React, { useState } from 'react'
import Modal from './Modal'
import Input from '../Input/Input'
import { useSession } from 'next-auth/react'
import dayjs from '@/lib/dayjs'
import { toast } from 'react-toastify'
import useAddCheckListItemMutation from '@/hooks/mutation/useAddCheckListItemMutation'
import { useIsModalOpen, useModalActions } from '@/hooks/store/useModalStore'

export default function AddListItemModal() {
  const { data: session } = useSession()
  const isModalOpen = useIsModalOpen()
  const { removeModal } = useModalActions()

  const [value, setValue] = useState('')
  const today = dayjs(new Date()).tz().format('YYYY-MM-DD')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const { mutation: addCheckListItemMutation } = useAddCheckListItemMutation({
    today,
  })

  const onClose = () => {
    removeModal('addListItem-modal')
  }

  const addCheckListItem = () => {
    if (session?.user.role !== 'admin') return

    addCheckListItemMutation.mutate(
      { value, today },
      {
        onSuccess: () => {
          setValue('')
          onClose()
        },
        onError: (error) => {
          toast.error(error.message)
        },
      },
    )
  }

  const bodyContent = (
    <Input
      type="text"
      name="text"
      value={value}
      placeholder="할 일을 작성해보세요."
      onChange={onChange}
      className={`mb-2 w-full`}
    />
  )

  return (
    <Modal
      title="Add List"
      body={bodyContent}
      isOpen={isModalOpen}
      onClose={onClose}
      onSubmit={addCheckListItem}
      actionLabel="등록하기"
    />
  )
}
