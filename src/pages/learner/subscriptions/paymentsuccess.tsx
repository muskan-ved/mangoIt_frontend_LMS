import React, { useEffect, useState } from "react";
//import { useRouter } from "next/router";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import styles from "../../../styles/payment.module.css";

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
        <Box>
            {/* {load ? (
                <Loader />
            ) : ( */}
            <Box className={styles.content}>
                <Box className={styles.wrapper1}>
                    <Box className={styles.wrapper2}>
                        <Typography variant="h3" className={styles.h1}>Thank you !</Typography>
                        <Typography className={styles.p}>Thanks for Payment. </Typography>
                        <Typography className={styles.p}>you should receive a confirmation email soon </Typography>
                        <Button className={styles.gohome}
                        //onClick={redirectAfterpay}
                        >
                            go to dashboard
                        </Button>
                    </Box>
                </Box>
            </Box>
            {/* )} */}
        </Box >
    );
}