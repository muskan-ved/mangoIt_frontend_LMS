import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import styles from "../../styles/webviewHeaderFooter.module.css";
import { HandleLogout } from "@/services/auth";
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";

export default function WebViewNavbar() {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const router = useRouter();
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    let textcolor = "#E8661B !important";
    let path = router?.pathname;
    let setHomeColor = path.includes("home") ? textcolor : "";
    let setCoursesColor = path.includes("Courses") ? textcolor : "";
    let setsubscribeplan = path.includes("subscribeplan") ? textcolor : "";

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <Typography sx={{
                    color: setHomeColor,
                }}>Home</Typography>
            </MenuItem>
            <MenuItem onClick={() => router.push("/profile")}>
                <Typography sx={{
                    color: setCoursesColor,
                }}>Course</Typography>
            </MenuItem>
            <MenuItem onClick={() => router.push("/profile")}>
                <Typography sx={{ color: setsubscribeplan }}>Subscribe Plan</Typography>
            </MenuItem>
            <MenuItem onClick={HandleLogout}>
                <Typography>My Acount</Typography>
            </MenuItem>
        </Menu>
    );
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className={styles.appBarCss}>
                <Container maxWidth="lg">
                    <Toolbar className={styles.appBarToolbarCss}>
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
                            <Link href="/user/home" ><Typography
                                variant="body2"
                                className={styles.windowFullWidthNameAlign}
                                sx={{
                                    color: setHomeColor,
                                }}
                            >
                                Home
                            </Typography></Link>
                            <Link href="/user/Courses" ><Typography
                                variant="body2"
                                className={styles.windowFullWidthNameAlign}
                                sx={{
                                    color: setCoursesColor,
                                }}
                            >
                                Course
                            </Typography></Link>

                            <Link href="/user/subscribeplan" ><Typography
                                variant="body2"
                                className={styles.windowFullWidthNameAlign}
                                sx={{ color: setsubscribeplan }}
                            >Subscription Plan</Typography></Link>
                            <Link href="/login" ><Typography
                                variant="body2"
                                className={styles.windowFullWidthNameAlign}
                            >My Acount</Typography></Link>

                        </Box>
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {renderMobileMenu}
        </Box>
    );
}
