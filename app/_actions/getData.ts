// Build 시 TypeError: fetch failed 이슈로 사용 안하는 중

export default async function getData(url: string) {
  const res = await fetch(url, { method: 'GET' })

  if (!res.ok) {
    throw new Error('뭔데 이거 진짜ㅡㅡ')
  }

  return res.json()
}
