import { UseFormRegisterReturn } from 'react-hook-form'
import Toggle from '../../common/Toggle'

interface BookRecommendationToggleProps {
  recommendedRegister: UseFormRegisterReturn<'recommended'>
}

export default function BookRecommendationToggle({
  recommendedRegister,
}: BookRecommendationToggleProps) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="text-sm text-gray-700">추천하기</span>
      <Toggle register={recommendedRegister} />
    </div>
  )
}
