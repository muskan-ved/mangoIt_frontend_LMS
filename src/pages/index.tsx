import { useEffect } from 'react'
import { GenerateToken } from '@/services/auth'
import { useRouter } from 'next/router'
import SpinnerProgress from '@/common/CircularProgressComponent/spinnerComponent'
import About from './about'

export const getHomeRoute = (role: number) => {
  if (role === 1) return '/dashboard'
  else return '/profile'
}

export default function Home() {
  const router: any = useRouter()
  useEffect(() => {
    //get authorization token and store in localstorage
    GenerateToken();
    //getHomeRoute(2)
    // if (typeof window !== "undefined") {
    //   if (window.location.pathname === '/login' && !window.localStorage.getItem('loginToken')) {
    //     router.push('/login');
    //   }
    // }
  }, [])

  return (<About />)
}
