import dayjs from '@/lib/dayjs'

export const setSessionStorageWithExpire = (key: string, value: any) => {
  const values = { value, expires: dayjs() }
  sessionStorage.setItem(key, JSON.stringify(values))
}
