import { hotPlaceKeys } from '@/constants/queryKey'
import { HotPlaceFormDataType, ImageType } from '@/interfaces/interface'
import { storage } from '@/lib/firebase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

interface CreateHotPlaceParams {
  data: HotPlaceFormDataType
  storeId: string
  deletedImagesArray: ImageType[]
  creator: string
  prevImagesArray: ImageType[]
}

const editHotPlace = async ({
  data,
  storeId,
  deletedImagesArray,
  creator,
  prevImagesArray,
}: CreateHotPlaceParams) => {
  const { store, images } = data

  // 이미지들 스토리지에 업로드
  const imgs: ImageType[] = [...prevImagesArray]
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
    method: 'PUT',
    body: JSON.stringify({
      data: { ...data, images: imgs },
      deletedImagesArray,
      storeId,
      creator,
    }),
  })
  if (!result.ok) throw new Error('스토어 수정에 실패했습니다!')
}

export default function useEditHotPlaceMutation() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({
      data,
      storeId,
      deletedImagesArray,
      creator,
      prevImagesArray,
    }: CreateHotPlaceParams) =>
      editHotPlace({
        data,
        storeId,
        deletedImagesArray,
        creator,
        prevImagesArray,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: hotPlaceKeys.hotPlaceListing(),
      })
    },
  })

  return { mutation }
}
