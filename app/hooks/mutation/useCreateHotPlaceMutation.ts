import { hotPlaceKeys } from '@/constants/queryKey'
import { HotPlaceFormDataType } from '@/interfaces/interface'
import { storage } from '@/lib/firebase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { Session } from 'next-auth'

interface CreateHotPlaceParams {
  data: HotPlaceFormDataType
  session: Session | null
}

const createHotPlace = async ({ data, session }: CreateHotPlaceParams) => {
  if (!session) throw new Error('권한이 없습니다!')

  const { store, images } = data

  // 이미지들 스토리지에 업로드
  const imgs: { path: string; url: string }[] = []
  for (const image of images) {
    const imgRef = ref(
      storage,
      `hot-place/${store}/${Date.now()} - ${image.name}`,
    )
    const result = await uploadBytes(imgRef, image)
    const fileUrl = await getDownloadURL(ref(storage, result.ref.fullPath))

    imgs.push({ url: fileUrl, path: result.ref.fullPath })
  }

  // 데이터들 DB에 저장
  await fetch('/api/hot-place', {
    method: 'POST',
    body: JSON.stringify({ ...data, images: imgs }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.error) {
        throw new Error(result.error)
      }
    })
}

export default function useCreateHotPlaceMutation() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ data, session }: CreateHotPlaceParams) =>
      createHotPlace({ data, session }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: hotPlaceKeys.hotPlaceListing(),
      })
    },
  })

  return { mutation }
}
