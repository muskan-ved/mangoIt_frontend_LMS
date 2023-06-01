import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import styles from "../../styles/payment.module.css";
import { useRouter } from "next/router";
import { HandlePaymentDetails } from "@/services/subscription";

export default function PaymentSuccess() {
    const router = useRouter();
    const { session_id } = router.query;
    useEffect(() => {
        getPaymentDetails();
    }, []);

    const reqdata = {
        cs_test_key: session_id
    }
    //get subscription
    const getPaymentDetails = () => {
        HandlePaymentDetails(reqdata).then((paymentdet) => {
            console.log(paymentdet?.orderdetails?.data)
        })
    }
    return (
        <Box>

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
        </Box >
    );
}