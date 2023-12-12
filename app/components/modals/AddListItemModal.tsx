import React, { useState } from 'react'
import Modal from './Modal'
import Input from '../common/Input'
import useAddListItemModal from '@/app/hooks/useAddListItemModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import dayjs from 'dayjs'

const addListItem = async (
  session: Session | null,
  value: string,
  today: string,
) => {
  if (session?.user.role !== 'admin') return

  await fetch('/api/check-list', {
    method: 'POST',
    body: JSON.stringify({ value, today }),
  })
}

export default function AddListItemModal() {
  const { data: session } = useSession()
  const addListItemModal = useAddListItemModal()

  const [value, setValue] = useState('')
  const today = dayjs(new Date()).format('YYYY-MM-DD')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: () => addListItem(session, value, today),
    onSuccess: () => {
      setValue('')
      addListItemModal.onClose()
      queryClient.invalidateQueries({ queryKey: ['checklist'] })
    },
  })

  const bodyContent = (
    <Input
      type="text"
      name="text"
      value={value}
      placeholder="할 일을 작성해보세요."
      onChange={onChange}
      className={`w-full mb-2`}
    />
  )

  return (
    <Modal
      title="리스트 추가"
      body={bodyContent}
      isOpen={addListItemModal.isOpen}
      onClose={addListItemModal.onClose}
      onSubmit={mutate}
      actionLabel="등록"
    />
  )
}
