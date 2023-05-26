import React, { useEffect, useState } from "react";
//import { useRouter } from "next/router";
import axios from "axios";

export default function PaymentSuccess() {
    //const router = useRouter();
    // useEffect(() => {
    //     // if (router.isReady) {
    //     //     router.replace("/thankyou");
    //     // } else {
    //     //     router.push("/thankyou");
    //     // }
    // }, []);

    // setTimeout(() => {
    //   // setLoad(false);
    // }, 5000);

    return (
        <div>
            {/* {load ? (
                <Loader />
            ) : ( */}
            <div className="content">
                <div className="wrapper-1">
                    <div className="wrapper-2">
                        <h1>Thank you !</h1>
                        <p>Thanks for Payment. </p>
                        <p>you should receive a confirmation email soon </p>

                        <button className="go-home"
                        //onClick={redirectAfterpay}
                        >
                            go to dashboard
                        </button>
                    </div>
                </div>
            </div>
            {/* )} */}
            <link
                href="https://fonts.googleapis.com/css?family=Kaushan+Script|Source+Sans+Pro"
                rel="stylesheet"
            ></link>
        </div>
    );
}