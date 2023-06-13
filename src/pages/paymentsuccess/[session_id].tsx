import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import styles from "../../styles/payment.module.css";
import { useRouter } from "next/router";
import { HandlePaymentDetails, HandleSubscriptionUpdate } from "@/services/subscription";
import { UpdateOrder } from "@/services/order";
import { CreateTransaction } from "@/services/transaction";
import Link from "next/link";
import moment from "moment";

export default function PaymentSuccess() {
    const router = useRouter();
    const { session_id } = router.query;
    const [loader, setLoadar] = React.useState(true);

    useEffect(() => {
        if (router.isReady) {
            getPaymentDetails();
        }
    }, [router.isReady]);

    const reqdata = {
        cs_test_key: session_id
    }
    //get payment details
    const getPaymentDetails = () => {
        const orderid = localStorage.getItem("orderId");
        HandlePaymentDetails(reqdata).then((paymentdet) => {
            const peymentdet = paymentdet?.orderdetails?.data[0];
            if (paymentdet) {
                const orderdet = {
                    status: "paid",
                    transaction_id: session_id
                }
                UpdateOrder(orderdet, orderid).then((order) => {
                    if (order) {
                        const orderdatas = order?.data;
                        //create transaction 
                        const tnxdata =
                        {
                            user_id: orderdatas?.user_id,
                            order_id: orderdatas?.id,
                            payment_method: "Stripe",
                            transaction_id: session_id,
                            trx_amount: peymentdet?.amount_total / 100,
                            createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                        }
                        CreateTransaction(tnxdata).then((tnxdet) => {
                            if (tnxdet) {
                                const reqdata = {
                                    status: "active",
                                    start_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                                }
                                HandleSubscriptionUpdate(reqdata, orderdatas?.subscription_id).then((subcdet) => {
                                    if (subcdet) {
                                        setTimeout(function () {
                                            router.push(`/user/subscription`);
                                        }, 10000)
                                    }
                                })
                            }
                        });
                    }
                });
            }
        });
    }
    return (
        <Box>
            <Box className={styles.content}>
                <Box className={styles.wrapper1}>
                    <Box className={styles.wrapper2}>
                        <Typography variant="h3" className={styles.h1}>Thank you !</Typography>
                        <Typography className={styles.p}>Thanks for Payment. </Typography>
                        <Typography className={styles.p}>you should receive a confirmation email soon </Typography>
                        <Link href={"/user/subscription"}><Button className={styles.gohome}
                        >
                            go to orders
                        </Button>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box >
    );
}