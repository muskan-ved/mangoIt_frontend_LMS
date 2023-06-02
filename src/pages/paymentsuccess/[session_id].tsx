import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import styles from "../../styles/payment.module.css";
import { useRouter } from "next/router";
import { CreateUserSubsction, HandlePaymentDetails } from "@/services/subscription";
import { GetUserByemail, HandleProfile } from "@/services/user";
import { CreateOrder } from "@/services/order";
import { CreateTransaction } from "@/services/transaction";
import Link from "next/link";

export default function PaymentSuccess() {
    const router = useRouter();
    const { session_id } = router.query;

    useEffect(() => {
        getPaymentDetails();
    }, []);

    const reqdata = {
        cs_test_key: session_id
    }
    //get payment details
    const getPaymentDetails = () => {
        HandlePaymentDetails(reqdata).then((paymentdet) => {
            const peymentdet = paymentdet?.orderdetails?.data[0];
            var email = localStorage.getItem("user_email");
            GetUserByemail({ email: email }).then((user) => {
                const userdet = user?.data;
                const reqData = {
                    userId: userdet?.id,
                    name: peymentdet?.description,
                    description: peymentdet?.description,
                    price: peymentdet?.amount_total,
                    duration_term: "days",
                    duration_value: 5
                }
                //create subscription
                CreateUserSubsction(reqData).then((subscription) => {
                    //create order
                    const orderData = {
                        user_id: userdet?.id,
                        subscription_id: subscription?.id,
                        payment_type: "Stripe",
                        amount: peymentdet?.amount_total,
                        status: "complete",
                        parent_order_id: 7,
                        order_type: "subscription"
                    }
                    //create order
                    CreateOrder(orderData).then((order) => {
                        const orderdatas = order?.data;
                        //create transaction 
                        const tnxdata =
                        {
                            order_id: orderdatas?.id,
                            user_id: userdet?.id,
                            payment_method: "Stripe",
                            transaction_id: "2cfjdbnf2"
                        }
                        CreateSubscTransaction(tnxdata);
                    });
                });
            });
        })
    }

    const CreateSubscTransaction = (tnxdata: any) => {
        CreateTransaction(tnxdata).then((tnxdet) => {
        });
    };

    return (
        <Box>
            <Box className={styles.content}>
                <Box className={styles.wrapper1}>
                    <Box className={styles.wrapper2}>
                        <Typography variant="h3" className={styles.h1}>Thank you !</Typography>
                        <Typography className={styles.p}>Thanks for Payment. </Typography>
                        <Typography className={styles.p}>you should receive a confirmation email soon </Typography>
                        <Link href={"/user/home"}><Button className={styles.gohome}
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