import { HotPlaceFormDataType } from '@/interfaces/interface'
import React, { useEffect, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'

interface FindAddressByStoreNameProps {
  setValue: UseFormSetValue<HotPlaceFormDataType>
  keyword: string
}

export default function FindAddressByStoreName({
  setValue,
  keyword,
}: FindAddressByStoreNameProps) {
  const [storeList, setStoreList] = useState<any>([])
  const [showStoreList, setShowStoreList] = useState(false)

  const onClick = (keyword: string, address: string, x: string, y: string) => {
    setValue('store', keyword)
    setValue('address', address)
    setValue('coordinate', { latitude: Number(y), longitude: Number(x) })
    setShowStoreList(false)
  }

  useEffect(() => {
    if (!keyword) return

    const getAddress = async () => {
      await fetch(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
          },
        },
      )
        .then((res) => res.json())
        .then((result) => {
          const res = result.documents.filter(
            (item: any) =>
              item.category_group_name === '음식점' ||
              item.category_group_name === '카페',
          )
          setStoreList(res)
          setShowStoreList(true)
          console.log(keyword)
        })
    }
    const timer = setTimeout(() => getAddress(), 300)

    return () => clearTimeout(timer)
  }, [keyword])

  return (
    keyword.length !== 0 &&
    storeList.length !== 0 &&
    showStoreList && (
      <div className="absolute z-[200] w-full cursor-pointer rounded-md border bg-white">
        <ul className="max-h-[220px] overflow-scroll">
          {storeList.map((store: any, i: number) => (
            <li
              key={i}
              className="border-b px-2 py-1 last:border-none"
              onClick={() =>
                onClick(store.place_name, store.address_name, store.x, store.y)
              }
            >
              <div className="mb-1 text-sm text-gray-700">
                {store.place_name}
              </div>
              <div className="px-2 text-xs text-gray-400">
                {store.address_name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  )
}
