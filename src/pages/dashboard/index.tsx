import Navbar from "@/common/navbar";
import SideBar from "@/common/sideBar";
import { Box} from "@mui/material";
import styles from '../../styles/sidebar.module.css'
import BreadcrumbsHeading from "@/common/breadcrumbs";


const Dashboard = () => {
    return ( <>
        <Navbar/>
        <Box className={styles.combineContentAndSidebar}>
        <SideBar/>
        <Box padding={2}>

        {/* breadcumbs */}
        <BreadcrumbsHeading First='Home' Middle='Dashboard' Text="DASHBOARD" Link="/dashboard"/>

        {/* main content */}
       <Box > dashboard</Box>
                </Box>
        
        </Box>
        </> );
}
 
export default Dashboard;