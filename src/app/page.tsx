"use client";

import { useEffect } from 'react'
import { GenerateToken } from '../services/auth'
import Login from './login/page'

export default function Home() {

  useEffect(() =>{

   const ss = GenerateToken()
 
      console.log(ss,"3333333333333333333")

  },[])


  return (
    < >
      <Login/>
    </>
  )
}
