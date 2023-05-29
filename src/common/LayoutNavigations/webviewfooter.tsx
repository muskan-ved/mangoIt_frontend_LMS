import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import * as React from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/appbar.module.css";


const WebViewFooter = () => {
    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static" className={styles.appBarCss}>
                <Container maxWidth="lg">
                    <Toolbar>
                        <Box
                            component="img"
                            src="/Images/company_logo.png"
                            width={"180px"}
                            height={"50px"}
                            sx={{ display: { xs: "block", sm: "block" } }}
                            alt="Company logo"
                        />
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            <Typography
                                variant="body2"
                                className={styles.windowFullWidthNameAlign}
                            >
                                Term & Conditions
                            </Typography>
                            <Typography
                                variant="body2"
                                className={styles.windowFullWidthNameAlign}
                            >
                                Privacy Policy
                            </Typography>
                            <Typography
                                variant="body2"
                                className={styles.windowFullWidthNameAlign}
                            >
                                @2023 LMS. All Right Reserved
                            </Typography>
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>

        </Box>
    );
}

export default WebViewFooter;