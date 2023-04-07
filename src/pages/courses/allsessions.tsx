import Navbar from "@/common/navbar";
import SideBar from "@/common/sideBar";
import { Box } from "@mui/material";
import styles from "../../styles/sidebar.module.css";
import BreadcrumbsHeading from "@/common/breadcrumbs";

const AllSessions = () => {
  return (
    <>
      <Navbar />
      <Box className={styles.combineContentAndSidebar}>
        <SideBar />

        <Box padding={2}>
          {/* breadcumbs */}
          <BreadcrumbsHeading
            First="Home"
            Middle="Session"
            Text="SESSION"
            Link="/courses/allsessions"
          />

          {/* main content */}
          <Box> All Session</Box>
        </Box>
      </Box>
    </>
  );
};

export default AllSessions;
