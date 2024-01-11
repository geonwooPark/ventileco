import { HotPlaceFormData } from '@/interfaces/interface'
import { useRouter } from 'next/navigation'
import React from 'react'
import DaumPostcode from 'react-daum-postcode'
import { UseFormClearErrors, UseFormSetValue } from 'react-hook-form'

interface AddressResearchProps {
  setShowAddressResearch: React.Dispatch<React.SetStateAction<boolean>>
  setValue: UseFormSetValue<HotPlaceFormData>
  clearErrors: UseFormClearErrors<HotPlaceFormData>
}

export default function AddressResearch({
  setShowAddressResearch,
  setValue,
  clearErrors,
}: AddressResearchProps) {
  const router = useRouter()
  return (
    <div
      onClick={() => setShowAddressResearch(false)}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50"
    >
      <div>
        <DaumPostcode
          onComplete={async (data) => {
            const { address } = data

            // 주소로 좌표 구하기
            await fetch(
              'https://dapi.kakao.com/v2/local/search/address.json?query=' +
                address,
              {
                headers: {
                  Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
                },
              },
            )
              .then((res) => res.json())
              .then((result) => {
                const { x, y }: { x: number; y: number } = result.documents[0]
                setValue('coordinate', { latitude: y, longitude: x })
                setValue('address', address)
                setShowAddressResearch(false)
                clearErrors('address')
                router.back()
              })
          }}
        />
      </div>
    </div>
  )
}
