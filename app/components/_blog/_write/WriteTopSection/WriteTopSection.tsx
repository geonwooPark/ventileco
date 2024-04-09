import { OmittedPostingType } from '@/interfaces/interface'
import Image from 'next/image'
import React, { useState } from 'react'
import WritePostingInfo from './WritePostingInfo'

interface WriteTopSectionProps {
  posting: OmittedPostingType
  setPosting: React.Dispatch<React.SetStateAction<OmittedPostingType>>
  setThumbnailFile: React.Dispatch<React.SetStateAction<File | null>>
  refs: {
    [key: string]: React.RefObject<HTMLDivElement>
  }
}

export default function WriteTopSection({ ...props }: WriteTopSectionProps) {
  const [previewURL, setPreviewURL] = useState('')

  return (
    <section className="relative mb-20 h-[320px] w-full md:h-[420px]">
      {previewURL ? (
        <Image
          src={previewURL}
          alt="썸네일이미지"
          fill
          placeholder="blur"
          blurDataURL={process.env.NEXT_PUBLIC_BLUR_URL as string}
          className="object-cover brightness-[0.6]"
        />
      ) : (
        <div className="h-full w-full bg-beige-normal" />
      )}
      <WritePostingInfo {...props} setPreviewURL={setPreviewURL} />
    </section>
  )
}
