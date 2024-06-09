import React, { useState } from 'react'
import Modal from './Modal/Modal'
import Input from '../Input/Input'
import { useSession } from 'next-auth/react'
import dayjs from '@/lib/dayjs'
import useAddCheckListItemMutation from '@/hooks/mutation/useAddCheckListItemMutation'
import { useModalActions } from '@/hooks/store/useModalStore'
import Button from '../Button'
import { useAlert } from '@/hooks/useAlert'

export default function AddListItemModal() {
  const { data: session } = useSession()
  const alert = useAlert()
  const { removeModal } = useModalActions()

  const [value, setValue] = useState('')
  const today = dayjs(new Date()).tz().format('YYYY-MM-DD')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const { mutation: addCheckListItemMutation } = useAddCheckListItemMutation({
    today,
  })

  const addCheckListItem = () => {
    if (session?.user.role !== 'admin') return

    addCheckListItemMutation.mutate(
      { value, today },
      {
        onSuccess: () => {
          setValue('')
          removeModal()
        },
        onError: (error) => {
          alert.error(error.message)
        },
      },
    )
  }

  return (
    <Modal>
      <Modal.Dim>
        <Modal.Card size="small">
          <Modal.Header>
            <Modal.Title>Add List</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Content>
            <div className="space-y-4">
              <Input
                type="text"
                name="text"
                value={value}
                placeholder="할 일을 작성해보세요."
                onChange={onChange}
                className={`w-full`}
              />
              <Button
                type="button"
                level="primary"
                size="s"
                label="등록하기"
                fullWidth={true}
                onClick={addCheckListItem}
              />
            </div>
          </Modal.Content>
        </Modal.Card>
      </Modal.Dim>
    </Modal>
  )
}
