export const getSessionStorageWithExpire = (key: string) => {
  const storage =
    typeof window !== 'undefined' ? sessionStorage.getItem(key) : null

  if (!storage) return

  const values = JSON.parse(storage)
  return values
}
