import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ProSidebarProvider } from "react-pro-sidebar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { BASE_URL } from "@/config/config";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [siteConfig,setSiteConfig] = useState<any>('')

  useEffect(() => {
    if (typeof window !== "undefined") {
        const localData:any = window.localStorage.getItem('SiteConfig')
        setSiteConfig(JSON.parse(localData))
      if (!window.localStorage.getItem("loginToken")){
       if(window.location.pathname !== '/register/' && window.location.pathname !== '/forgotpassword/' && window.location.pathname !== '/resetpassword/') {
        // If token doesn't exist, redirect user to login page
        router.push("/login/");
       }
      } else {
        router.push(window.location.pathname);
      }
    }
  }, []);

  return (
    <>
     <Head>
         <link rel="icon" href={siteConfig? BASE_URL+'/'+siteConfig?.org_favicon : "/favicon.svg"} />
         <title>{siteConfig? siteConfig.title : "MLMS"}</title>
        </Head>
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
    >
      <ProSidebarProvider>
        <Component {...pageProps} />
      </ProSidebarProvider>
    </GoogleOAuthProvider>
    </>
  );
}
