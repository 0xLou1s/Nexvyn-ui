export async function StarsCount() {
  try {
    const data = await fetch("https://api.github.com/repos/Nexvyn/Nexvyn-ui", {
      next: { revalidate: 86400 },
    })
    const json = await data.json()
    const count = typeof json?.stargazers_count === 'number' ? json.stargazers_count : 1

    const formattedCount =
      count >= 1000
        ? count % 1000 === 0
          ? `${Math.floor(count / 1000)}k`
          : `${(count / 1000).toFixed(1)}k`
        : count.toLocaleString()

    return <>{formattedCount.replace(".0k", "k")}</>
  } catch (e) {
    return <>1</>
  }
}
