import { useRouter } from 'next/router'
import About from './about'
import { GenerateToken } from '@/services/auth'
export const getHomeRoute = (role: number) => {
  if (role === 1) return '/dashboard'
  else return '/profile'
}
export default function Home() {
  const router: any = useRouter()
  //getHomeRoute(2)
  GenerateToken();
  console.log("index @@@@@@@@@@@@@", router?.asPath, "index ##################", router?.asPath.includes("/"))
  if (typeof window !== "undefined") {
    if (router?.asPath === '/' || router?.asPath.includes("/")) {
      return (<About />)
    } else {
      router.push(router.asPath);
    }
  }
  return (<></>)
}



