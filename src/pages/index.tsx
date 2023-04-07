import { Inter } from 'next/font/google'
import Login from './login'
import { useEffect } from 'react'
import { GenerateToken } from '@/services/auth'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  useEffect(() =>{
    GenerateToken()
  },[])
  return (
    <>
    
      <Login/>
    </>
  )
}
