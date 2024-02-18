import { useQuery } from '@tanstack/react-query'
import { homeKeys } from '@/constants/queryKey'
import { getCommits } from '@/actions/getCommits'
import { BRANCH, PER_PAGE } from '@/constants'

export default function useUpdateQuery() {
  const { data: newUpdateList, isPending } = useQuery({
    queryKey: homeKeys.newUpdates(),
    queryFn: () => getCommits(BRANCH, PER_PAGE),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
    throwOnError: true,
  })

  return { newUpdateList, isPending }
}
