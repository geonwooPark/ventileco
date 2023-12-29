export const getSessionStorageWithExpire = (key: string) => {
  const storage = sessionStorage.getItem(key)
  if (!storage) return

  const values = JSON.parse(storage)
  return values
}
