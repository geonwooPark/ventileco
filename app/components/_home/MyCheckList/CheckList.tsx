import React from 'react'
import CheckListItem from './CheckListItem'
import { useQuery } from '@tanstack/react-query'
import getData from '@/app/actions/getData'
import { CheckListType } from '@/app/interfaces/interface'
import SkeletonCheckList from './SkeletonCheckList'
import dayjs from '@/app/utils/dayjs'

interface CheckListProps {
  selectedDate: Date
}

export default function CheckList({ selectedDate }: CheckListProps) {
  const date = dayjs(selectedDate).tz().format('YYYY-MM-DD')

  const { data: checkList, isPending } = useQuery({
    queryKey: ['checklist', { date }],
    queryFn: () =>
      getData<CheckListType[]>(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/check-list?date=${date}`,
      ),
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 3, // 3분
    retry: 0,
  })

  const sortedCheckList = checkList?.sort((a, b) => {
    return Number(a.status) - Number(b.status)
  })

  if (isPending) return <SkeletonCheckList />

  return (
    <ul className="h-[220px] overflow-y-scroll hide-scroll">
      {checkList &&
        sortedCheckList?.map((item) => {
          return (
            <CheckListItem
              key={item.listId}
              item={item}
              selectedDate={selectedDate}
            />
          )
        })}
    </ul>
  )
}
