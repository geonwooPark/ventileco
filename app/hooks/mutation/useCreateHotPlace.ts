import { HotPlaceFormData } from '@/interfaces/interface'
import { storage } from '@/lib/firebase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useRouter } from 'next/navigation'

const createHotPlace = async (data: HotPlaceFormData) => {
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

export default function useCreateHotPlace() {
  const router = useRouter()

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (data: HotPlaceFormData) => createHotPlace(data),
  })

  return { mutation }
}
