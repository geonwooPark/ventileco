import React from 'react'
import { StarSmall, StarSmallLeft } from '../../../../../public/svgs'

interface StoreRatingProps {
  rating: number
}

export default function StoreRating({ rating }: StoreRatingProps) {
  return (
    <div className="flex gap-0.5">
      {/* rating의 정수 부분만큼 완전한 별 갯수 추가 + rating이 소수라면 반 개짜리 추가 */}
      {Array.from({ length: rating }).map((_, i) => (
        <span key={i}>
          <StarSmall />
        </span>
      ))}
      {rating % 1 !== 0 && (
        <span>
          <StarSmallLeft />
        </span>
      )}
    </div>
  )
}
