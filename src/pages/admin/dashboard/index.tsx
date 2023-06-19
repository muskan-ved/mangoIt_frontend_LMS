import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";
import { Box, Card, CardContent } from "@mui/material";
import styles from '../../../styles/sidebar.module.css'
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";


const Dashboard = () => {
    return (<>
        <Navbar />
        <Box className={styles.combineContentAndSidebar}>
            <SideBar />
            <Box className={styles.siteBodyContainer}>

                {/* breadcumbs */}
                <BreadcrumbsHeading First='Home' Current='Dashboard' Text="DASHBOARD" Link="/dashboard" />

                {/* main content */}
                <Card><CardContent>
                dashboard</CardContent></Card>
            </Box>

        </Box>
    </>);
}

export default Dashboard;