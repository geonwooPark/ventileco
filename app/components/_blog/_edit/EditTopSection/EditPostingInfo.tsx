import React, { useState } from 'react'
import { OmittedPostingType } from '@/interfaces/interface'
import PostingForm from '../../common/PostingInfo/PostingForm'
import Container from '@/components/common/Container'

interface EditPostingInfoProps {
  posting: OmittedPostingType
  setPosting: React.Dispatch<React.SetStateAction<OmittedPostingType>>
  setThumbnailFile: React.Dispatch<React.SetStateAction<File | null>>
  refs: {
    [key: string]: React.RefObject<HTMLDivElement>
  }
}

export default function EditPostingInfo({ ...props }: EditPostingInfoProps) {
  const { posting, setPosting, setThumbnailFile, refs } = props
  const [errorSign, setErrorSign] = useState({
    categoryError: false,
    titleError: false,
    descriptionError: false,
  })

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'title') {
      setPosting((prev) => {
        return { ...prev, title: value }
      })
      if (value.length > 40) {
        setErrorSign({ ...errorSign, titleError: true })
      } else {
        setErrorSign({ ...errorSign, titleError: false })
      }
    }
    if (name === 'description') {
      setPosting((prev) => {
        return { ...prev, description: value }
      })
      if (value.length > 90) {
        setErrorSign({ ...errorSign, descriptionError: true })
      } else {
        setErrorSign({ ...errorSign, descriptionError: false })
      }
    }
  }

  const onThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!files) return
    const file = files[0]
    setThumbnailFile(file)

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if (typeof result === 'string') {
        setPosting({ ...posting, thumbnailURL: result })
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <Container className="absolute inset-0 flex h-full w-full flex-col items-end justify-center">
      <PostingForm
        posting={posting}
        refs={refs}
        errorSign={errorSign}
        setPosting={setPosting}
        onTextChange={onTextChange}
        onThumbnailChange={onThumbnailChange}
      />
    </Container>
  )
}
