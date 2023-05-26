import * as React from "react";
import { AppBar, Button, Container, Divider, IconButton, Paper, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import WebViewNavbar from "@/common/LayoutNavigations/webviewnavbar";
import WebViewFooter from "@/common/LayoutNavigations/webviewfooter";
import styles from '../../styles/webview.module.css'



export default function Login() {



    return (
        <>
            <WebViewNavbar />
            <Box>
                <Container maxWidth="lg">
                    <Box className={styles.wrapper}>
                        <Box className={styles.container}>
                            <Box className={styles.gridcols2}>
                                <Box className={styles.griditem1}>
                                    <Typography className={styles.mainheading}>
                                        We Provide
                                        <Typography className={styles.span} component={'span'}> Smart</Typography>
                                    </Typography>
                                    <Typography className={styles.mainheading}>
                                        <Typography className={styles.span} component={'span'}>Solution </Typography>For Your
                                    </Typography>
                                    <Typography className={styles.mainheading}>
                                        Learning Skills
                                    </Typography>
                                    <Typography className={styles.infotext}>
                                        Build a beautiful, modern website with
                                        flexible components built
                                        from scratch.
                                        Build a beautiful,
                                        modern website with flexible components built
                                        from scratch.
                                    </Typography>
                                    <Box className={styles.btnwrapper}>
                                        <Button className={styles.view_more_btn}>
                                            View More
                                        </Button>
                                    </Box>
                                </Box>
                                <Box className={styles.griditem2}>
                                    <Box className={styles.teamimgwrapper}>
                                        <img src="https://picsum.photos/id/1011/800/450" alt="team-img" />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Box>
                <Container maxWidth="lg">
                    <Box className={styles.iconcard}>
                        <Box className={styles.iconcardarticles}>
                            <Box className={styles.article}>
                                <Box className={styles.articlewrapper}>
                                    <Box className={styles.figure}>
                                        <img src="https://picsum.photos/id/1011/800/450" alt="" />
                                    </Box>
                                    <Box className={styles.articlebody}>
                                        <Typography className={styles.h2}>This is some title</Typography>

                                        <Typography></Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box className={styles.article}>
                                <Box className={styles.article}>
                                    <Box className={styles.articlewrapper}>
                                        <Box className={styles.figure}>
                                            <img src="https://picsum.photos/id/1011/800/450" alt="" />
                                        </Box>
                                        <Box className={styles.articlebody}>
                                            <Typography className={styles.h2}>This is some title</Typography>

                                            <Typography></Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box className={styles.article}>
                                <Box className={styles.article}>
                                    <Box className={styles.articlewrapper}>
                                        <Box className={styles.figure}>
                                            <img src="https://picsum.photos/id/1011/800/450" alt="" />
                                        </Box>
                                        <Box className={styles.articlebody}>
                                            <Typography className={styles.h2}>This is some title</Typography>

                                            <Typography></Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container >
            </Box >
            <Box>
                <Container maxWidth="lg">
                    <Box className={styles.articles}>
                        <Box className={styles.article}>
                            <Box className={styles.articlewrapper}>
                                <Box className={styles.figure}>
                                    <img src="https://picsum.photos/id/1011/800/450" alt="" />
                                </Box>
                                <Box className={styles.articlebody}>
                                    <Typography className={styles.h2}>This is some title</Typography>

                                    <Typography></Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box className={styles.article}>
                            <Box className={styles.article}>
                                <Box className={styles.articlewrapper}>
                                    <Box className={styles.figure}>
                                        <img src="https://picsum.photos/id/1011/800/450" alt="" />
                                    </Box>
                                    <Box className={styles.articlebody}>
                                        <Typography className={styles.h2}>This is some title</Typography>

                                        <Typography></Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className={styles.article}>
                            <Box className={styles.article}>
                                <Box className={styles.articlewrapper}>
                                    <Box className={styles.figure}>
                                        <img src="https://picsum.photos/id/1011/800/450" alt="" />
                                    </Box>
                                    <Box className={styles.articlebody}>
                                        <Typography className={styles.h2}>This is some title</Typography>

                                        <Typography></Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className={styles.article}>
                            <Box className={styles.article}>
                                <Box className={styles.articlewrapper}>
                                    <Box className={styles.figure}>
                                        <img src="https://picsum.photos/id/1011/800/450" alt="" />
                                    </Box>
                                    <Box className={styles.articlebody}>
                                        <Typography className={styles.h2}>This is some title</Typography>

                                        <Typography></Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Box>
                <Container maxWidth="lg">
                    <Box className={styles.articles}>
                        <Box className={styles.article}>
                            <Box className={styles.articlewrapper}>
                                <Box className={styles.figure}>
                                    <img src="https://picsum.photos/id/1011/800/450" alt="" />
                                </Box>
                                <Box className={styles.articlebody}>
                                    <Typography className={styles.h2}>This is some title</Typography>

                                    <Typography></Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box className={styles.article}>
                            <Box className={styles.article}>
                                <Box className={styles.articlewrapper}>
                                    <Box className={styles.figure}>
                                        <img src="https://picsum.photos/id/1011/800/450" alt="" />
                                    </Box>
                                    <Box className={styles.articlebody}>
                                        <Typography className={styles.h2}>This is some title</Typography>

                                        <Typography></Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className={styles.article}>
                            <Box className={styles.article}>
                                <Box className={styles.articlewrapper}>
                                    <Box className={styles.figure}>
                                        <img src="https://picsum.photos/id/1011/800/450" alt="" />
                                    </Box>
                                    <Box className={styles.articlebody}>
                                        <Typography className={styles.h2}>This is some title</Typography>

                                        <Typography></Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className={styles.article}>
                            <Box className={styles.article}>
                                <Box className={styles.articlewrapper}>
                                    <Box className={styles.figure}>
                                        <img src="https://picsum.photos/id/1011/800/450" alt="" />
                                    </Box>
                                    <Box className={styles.articlebody}>
                                        <Typography className={styles.h2}>This is some title</Typography>

                                        <Typography></Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <WebViewFooter />
        </>
    );
}
