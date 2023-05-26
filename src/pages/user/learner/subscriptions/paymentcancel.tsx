import React, { useEffect } from "react";
//import { useRouter } from "next/router";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import styles from "../../../../styles/payment.module.css";
import axios from "axios";


export default function PaymentCancel() {
    //const router = useRouter();
    const [spinner, setShowspinner] = React.useState(false);
    const [btnDisabled, setBtnDisabled] = React.useState(false);
    const [load, setLoad] = React.useState<any>(false);

    //useEffect(() => { }, []);

    return (
        <Box>
            {/* {load ? (
                <Loader />
            ) : ( */}
            <Box className={styles.content}>
                <Box className={styles.wrapper1}>
                    <Box className={styles.wrapper2}>
                        <Typography variant="h3" color={"error"}>
                            Payment failed due to some reason.
                        </Typography>
                        <Button
                            disabled={btnDisabled}
                            className={styles.gohome}
                        // onClick={() => {
                        //     redirectAfterCBQpay();
                        // }}
                        >
                            go to dashboard
                            <Typography
                            >
                                {spinner === true ? <CircularProgress color="warning" /> : ""}
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
            {/* )} */}
        </Box>
    );
}