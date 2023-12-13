import { OmittedPostingType } from '@/app/interfaces/interface'
import Image from 'next/image'
import subBg from '/public/images/sub-bg.png'
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
    <section className="relative w-full h-[320px] md:h-[420px] mb-20">
      <Image
        src={previewURL ? previewURL : subBg}
        alt="썸네일이미지"
        fill
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
        className="object-cover brightness-50"
      />
      <WritePostingInfo {...props} setPreviewURL={setPreviewURL} />
    </section>
  )
}
