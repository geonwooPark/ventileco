import { FavoriteType } from '../_interfaces/interface'
import { connectMongo } from '../_utils/database'
import getCurrentUser from './getCurrentUser'
import { Favorite } from '@/models/favorite'

export default async function getMyFavList() {
  const currentUser = await getCurrentUser()

  try {
    await connectMongo()
    const favoriteList = await Favorite.find<FavoriteType>({
      userId: currentUser._id,
    }).sort({ createdAt: -1 })

    return favoriteList
  } catch (error) {
    return []
  }
}
