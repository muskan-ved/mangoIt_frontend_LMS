import SideBar from "@/common/LayoutNavigations/sideBar";
import { Box, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import styles from "../../../styles/sidebar.module.css";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import Footer from "@/common/LayoutNavigations/footer";
import Navbar from "../../../common/LayoutNavigations/navbar";


export default function addSession() {
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
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12} md={12} lg={6} >
                                    <Box component="img" src="../../../addsession_pic.png" />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={6} sx={{ display: "flex" }}>
                                    
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <TextField

                                            // label="Session Name"
                                            placeholder="Session Name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Course</InputLabel>
                                            <Select
                                                label="Course Of Session"
                                            >
                                                <MenuItem value={1}>Course A</MenuItem>
                                                <MenuItem value={2}>Course B</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
            {/* <Footer/> */}
        </>
    );
};


