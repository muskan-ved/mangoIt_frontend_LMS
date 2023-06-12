import { GenerateToken } from '@/services/auth'
import { useRouter } from 'next/router'
import About from './about'

export const getHomeRoute = (role: number) => {
  if (role === 1) return '/dashboard'
  else return '/profile'
}

export default function Home() {
  const router: any = useRouter()
  //get authorization token and store in localstorage
  GenerateToken();
  //getHomeRoute(2)
  return (<>
    {router?.asPath === '/' ? (<About />) : router.push(router.asPath)}
  </>)
}
