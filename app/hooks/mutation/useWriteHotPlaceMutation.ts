import { hotPlaceKeys } from '@/constants/queryKey'
import { HotPlaceFormDataType } from '@/interfaces/interface'
import { storage } from '@/lib/firebase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

interface WriteHotPlaceParams {
  data: HotPlaceFormDataType
}

const writeHotPlace = async ({ data }: WriteHotPlaceParams) => {
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
  const result = await fetch('/api/hot-place', {
    method: 'POST',
    body: JSON.stringify({ ...data, images: imgs }),
  })
  if (!result.ok) throw new Error('맛집 등록에 실패했습니다!')
}

export default function useWriteHotPlaceMutation() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ data }: WriteHotPlaceParams) => writeHotPlace({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: hotPlaceKeys.hotPlaceListing(),
      })
    },
  })

  return { mutation }
}
