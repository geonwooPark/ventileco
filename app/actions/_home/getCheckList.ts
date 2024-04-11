import { CheckListType } from '@/interfaces/interface'
import { connectMongo } from '@/lib/database'
import { cache } from 'react'
import { CheckList } from '../../../models/checklist'

export default cache(async function getCheckList(date: string) {
  await connectMongo()
  try {
    const result = await CheckList.findOne<CheckListType>({
      date,
    })
    if (!result) return
    const checkList = [...result.list].reverse()

    return checkList
  } catch (error) {
    return []
  }
})
