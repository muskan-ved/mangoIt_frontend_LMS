import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ProSidebarProvider } from "react-pro-sidebar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { BASE_URL } from "@/config/config";

import { AppContext } from 'next/app';
import { NextPageContext } from 'next';

interface MyAppProps {
  siteConfigData: any; // Replace with the actual type of your site config data
}

export default function App({ Component, pageProps, siteConfigData }: AppProps | any) {
  const router = useRouter();
  const [siteConfig,setSiteConfig] = useState<any>('')
// console.log(siteConfigData,"siteConsiteConfigDatafigData")
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
         <link rel="icon" href={siteConfigData? BASE_URL+'/'+siteConfigData?.org_favicon : "/favicon.svg"} />
         <title>{siteConfigData? siteConfigData.title : "MLMS"}</title>
        </Head>
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
    >
      <ProSidebarProvider>
        <Component {...pageProps} siteConfigData={siteConfigData}/>
      </ProSidebarProvider>
    </GoogleOAuthProvider>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext): Promise<MyAppProps> => {
  const { Component, ctx } = appContext;

  // Check if the page component has its own getInitialProps method
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx as NextPageContext) : {};

  // Retrieve the siteConfigData from the SiteConfigPage props
  const { siteConfigData: pageSiteConfigData } = pageProps as any;
console.log(pageSiteConfigData,"pageSiteConfigData")
  return { ...pageProps, siteConfigData: pageSiteConfigData  };
};
