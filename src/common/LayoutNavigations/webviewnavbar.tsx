import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "../../styles/appbar.module.css";
import { HandleLogout } from "@/services/auth";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";


export default function WebViewNavbar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const router = useRouter();
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >

            <MenuItem
                onClick={() => {
                    router.push("/profile"), handleMenuClose();
                }}
            >
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircleOutlinedIcon />
                </IconButton>
                <Typography>Home</Typography>
            </MenuItem>

            <MenuItem
                onClick={() => {
                    router.push("/user/profile"), handleMenuClose();
                }}
            >
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircleOutlinedIcon />
                </IconButton>
                <Typography>Course</Typography>
            </MenuItem>

            <MenuItem onClick={HandleLogout}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <PowerSettingsNewOutlinedIcon />
                </IconButton>
                <Typography>My Acount</Typography>
            </MenuItem>
        </Menu>
    );
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
                <Typography>Home</Typography>
            </MenuItem>
            <MenuItem onClick={() => router.push("/profile")}>

                <Typography>Course</Typography>
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
                                Home
                            </Typography>
                            <Typography
                                variant="body2"
                                className={styles.windowFullWidthNameAlign}
                            >
                                Course
                            </Typography>
                            <Typography
                                variant="body2"
                                className={styles.windowFullWidthNameAlign}
                            >
                                My Acount
                            </Typography>
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
                                <MoreIcon />
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 2 }}
                            >
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
