import Login from './login'
import { useEffect } from 'react'
import { GenerateToken } from '@/services/auth'
import {useRouter} from 'next/navigation'
import SpinnerProgress from '@/common/CircularProgressComponent/spinnerComponent'

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    GenerateToken()
    if (typeof window !== "undefined" && !window.localStorage.getItem('loginToken')) {
      // If token exists, redirect user to dashboard page
      router.push('/login')
    }else{
      router.push('/profile')
    }
      // if (typeof window !== "undefined" ) {
      //   if (window.location.pathname === '/' && !window.localStorage.getItem('loginToken')) { 
      //     router.push('/login')
      //   }
      //   else{
      //     router.push(window.location.pathname)
      //   }
      // }
    
  },[])

  return (
    <>
<Login/>
    </>
  )
}
