import React from 'react'
import dynamic from 'next/dynamic'
import getPosting from '@/app/utils/getPosting'
import Image from 'next/image'
import getCurrentUser, { UserType } from '@/app/utils/getCurrentUser'
import AdminController from '@/app/components/AdminController'
import FavoriteBtn from '@/app/components/FavoriteBtn'

const EditorWrapper = dynamic(() => import('../../components/Editor'), {
  ssr: false,
  loading: () => <p className="text-center">Loading ...</p>,
})

export default async function Postings({ params }: { params: { id: string } }) {
  const posting = await getPosting(params.id)
  const currentUser: UserType = await getCurrentUser()

  if (!posting) return

  return (
    <>
      <section className="w-full h-[320px] md:h-[420px]">
        <div className="my-container h-full text-white flex flex-col justify-center items-end">
          <div className="w-full h-[320px] md:h-[420px] absolute top-0 left-0 -z-10">
            {posting.thumbnailURL ? (
              <Image
                src={posting.thumbnailURL}
                alt="썸네일이미지"
                fill
                className="object-cover brightness-50"
              />
            ) : (
              <div className="w-full h-full bg-slate-400"></div>
            )}
          </div>
          <div className="flex items-center mb-2">
            <FavoriteBtn
              currentUser={currentUser}
              postingId={posting._id}
              className="mr-3"
            />
            <p className="text-sm md:text-base">{posting.category}</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-5">
            {posting.title}
          </h1>
          <p className="text-sm md:text-base">{posting.description}</p>
        </div>
      </section>
      <section>
        <div className="my-container h-[500px]">
          <EditorWrapper
            content={posting.content}
            theme="bubble"
            readOnly={true}
          />
          <div>댓글</div>
          {currentUser && currentUser.role === 'admin' && <AdminController />}
        </div>
      </section>
    </>
  )
}
