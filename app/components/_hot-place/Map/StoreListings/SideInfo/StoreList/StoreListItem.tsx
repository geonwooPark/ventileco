import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { HotPlaceListingType } from '@/interfaces/interface'
import StoreRating from '@/components/_hot-place/StoreModal/StoreDetail/StoreRating'

interface StoreListItemProps {
  hotPlaceListing: HotPlaceListingType
}

export default function StoreListItem({ hotPlaceListing }: StoreListItemProps) {
  const { _id, store, category, rating, images, creator } = hotPlaceListing

  const router = useRouter()
  const { data: session } = useSession()

  return (
    <li className="group relative cursor-pointer rounded-md p-2 duration-100 last:mb-0 hover:bg-beige-normal">
      <Link href={`/hot-place/store/${_id}`} className="flex gap-4">
        <div>
          <div className="relative h-[60px] w-[90px] overflow-hidden rounded-md bg-slate-700">
            <Image
              src={images[0]?.url}
              alt="store-thumbnail"
              fill
              placeholder="blur"
              blurDataURL={process.env.NEXT_PUBLIC_BLUR_URL as string}
              objectFit="cover"
            />
          </div>
        </div>
        <div className="w-full">
          <p className="mb-0.5 text-sm">
            {store.length > 12 ? store.slice(0, 12) + '...' : store}
          </p>
          <p className="text-xs text-beige-dark">{category}</p>
          <StoreRating rating={rating} />
        </div>
      </Link>
      {session &&
        (session.user.role === 'admin' || creator === session.user.id) && (
          <div className="absolute bottom-4 right-2 hidden gap-2 group-hover:flex">
            <button
              onClick={() => router.push(`/hot-place/edit/${_id}`)}
              className="text-xs text-active"
            >
              수정
            </button>
            <button
              onClick={() =>
                router.push(`/hot-place/delete/${_id}?creator=${creator}`)
              }
              className="text-xs text-red-600 group-hover:block"
            >
              삭제
            </button>
          </div>
        )}
    </li>
  )
}
