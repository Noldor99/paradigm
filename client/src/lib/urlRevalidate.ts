
const url = process.env.NEXT_PUBLIC_REVALIDATE_URL || 'https://paradigm-sand.vercel.app/api'
const secret = process.env.NEXT_PUBLIC_TOKEN_REVALIDATE || 'simple'

export const urlRevalidate = (router: string) => {
  if (router.charAt(0) === '/') {
    router = router.slice(1);
  }

  fetch(
    `${url}/revalidate?path=/${router}&secret=${secret}`
  )
} 