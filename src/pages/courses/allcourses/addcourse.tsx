import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";
import styles from "../../../styles/sidebar.module.css";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Footer from "@/common/LayoutNavigations/footer";
import { useState } from "react";
import RichEditor from "@/common/RichTextEditor/textEditor";

const AddCourse = () => {
  const [content, setContent] = useState("");

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  return (
    <>
      <Navbar />
      <Box className={styles.combineContentAndSidebar}>
        <SideBar />

        <Box className={styles.siteBodyContainer}>
          {/* breadcumbs */}
          <BreadcrumbsHeading
            First="Home"
            Middle="Courses"
            Text="Courses"
            Link="/courses/allcourses/addcourse"
          />

          {/* main content */}
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <Box
                    component="img"
                    src="/Images/pages/addFeature.jpg"
                    width={"100%"}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    sx={{
                      display: "flex",
                      mb: 2,
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Grid item xs={12} sm={12} md={6} lg={5}>
                      <InputLabel>Course Name</InputLabel>
                      <TextField placeholder="Course Name" fullWidth />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={5}>
                      <InputLabel>Type</InputLabel>
                      <FormControl fullWidth>
                        <Select>
                          <MenuItem value={1}>Type</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    sx={{
                      display: "flex",
                      mb: 2,
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Grid item xs={12} sm={12} md={12} lg={5}>
                      <InputLabel>Status</InputLabel>
                      <FormControl fullWidth>
                        <Select>
                          <MenuItem value={1}></MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={5}>
                      <InputLabel>Status</InputLabel>
                      <RichEditor
                        value={content}
                        onChange={handleContentChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default AddCourse;
