import * as React from "react";
import { Badge, Button, Container, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WebViewNavbar from "@/common/LayoutNavigations/webviewnavbar";
import WebViewFooter from "@/common/LayoutNavigations/webviewfooter";
import styles from '../styles/webview.module.css'
import { SubscribtionPanCard } from "@/common/ResuableCardCmp/coursescard";
import { GetAllSubsctionPlans } from "@/services/subscription";
export default function HomePage() {
    const [subsdata, setsubsdata] = React.useState([]);
    React.useEffect(() => {
        getSubscribtion();
    }, []);

    //get subscription
    const getSubscribtion = () => {
        GetAllSubsctionPlans().then((subscdata) => {
            setsubsdata(subscdata)
        })
    }

    return (
        <>
            {/*header*/}
            <WebViewNavbar />
            {/*subscribe plan*/}
            <Box className={styles.freecourses} mt={5}>
                <Container maxWidth="lg">
                    <Box className={styles.headerbox}>
                        <Typography variant="h6" gutterBottom className={styles.h6}>
                            Our Subscription Plan
                        </Typography>
                        <Divider className={styles.divder} />
                    </Box>
                    <Box p={5}>
                        {subsdata?.map((data, key) => {
                            return (<SubscribtionPanCard subsdata={data} key={key} />)
                        })
                        }
                    </Box>
                </Container>
            </Box>
            {/*footer*/}
            <WebViewFooter />
        </>
    );
}
