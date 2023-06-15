// React Import
import React, { useState, useEffect, Fragment } from "react";

// MUI Import
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// Helper Import
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingButton } from "@mui/lab";

// External Components
import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {
  SubscriptionGetByUserID,
} from "@/services/subscription";
import {
  HandleOrderGetByUserID,
} from "@/services/order";
import { GetTransactiondet } from "@/services/transaction";
import { capitalizeFirstLetter } from "@/common/CapitalFirstLetter/capitalizeFirstLetter";
import { usePagination } from "@/common/Pagination/paginations";
import moment from "moment";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";

// CSS Import
import profiles from "../../../styles/profile.module.css";
import styles from "../../../styles/sidebar.module.css";
import subs from "../../../styles/subscription.module.css";
import Link from "next/link";
import CircularProgressBar from "@/common/CircularProcess/circularProgressBar";
import { AlertSubscriptionDialog } from "@/common/SubscriptionStatus/subscriptionManage";
import { handleSortData } from "@/common/Sorting/sorting";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { GetdateAfterOneMonth } from "@/common/commonfunctions/connonfun";
import { Dateformat } from "../../../common/commonfunctions/connonfun";
import { useTheme } from "@mui/material/styles";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import { CourseCardListView } from "@/common/ResuableCardCmp/coursescard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function View() {
  const [rows, setRows] = useState<any>([]);
  const [subsData, setSubsdata] = useState<any>([]);
  const [trxdata, settrxdata] = useState<any>([]);
  const [toggle, setToggle] = useState<boolean>(false);
  const [isLoadingButton, setLoadingButton] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [dialougeopen, setDialougeopenOpen] = useState(false);
  const [subsId, setSubId] = useState<any>();
  const [userId, setuserId] = useState<any>();
  const [spinner, setshowspinner] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    let localData: any;
    var getId: any;

    if (typeof window !== "undefined") {
      localData = window.localStorage.getItem("userData");
    }
    if (localData) {
      getId = JSON.parse(localData);
    }
    // getAllCourseData(getId?.id);
    getSubsData();
    setuserId(getId?.id);
  }, [userId]);

  const router = useRouter();
  const getSubsData = async () => {
    if (userId) {
      SubscriptionGetByUserID(userId).then((data: any) => {
        setSubsdata(data?.data);
      });
    }
  };

  //pagination

  const getAllCourseData = (id: any) => {
    HandleOrderGetByUserID(id).then((subs) => {
      setRows(subs.data.reverse());
    });
  };

  const handleSort = (rowsData: any) => {
    const sortData = handleSortData(rowsData);
    setRows(sortData);
    setToggle(!toggle);
  };
  //open dialouge box view popup
  const handleClickOpenDialouge = (item: any) => {
    setDialougeopenOpen(true);
    GetTransactiondet(item?.id).then((result) => {
      if (result) {
        settrxdata(result?.data);
      }
    });
  };
  const handleClose = () => {
    setDialougeopenOpen(false);
  };

  return (
    <>
      <Navbar />
      <Box className={styles.combineContentAndSidebar}>
        <SideBar />
        <Box className={styles.siteBodyContainer}>
          {/* breadcumbs */}
          <Box className={subs.maindisplay}>
            <BreadcrumbsHeading
              First="Home"
              Middle="Dashboard"
              Text="DASHBOARD"
              Link="/user/dashboard"
            />
          </Box>
          {/* main content */}
          <Card>
            <CardContent>
              <Typography variant="h5" className={subs.headingcss}>
                Your Subscription Plan
              </Typography>
              <br />
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Item className={subs.maindisplay}>
                      <Typography
                        variant="subtitle1"
                        className={subs.useNameFront}
                      >
                        Subscription Name&nbsp;&nbsp;&emsp;&emsp;:
                      </Typography>
                      &emsp;
                      <Typography variant="subtitle2" className={subs.fontCSS}>
                        {capitalizeFirstLetter(subsData && subsData?.name)}
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Item className={subs.maindisplay}>
                      <Typography
                        variant="subtitle1"
                        className={subs.useNameFront}
                      >
                        Subscription Type &nbsp;&nbsp;&emsp;&emsp; :
                      </Typography>
                      &emsp;
                      <Typography variant="subtitle2" className={subs.fontCSS}>
                        {capitalizeFirstLetter(
                          subsData && subsData?.duration_term
                        )}
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Item className={subs.maindisplay}>
                      <Typography
                        variant="subtitle1"
                        className={subs.useNameFront}
                      >
                        Next pay date&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;:
                      </Typography>
                      &emsp;
                      <Typography variant="subtitle2" className={subs.fontCSS}>
                        {moment(
                          GetdateAfterOneMonth(subsData?.start_date)
                        ).format("DD, MMMM YYYY")}
                      </Typography>
                    </Item>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
            <br />
            <br />
            <hr />
            <br />
            <Card>
              <CardContent>
                <Typography variant="h5" className={subs.headingcss}>
                  Enroll Course
                </Typography>
                <Box className={profiles.userData}>
                  <Paper
                    sx={{
                      position: "relative",
                      backgroundColor: "grey.800",
                      color: "#fff",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      // backgroundImage: `url(${landingpagecontent.image})`,
                    }}
                    className={styles.coursebanner}
                  ></Paper>
                  {/*courses*/}
                  <Box className={styles.courses}>
                    <Container maxWidth="lg">
                      <Grid className={styles.filtersection}>
                        <Grid spacing={2} className={styles.filtercontainer}>
                          <Grid item xs={12} md={3} lg={3}>
                            <Stack spacing={1}>
                              {/* <FormControl fullWidth>
                              <Select
                                className={styles.filterinput}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                size="small"
                                // onChange={(e: any) =>
                                //   setcustStatus(e.target.value)
                                // }
                                // value={courseStatus}
                              >
                                <MenuItem value={0} disabled>
                                  Filter By
                                </MenuItem>
                                <MenuItem value={1}>All</MenuItem>
                                <MenuItem value={2}>Free</MenuItem>
                                <MenuItem value={3}>Paid</MenuItem>
                              </Select>
                            </FormControl> */}
                            </Stack>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={6}
                            lg={3}
                            className={styles.gridbtn}
                          >
                            <Stack spacing={1} className={styles.gridicon}>
                              <IconButton
                                className={styles.actionview}
                                //   onClick={gridView}
                              >
                                <GridViewIcon />
                              </IconButton>
                              <IconButton
                                className={styles.actionview}
                                //   onClick={listView}
                              >
                                <FormatListBulletedIcon />
                              </IconButton>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Box className={styles.coursesheaderbox}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={styles.h6}
                        >
                          Courses Information
                        </Typography>
                        <Divider className={styles.divder} />
                      </Box>
                      {/* {gridview ? (
                      <Box className={styles.articles}>
                        {courseData &&
                          DATA.currentData() &&
                          DATA.currentData().map((data: any, key: any) => {
                            return <CourseCard key={key} coursedata={data} />;
                          })}
                      </Box>
                    ) : (
                      <Box className={styles.listviewarticles}>
                        <Container maxWidth="lg">
                          {courseData &&
                            DATA.currentData() &&
                            DATA.currentData().map((data: any, key: any) => {
                              return (
                                <CourseCardListView
                                  key={key}
                                  coursedata={data}
                                />
                              );
                            })}
                        </Container>
                      </Box>
                    )} */}
                    </Container>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Card>
          <br />
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}
