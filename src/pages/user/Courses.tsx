import * as React from "react";
import { Badge, Button, Container, Divider, FormControl, Grid, InputLabel, Paper, Select, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WebViewNavbar from "@/common/LayoutNavigations/webviewnavbar";
import WebViewFooter from "@/common/LayoutNavigations/webviewfooter";
import styles from '../../styles/webview.module.css'
import Carousel from 'react-material-ui-carousel'
import LockIcon from '@mui/icons-material/Lock';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SchoolIcon from '@mui/icons-material/School';
import { MenuItem } from "react-pro-sidebar";

export default function Courses() {
    const landingpagecontent = {
        title: 'Title of a longer featured blog post',
        description:
            "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
        image: 'https://source.unsplash.com/random',
        imageText: 'main image description',
        linkText: 'Continue reading…',
    };
    return (
        <>
            {/*header*/}
            <WebViewNavbar />
            {/*Landing page carousel*/}
            <Paper
                sx={{
                    position: 'relative',
                    backgroundColor: 'grey.800',
                    color: '#fff',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${landingpagecontent.image})`,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: 'rgba(0,0,0,.3)',
                    }}
                />
                <Grid container>
                    <Grid item md={6}>
                        <Box
                            sx={{
                                position: 'relative',
                                p: { xs: 6, md: 6 },
                                pr: { md: 0 },
                            }}
                        >
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
            {/*how it works page*/}
            <Box>
                <Container maxWidth="lg">
                    <Grid>
                        <Stack style={{ marginTop: "25px" }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="name">
                                            Phone Number
                                            {/* <span className="err_str">*</span> */}
                                        </InputLabel>

                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="name">
                                            Email
                                            {/* <span className="err_str">*</span> */}
                                        </InputLabel>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Grid>
                    <Box className={styles.headerbox}>
                        <Typography variant="h6" gutterBottom className={styles.h6}>
                            Top Enrolled Courses
                        </Typography>
                        <Divider className={styles.divder} />
                    </Box>
                    <Box className={styles.articles}>
                        <Box className={styles.article}>
                            <Box className={styles.articlewrapper}>
                                <Box className={styles.figure}>
                                    <img src="https://picsum.photos/id/1011/800/450" alt="" />
                                </Box>
                                <Box className={styles.articlebody}>
                                    <Typography className={styles.h2}>HTML Course</Typography>
                                    <Typography className={styles.h5}>Type : Free</Typography>
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
                                        <Typography className={styles.h2}>HTML Course</Typography>
                                        <Typography className={styles.h5}>Type : Free</Typography>
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
                                        <Typography className={styles.h2}>HTML Course</Typography>
                                        <Typography className={styles.h5}>Type : Free</Typography>
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
                                        <Typography className={styles.h2}>HTML Course</Typography>
                                        <Typography className={styles.h5}>Type : Free</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Grid>
                        <Stack style={{ marginTop: "25px" }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="name">
                                            Phone Number
                                            {/* <span className="err_str">*</span> */}
                                        </InputLabel>

                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="name">
                                            Email
                                            {/* <span className="err_str">*</span> */}
                                        </InputLabel>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Grid>
                </Container >
            </Box >
            <WebViewFooter />
        </>
    );
}
