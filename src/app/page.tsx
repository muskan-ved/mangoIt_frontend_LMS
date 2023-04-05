"use client";

// ** Import React
import { useEffect } from 'react'

//  ** Services Import
import { GenerateToken } from '../services/auth'
import Login from './login/page'

export default function Home() {

  useEffect(() =>{
    GenerateToken()
  },[])

  return (
    < >
      <Login/>
    </>
  )
}
