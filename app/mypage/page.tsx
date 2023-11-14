import Image from 'next/image'
import mainBg from '/public/images/main-bg.png'
import React from 'react'
import Tap from '../components/tap/Tap'
import getCurrentUser from '../actions/getCurrentUser'

export default async function page() {
  const currentUser = await getCurrentUser()
  return (
    <>
      <section className="w-full h-[320px] md:h-[420px]">
        <div className="my-container h-full text-white text-right flex flex-col justify-center items-end">
          <div className="w-full h-[320px] md:h-[420px] absolute top-0 left-0 -z-10">
            <Image
              src={mainBg}
              alt="메인 배경이미지"
              quality={100}
              fill
              placeholder="blur"
              className="object-cover brightness-50"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-5">My Page</h1>
          <p className="text-sm md:text-base">
            내 정보 및 활동 내역을 확인해보세요
          </p>
        </div>
      </section>

      <section className="my-10">
        <div className="my-container">
          <div className="text-3xl font-semibold mb-4">
            {currentUser && currentUser.name}님 환영합니다
          </div>
          <div>
            <h1 className="md:text-lg mb-3">나의 활동</h1>
            <div className="mb-10">
              <Tap />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
