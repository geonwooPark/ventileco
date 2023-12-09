export default async function getData<T>(url: string): Promise<T> {
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('데이터를 불러오는데 실패했습니다!')
  }

  return res.json()
}
