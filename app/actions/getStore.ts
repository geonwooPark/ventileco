import { cache } from 'react'
import { connectMongo } from '../lib/database'
import { HotPlace } from '../../models/hot-place'
import { HotPlaceListing } from '@/interfaces/interface'

export default cache(async function getStore(storeId: string) {
  try {
    await connectMongo()
    const store = await HotPlace.findOne<HotPlaceListing>({ _id: storeId })

    return store
  } catch (error) {
    return null
  }
})
