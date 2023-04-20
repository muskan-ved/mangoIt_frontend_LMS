import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ProSidebarProvider } from "react-pro-sidebar";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter} from 'next/router';
import { useEffect } from 'react';


export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();

  useEffect(() => {
    
    const handleRouteChange = (url:any, { shallow }:any) => {
      if (!shallow) {
        if (!window.localStorage.getItem('loginToken')) {
         // If token doesn't exist, redirect user to login page
        window.history.pushState(url, '', '/login/');
        }else{
          window.history.pushState(url, '', url);
        }

        console.log(url,"appjs",window.localStorage.getItem('loginToken'))
        // prevent back button from exiting the app
      }
    };

    // add event listener for route change
    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange)
    // cleanup function
    return () => {
      // remove event listener for route change
      router.events.off('hashChangeComplete', handleRouteChange)
      router.events.off('routeChangeStart', handleRouteChange);
    };
  
},[router])

  return  <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
      <ProSidebarProvider>
    <Component {...pageProps} />
    </ProSidebarProvider>
    </GoogleOAuthProvider>
}
