import Navbar from "@/common/navbar";
import SideBar from "@/common/sideBar";
import { Box } from "@mui/material";
import styles from "../../styles/sidebar.module.css";
import BreadcrumbsHeading from "@/common/breadcrumbs";

const AllModules = () => {
  return (
    <>
      <Navbar />
      <Box className={styles.combineContentAndSidebar}>
        <SideBar />

        <Box padding={2}>
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
