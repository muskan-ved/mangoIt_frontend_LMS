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
    // getHomeRoute(2)
    if (typeof window !== "undefined") {
      if (window.location.pathname === '/' && !window.localStorage.getItem('loginToken') || !window.localStorage.getItem('loginToken')) {
        // If token exists, redirect user to dashboard page
        router.push('/login/')
      } else if (window.location.pathname === '/' && window.localStorage.getItem('loginToken')) {
        router.push('/profile')
      } else if (window.location.pathname === '/user/home') {
        router.push('/user/home')
      }
    }
    GenerateToken()
  }, [])

  return (<SpinnerProgress />)
}
