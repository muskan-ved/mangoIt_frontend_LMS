import { useEffect } from 'react'
import { GenerateToken } from '@/services/auth'
import { useRouter } from 'next/router'
import SpinnerProgress from '@/common/CircularProgressComponent/spinnerComponent'

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
    if (typeof window !== "undefined") {
      if (window.location.pathname === '/' || window.location.pathname === '/home' && !window.localStorage.getItem('loginToken')) {
        router.push('/home');
      } else if (window.location.pathname === '/' && window.localStorage.getItem('loginToken')) {
        router.push('/profile');
      } else if (window.location.pathname === '/login' && !window.localStorage.getItem('loginToken')) {
        router.push('/login');
      }
    }
  }, [])

  return (<SpinnerProgress />)
}
