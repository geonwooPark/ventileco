import { HotPlaceListing } from '@/interfaces/interface'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function StoreListItem({
  hotPlaceListing,
}: {
  hotPlaceListing: HotPlaceListing
}) {
  const { _id, store, category, rating, images } = hotPlaceListing
  return (
    <li className="group cursor-pointer p-2 duration-100 last:mb-0 hover:bg-white/80">
      <Link href={`/hot-place/store/${_id}`} className="flex gap-4">
        <div>
          <div className="relative h-[60px] w-[90px] bg-slate-700">
            <Image
              src={images[0]?.url}
              alt="store-thumbnail"
              fill
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              objectFit="cover"
            />
          </div>
        </div>
        <div>
          <h4 className="mb-0.5 text-sm">{store}</h4>
          <p className="text-xs text-gray-800">{category}</p>
          <div className="flex gap-0.5">
            {/* rating의 정수 부분만큼 완전한 별 갯수 추가 + rating이 소수라면 반 개짜리 추가 */}
            {Array.from({ length: rating }).map((_, i) => (
              <span key={i}>
                <svg
                  width="16"
                  height="15"
                  viewBox="0 0 16 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.04894 0.92705C7.3483 0.00573924 8.6517 0.00573965 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58779 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z"
                    fill="#f3dc4a"
                  />
                </svg>
              </span>
            ))}
            {rating % 1 !== 0 && (
              <span>
                <svg
                  width="8"
                  height="15"
                  viewBox="0 0 8 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 0.236054C7.59931 0.236054 7.19862 0.466381 7.04894 0.927037L5.97937 4.21883C5.8455 4.63086 5.46154 4.90982 5.02832 4.90982H1.56712C0.598394 4.90982 0.195619 6.14943 0.979332 6.71883L3.7795 8.75328C4.12999 9.00792 4.27665 9.45929 4.14277 9.87131L3.0732 13.1631C2.77385 14.0844 3.82833 14.8505 4.61204 14.2811L7.41221 12.2467C7.58746 12.1194 7.79373 12.0557 8 12.0557V0.236054Z"
                    fill="#f3dc4a"
                  />
                </svg>
              </span>
            )}
          </div>
        </div>
      </Link>
    </li>
  )
}
