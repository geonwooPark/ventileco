export default async function getData(url: string) {
  const res = await fetch(url, { method: 'GET' })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
