import dayjs from '@/app/utils/dayjs'

export const setSessionStorageWithExpire = (key: string, value: any) => {
  const values = { value, expires: dayjs() }
  sessionStorage.setItem(key, JSON.stringify(values))
}
