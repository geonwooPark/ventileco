import { HotPlaceListingType } from '@/interfaces/interface'
import Image from 'next/image'
import React from 'react'
import StoreRating from '../../StoreModal/StoreDetail/StoreRating'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface StoreListItemProps {
  hotPlaceListing: HotPlaceListingType
}

export default function StoreListItem({ hotPlaceListing }: StoreListItemProps) {
  const { _id, store, category, rating, images } = hotPlaceListing

  const router = useRouter()
  const { data: session } = useSession()

  return (
    <li className="group relative cursor-pointer p-2 duration-100 last:mb-0 hover:bg-white/80">
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
        <div className="w-full">
          <h4 className="mb-0.5 text-sm">{store}</h4>
          <p className="text-xs text-gray-800">{category}</p>
          <StoreRating rating={rating} />
        </div>
      </Link>
      {session && session.user.role === 'admin' && (
        <button
          onClick={() => router.push(`/hot-place/delete/${_id}`)}
          className="absolute bottom-4 right-2 hidden text-xs text-red-400 group-hover:block"
        >
          삭제
        </button>
      )}
    </li>
  )
}
