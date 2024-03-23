import { cache } from 'react'
import { connectMongo } from '../../lib/database'
import { HotPlace } from '../../../models/hot-place'
import { HotPlaceListingType, UserType } from '@/interfaces/interface'
import { User } from '../../../models/user'

export default cache(async function getStore(storeId: string) {
  try {
    await connectMongo()
    const store = await HotPlace.findOne<HotPlaceListingType>({ _id: storeId })
    const user = await User.findOne<UserType>({ _id: store?.creator })

    return { store, user }
  } catch (error) {
    return null
  }
})
