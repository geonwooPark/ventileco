import Button from '@/components/common/Button'
import {
  useCategoryChange,
  useGuChange,
} from '@/hooks/store/useHotPlaceFilterStore'
import { useRouter } from 'next/navigation'
import React from 'react'

interface FilterModalActionButtonProps {
  filteredCategory: string
  filteredGu: string
}

export default function FilterModalActionButton({
  filteredCategory,
  filteredGu,
}: FilterModalActionButtonProps) {
  const router = useRouter()
  const onCategoryChange = useCategoryChange()
  const onGuChange = useGuChange()

  const onReset = () => {
    router.back()
    onCategoryChange('')
    onGuChange('')
  }

  const onClick = () => {
    router.back()
    onCategoryChange(filteredCategory)
    onGuChange(filteredGu)
  }

  return (
    <div className="p-4">
      <div className="flex justify-center gap-2">
        <Button
          type="button"
          level="ghost"
          size="s"
          fullWidth={true}
          label="초기화하기"
          onClick={onReset}
        />
        <Button
          type="button"
          level="primary"
          size="s"
          fullWidth={true}
          label="적용하기"
          onClick={onClick}
        />
      </div>
    </div>
  )
}
