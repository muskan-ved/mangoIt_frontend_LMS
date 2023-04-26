// ***** React Import
import React, { useState } from 'react';

// MUI Import
import { Box, Button, Card, CardContent, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

// External Components
import SideBar from "@/common/LayoutNavigations/sideBar";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import Footer from "@/common/LayoutNavigations/footer";
import Navbar from "../../../common/LayoutNavigations/navbar";
import RichEditor from "@/common/RichTextEditor/textEditor";

// validation import


// CSS Import
import styles from "../../../styles/sidebar.module.css";
import Sessions from "../../../styles/session.module.css"


export default function addSession() {
    const [content, setContent] = useState("");

    const handleContentChange = (value: string) => {
        setContent(value);
    };
    var toolbarOptions = ['bold', 'italic', 'underline', 'strike'];
    const [value, setValue] = useState('');
    return (
        <>
            <Navbar />
            <Box className={styles.combineContentAndSidebar}>
                <SideBar />

                <Box className={styles.siteBodyContainer}>
                    {/* breadcumbs */}
                    <BreadcrumbsHeading
                        First="Home"
                        Middle="Session"
                        Text="SESSION"
                        Link="/sessions/addsession"
                    />
                    {/* main content */}
                    <Card>
                        <CardContent>
                            <Box
                                component="form"
                                method="POST"
                                noValidate
                                autoComplete="off"
                                // onSubmit={handleSubmit(onSubmit)}
                                // onReset={reset}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={12} lg={6} >
                                        <Box component="img" src="/Images/pages/addFeature.jpg" width={'100%'} />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} lg={6} >
                                        <Typography>ADD SESSION</Typography>
                                        <Grid item xs={12} sm={12} md={12} lg={12} className={Sessions.sessionNameGride} >

                                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                                <InputLabel>
                                                    Session Name
                                                </InputLabel>
                                                <TextField
                                                    placeholder="Session Name"
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                                <InputLabel>Course of session</InputLabel>
                                                <FormControl fullWidth>
                                                    <Select>

                                                        <MenuItem value={1}>Course</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} lg={12} mb={2} >
                                            <InputLabel>Module of session</InputLabel>
                                            <FormControl fullWidth>
                                                <Select>
                                                    <MenuItem value={1}></MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} lg={12} mb={2}>
                                            <InputLabel>Description</InputLabel>
                                            <RichEditor
                                                value={content}
                                                onChange={handleContentChange}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} lg={12} mb={2}>
                                            <InputLabel>Attachment</InputLabel>
                                            <Box className={Sessions.sessionAttachmentBox}>
                                                <InputLabel className={Sessions.subbox} >
                                                    <input
                                                        type="file"

                                                        hidden
                                                    /><Typography className={Sessions.sessionAttachments}> Upload</Typography></InputLabel>
                                            </Box>

                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} textAlign={"right"} >
                                            <Button type="submit" size="large" variant="contained">
                                                ADD NEW SESSION
                                            </Button>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
            {/* <Footer/> */}
        </>
    );
};


