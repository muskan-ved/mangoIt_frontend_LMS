import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ProSidebarProvider } from "react-pro-sidebar";
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App({ Component, pageProps }: AppProps) {
  
  return  <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
      <ProSidebarProvider>
    <Component {...pageProps} />
    </ProSidebarProvider>
    </GoogleOAuthProvider>
}
