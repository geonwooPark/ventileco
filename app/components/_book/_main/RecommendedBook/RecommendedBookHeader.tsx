import React from 'react'
import Button from '../../../common/Button'
import Link from 'next/link'

export default function RecommendedBookHeader() {
  return (
    <div className="absolute z-10 hidden h-[240px] w-[calc((100%+50px)/2)] md:block lg:w-[calc((100%-200px)/2)] xl:w-[calc((100%-400px)/2)]">
      <div className="card-shadowed ml-auto flex h-full w-[340px] flex-col justify-between rounded-xl p-4 shadow-xl">
        <div>
          <p className="font-point text-lg">Book</p>
          <p className="text-sm font-medium text-beige-dark">
            내 맘대로 뽑은 읽으면 언젠가 도움 되는 책들...
          </p>
        </div>
        <Link href={'/book/recommended'}>
          <Button
            type="button"
            level="primary"
            label="더보기"
            size="l"
            fullWidth={true}
          />
        </Link>
      </div>
    </div>
  )
}
