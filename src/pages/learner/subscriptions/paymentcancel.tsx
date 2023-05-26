import React, { useEffect } from "react";
//import { useRouter } from "next/router";
import { CircularProgress, Typography } from "@mui/material";
import axios from "axios";


export default function PaymentCancel() {
    //const router = useRouter();
    const [spinner, setShowspinner] = React.useState(false);
    const [btnDisabled, setBtnDisabled] = React.useState(false);
    const [load, setLoad] = React.useState<any>(false);

    //useEffect(() => { }, []);

    return (
        <div>
            {/* {load ? (
                <Loader />
            ) : ( */}
            <div className="content">
                <div className="wrapper-1">
                    <div className="wrapper-2">
                        <h1 style={{ color: "red" }}>
                            Payment failed due to some reason.
                        </h1>
                        <button
                            disabled={btnDisabled}
                            className="go-home"
                        // onClick={() => {
                        //     redirectAfterCBQpay();
                        // }}
                        >
                            go to dashboard
                            <Typography
                                style={{
                                    fontSize: "2px",
                                    padding: "10px 50px",
                                    position: "relative",
                                    top: "-35px",
                                }}
                            >
                                {spinner === true ? <CircularProgress color="warning" /> : ""}
                            </Typography>
                        </button>
                    </div>
                </div>
            </div>
            {/* )} */}
        </div>
    );
}