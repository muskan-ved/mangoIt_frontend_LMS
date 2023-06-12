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
import { capitalizeFirstLetter } from "@/common/CapitalFirstLetter/capitalizeFirstLetter";
import { GenerateToken } from "@/services/auth";
interface MyAppProps {
  siteConfigData: any; // Replace with the actual type of your site config data
}
export default function App({ Component, pageProps, siteConfigData }: AppProps | any) {
  const router = useRouter();
  useEffect(() => {
    //generate authorizationtoken and set localstorage
    GenerateToken();
    console.log("app @@@@@@@@@@@@@", router?.asPath, "app ##################", router?.asPath.includes("/"))
    if (typeof window !== "undefined") {
      router.push(router.asPath);
      //     if (router.asPath.includes('home')) {
      //       router.push("/home");
      //     } else if (router.asPath.includes('courses')) {
      //       router.push("/courses");
      //     } else if (router.asPath.includes('subscribeplan')) {
      //       router.push("/subscribeplan");
      //     } else if (router.asPath.includes('login')) {
      //       router.push("/login");
      //     } else if (router.asPath.includes('register')) {
      //       router.push("/register");
      //     } else if (router.asPath.includes('forgotpassword')) {
      //       router.push("/forgotpassword");
      //     } else if (router.asPath.includes('resetpassword')) {
      //       router.push("/resetpassword");
      //     } else if (router.asPath.includes('paymentcancel')) {
      //       router.push("/paymentcancel");
      //     } else if (router.asPath.includes('paymentsuccess') || router.asPath.includes('checkout') || router.asPath.includes('coursedetails')) {
      //       router.push(router.asPath);
      //     } else if (window.localStorage.getItem("loginToken") && router.asPath.includes('profile')) {
      //       router.push("/user/profile");
      //     } else {
      //       //router.push("/home");
      //       router.push(router.asPath);
      //     }
      //   } else {
      //     router.push(router.asPath);
    }
  }, []);

  const lastSegment = router.pathname.substring(router.pathname.lastIndexOf("/") + 1);

  return (
    <>
      <Head>
        <link rel="icon" href={siteConfigData ? BASE_URL + '/' + siteConfigData?.org_favicon : "/favicon.svg"} />
        <title>{siteConfigData ? `${siteConfigData.title} - ${lastSegment ? capitalizeFirstLetter(lastSegment) : ''}` : `MLMS`}</title>
      </Head>
      <GoogleOAuthProvider
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
      >
        <ProSidebarProvider>
          <Component {...pageProps} siteConfigData={siteConfigData} />
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
  return { ...pageProps, siteConfigData: pageSiteConfigData };
};
