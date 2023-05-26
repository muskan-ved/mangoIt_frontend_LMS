// MUI Import
import {
    Card,
    Box,
    CardContent,
    Button,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import CreditCardIcon from '@mui/icons-material/CreditCard';
// CSS Import
import styles from "../../../../styles/sidebar.module.css";
import { useEffect, useState } from "react";
import { HandleSubscriptionPayment } from "@/services/subscription";
import { useRouter } from "next/router";

// API services
export default function Subscriptionpayment() {
    const router: any = useRouter();
    //acccept payment
    const AcceptPayment = () => {
        const data: any = ""
        HandleSubscriptionPayment(data).then((result) => {
            router.push(result);
        })
    }
    return (
        <>
            <Navbar />
            <Box className={styles.combineContentAndSidebar}>
                <SideBar />
                <Box className={styles.siteBodyContainer}>
                    {/* breadcumbs */}
                    <BreadcrumbsHeading
                        First="Home"
                        Middle="subscription"
                        Text="SUBSCRIPTION"
                        Link="/learner/sunscriptions"
                    />
                    {/* main content */}
                    <Card>
                        <CardContent>
                            <Box>

                                <Button variant="contained" endIcon={<CreditCardIcon />} onClick={AcceptPayment}>
                                    Pay With Card
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box >
            {/* <Footer /> */}
            < ToastContainer />
        </>
    );
}
