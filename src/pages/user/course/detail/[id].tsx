// React Import
import React, { useState, useEffect } from "react";

// MUI Import
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Pagination,
  Grid,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// Helper Import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// External Components
import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";
import courseStyle from "../../../../styles/course.module.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { SearchOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { HandleSubscriptionGetByID } from "@/services/subscription";
import { HandleOrderGetByUserID } from "@/services/order";
import { HandleCourseByCourseId } from "@/services/course";
import { capitalizeFirstLetter } from "@/common/CapitalFirstLetter/capitalizeFirstLetter";
import { usePagination } from "@/common/Pagination/paginations";
import moment from "moment";
import Footer from "@/common/LayoutNavigations/footer";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import MenuBookIcon from "@mui/icons-material/MenuBook";

// CSS Import
import profiles from "../../../../styles/profile.module.css";
import styles from "../../../../styles/sidebar.module.css";
import subs from "../../../../styles/subsciption.module.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  marginBottom: "4px",
}));

export default function Couseview() {
  var getId: any;
  const [couseData, setCousedata] = React.useState<any>([]);

  useEffect(() => {
    let localData: any;
    if (typeof window !== "undefined") {
      localData = window.localStorage.getItem("userData");
    }
    if (localData) {
      getId = JSON.parse(localData);
    }
    getCourseData();
  }, []);

  const router = useRouter();

  const getCourseData = async () => {
    const id = router?.query?.id;
    if (id) {
      HandleCourseByCourseId(id).then((data) => {
        setCousedata(data?.data);
      });
    }
  };

  //pagination
  const [row_per_page, set_row_per_page] = React.useState(5);
  let [page, setPage] = React.useState<any>(1);
  function handlerowchange(e: any) {
    set_row_per_page(e.target.value);
  }
  const PER_PAGE = row_per_page;
  const count = Math.ceil(couseData?.length / PER_PAGE);
  const DATA = usePagination(couseData, PER_PAGE);
  const handlePageChange = (e: any, p: any) => {
    setPage(p);
    DATA.jump(p);
  };
 
  console.log("couseDatacouseData", couseData);
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
            Text="VIEW"
            Link="/user/course"
          />

          {/* main content */}
          <Card>
            <CardContent>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={7}>
                    <Item className={subs.shadoww}>
                      <Typography variant="h4" className={subs.useNameFront1}>
                        {capitalizeFirstLetter(couseData && couseData?.title)}
                      </Typography>
                      <br />
                      <Typography variant="subtitle2" className={subs.fontCSS1}>
                        {capitalizeFirstLetter(
                          (couseData && couseData?.long_description) ||
                            (couseData && couseData?.short_description)
                        )}
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={5}>
                    <Box className={subs.maindiv}>
                      {couseData &&
                        couseData?.modules?.map((item: any) => (
                          <Item className={subs.shadoww1}>
                            <Typography
                              variant="subtitle2"
                              className={subs.moduletextcss}
                            >
                              <MenuBookIcon className={subs.iconcss} /> &nbsp;
                              {capitalizeFirstLetter(item?.title)}
                            </Typography>
                          </Item>
                        ))}
                    </Box>
                  </Grid>
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    className={subs.btncss}
                  >
                    Enroll Now
                  </Button>
                  <br />
                </Grid>
                <Grid item xs={7}>
                  <Item className={subs.shadoww}>
                    <Typography variant="h6" className={subs.useNameFront2}>
                      Course Curriculum
                    </Typography>
                  </Item>
                  <Box >
                    {couseData &&
                      couseData?.modules?.map((item: any) =>
                        item?.sessions.map((ea:any) => (
                          // <Item className={subs.shadoww1}>
                            <Typography
                              variant="subtitle2"
                              // className={subs.moduletextcss}
                            >
                              {capitalizeFirstLetter(ea?.title)}
                            </Typography>
                          // </Item>
                        ))
                      )}
                  </Box>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      {/* <Footer /> */}
      <ToastContainer />
    </>
  );
}
