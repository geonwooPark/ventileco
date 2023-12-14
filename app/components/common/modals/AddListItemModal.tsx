import React, { useState } from 'react'
import Modal from './Modal'
import Input from '../../common/Input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import dayjs from '@/app/utils/dayjs'
import {
  useAddListItemModalActions,
  useAddListItemModalIsOpen,
} from '@/app/hooks/useAddListItemModalStore'
import { toast } from 'react-toastify'

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
    .then((res) => res.json())
    .then((result) => {
      if (result.error) {
        throw new Error(result.error)
      }
    })
}

export default function AddListItemModal() {
  const { data: session } = useSession()
  const addListItemModalIsOpen = useAddListItemModalIsOpen()
  const { onClose: closeAddListItemModal } = useAddListItemModalActions()

  const [value, setValue] = useState('')
  const today = dayjs(new Date()).tz().format('YYYY-MM-DD')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: () => addListItem(session, value, today),
    onSuccess: () => {
      setValue('')
      closeAddListItemModal()
      queryClient.invalidateQueries({ queryKey: ['checklist'] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

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
      title="리스트 추가"
      body={bodyContent}
      isOpen={addListItemModalIsOpen}
      onClose={closeAddListItemModal}
      onSubmit={mutate}
      actionLabel="등록"
    />
  )
}
