export const getCommits = async (BRANCH: string, PER_PAGE: number) => {
  const res = await fetch(
    `https://api.github.com/repos/geonwooPark/myWebsite/commits?sha=${BRANCH}&per_page=${PER_PAGE}`,
    {
      headers: {
        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_API_KEY}`,
      },
    },
  )
  if (!res.ok) {
    throw new Error('데이터를 불러오는데 실패했습니다!')
  }
  return res.json()
}
