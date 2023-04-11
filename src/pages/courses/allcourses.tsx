import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";
import { Box } from "@mui/material";
import styles from "../../styles/sidebar.module.css";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import Footer from "@/common/LayoutNavigations/footer";

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
        <Footer/>
    </>
  );
};

export default AllCourses;
