import React from 'react'
import Button from '../common/Button'

export default function MyPick() {
  return (
    <div className="hidden md:block">
      <div className="absolute bottom-10 z-10 h-[240px] w-[calc((100%+50px)/2)] bg-gray-100  lg:w-[calc((100%-200px)/2)] xl:w-[calc((100%-400px)/2)]">
        <div className="ml-auto flex h-full w-[340px] flex-col justify-between rounded-xl bg-white p-4 shadow-xl">
          <div>
            <p className="text-lg font-medium">
              추천 도서 <span className="text-blue-600">PICK</span>
            </p>
            <p className="text-sm font-medium text-gray-700">
              내 맘대로 뽑은 읽으면 언젠가 도움 되는 책들...
            </p>
          </div>
          <Button
            type="button"
            level="outline"
            label="더보기"
            size="l"
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  )
}
