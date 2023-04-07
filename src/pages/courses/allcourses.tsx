import Navbar from "@/common/navbar";
import SideBar from "@/common/sideBar";
import { Box } from "@mui/material";
import styles from "../../styles/sidebar.module.css";
import BreadcrumbsHeading from "@/common/breadcrumbs";

const AllCourses = () => {
  return (
    <>
      <Navbar />
      <Box className={styles.combineContentAndSidebar}>
        <SideBar />

        <Box padding={2}>
          {/* breadcumbs */}
          <BreadcrumbsHeading
            First="Home"
            Middle="Courses"
            Text="COURSES"
            Link="/courses/allcourses"
          />

          {/* main content */}
          <Box> All Courses</Box>
        </Box>
      </Box>
    </>
  );
};

export default AllCourses;
