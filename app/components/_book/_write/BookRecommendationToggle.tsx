import { UseFormRegisterReturn } from 'react-hook-form'
import Toggle from '../../common/Toggle'

interface BookRecommendationToggleProps {
  recommendedRegister: UseFormRegisterReturn<'recommended'>
  recommended?: boolean
}

export default function BookRecommendationToggle({
  recommendedRegister,
  recommended,
}: BookRecommendationToggleProps) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="text-sm text-gray-700">추천하기</span>
      <Toggle register={recommendedRegister} recommended={recommended} />
    </div>
  )
}
