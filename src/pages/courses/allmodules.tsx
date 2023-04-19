import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";
import { Box } from "@mui/material";
import styles from "../../styles/sidebar.module.css";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";

const AllModules = () => {
  return (
    <>
      <Navbar />
      <Box className={styles.combineContentAndSidebar}>
        <SideBar />

        <Box className={styles.siteBodyContainer}>
          {/* breadcumbs */}
          <BreadcrumbsHeading
            First="Home"
            Middle="Module"
            Text="MODULE"
            Link="/courses/allmodules"
          />

          {/* main content */}
          <Box> All Module</Box>
        </Box>
      </Box>
    </>
  );
};

export default AllModules;
