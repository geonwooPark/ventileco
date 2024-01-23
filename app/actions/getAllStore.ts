import { connectMongo } from '@/lib/database'
import { HotPlace } from '../../models/hot-place'
import { HotPlaceListingType } from '@/interfaces/interface'
import { cache } from 'react'

export default cache(async function getAllStore() {
  await connectMongo()
  try {
    const hotPlaceListings = await HotPlace.find<HotPlaceListingType>().sort({
      createdAt: -1,
    })

    return hotPlaceListings
  } catch (error) {
    return []
  }
})
