// React Import
import React, { useState, useEffect, Fragment } from "react";

// MUI Import
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
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
import Paper from "@mui/material/Paper";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { SubscriptionGetByUserID } from "@/services/subscription";

import { capitalizeFirstLetter } from "@/common/CapitalFirstLetter/capitalizeFirstLetter";
import moment from "moment";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";

// CSS Import
import styles from "../../../styles/sidebar.module.css";
import style from "../../../styles/webview.module.css";
import subs from "../../../styles/subscription.module.css";
import { GetdateAfterOneMonth } from "@/common/commonfunctions/connonfun";
import {
  EnrolledCourseCard,
  EnrolledCourseCardListView,
} from "@/common/ResuableCardCmp/coursescard";
import { GetEnrolledCoursesByUserId } from "@/services/course_enroll";
import Image from "next/image";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Dashboard() {
  const [subsData, setSubsdata] = useState<any>([]);
  const [enrollCourse, setEnrollCourses] = useState<any>([]);
  const [userId, setuserId] = useState<any>();
  const [gridview, setgridview] = useState<any>(true);
  const [subsError, setSubsError] = useState<any>("");
  const [dynamicCss, setDynamicCss] = useState<any>(1);

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
    getEnrollCourse();
  }, [userId]);

  const getSubsData = async () => {
    if (userId) {
      SubscriptionGetByUserID(userId).then((data: any) => {
        if (data && data?.response?.data === "subsId not Found!") {
          setSubsError(data?.response?.data);
        } else {
          setSubsdata(data?.data);
        }
      });
    }
  };

  const getEnrollCourse = async () => {
    if (userId) {
      GetEnrolledCoursesByUserId(userId).then((data: any) => {
        setEnrollCourses(data?.data);
      });
    }
  };

  //gridview
  const gridView = () => {
    setgridview(true);
    setDynamicCss(1);
  };

  const listView = () => {
    setgridview(false);
    setDynamicCss(2);
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
              Current="Dashboard"
              Text="DASHBOARD"
              Link="/user/dashboard"
            />
          </Box>
          {/* main content */}
          {subsData && subsData === "subsId not Found!" ? (
            <Fragment>
              <Card>
                <CardContent>
                  <Typography variant="h5" className={style.headingcss}>
                    Your Subscription Plan
                  </Typography>
                  <Divider sx={{ marginTop: "5px" }}></Divider>
                  <br />
                  <br />
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid
                      container
                      spacing={2}
                      className={style.textHeadingCenter}
                    >
                      <Typography
                        variant="h5"
                        className={style.headingcssError}
                      >
                        Record not found!
                      </Typography>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
              <br />
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex" }}>
                    <Typography variant="h5" className={style.headingcss}>
                      Enrolled Courses
                    </Typography>

                    <Box className={style.alignendcss}>
                      <Stack spacing={1} className={style.gridicon}>
                        <IconButton
                          className={style.actionview1}
                          onClick={gridView}
                        >
                          <GridViewIcon
                            className={
                              dynamicCss === 1
                                ? style.gridColor
                                : style.iconColor
                            }
                          />
                        </IconButton>
                        <IconButton
                          className={style.actionview1}
                          onClick={listView}
                        >
                          <FormatListBulletedIcon
                            className={
                              dynamicCss === 2
                                ? style.gridColor
                                : style.iconColor
                            }
                          />
                        </IconButton>
                      </Stack>
                    </Box>
                  </Box>
                  <Divider sx={{ marginTop: "5px" }}></Divider>
                  <br />
                  <br />
                  {enrollCourse && enrollCourse?.length === 0 ? (
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid
                        container
                        spacing={2}
                        className={style.textHeadingCenter}
                      >
                        <Typography
                          variant="h5"
                          className={style.headingcssError}
                        >
                          Enrolled courses not found!
                        </Typography>
                      </Grid>
                    </Box>
                  ) : (
                    <Box className={style.courses1}>
                      <Container maxWidth="lg">
                        {gridview ? (
                          <Box className={style.articles1}>
                            {enrollCourse &&
                              enrollCourse.map((data: any, key: any) => {
                                return (
                                  <EnrolledCourseCard
                                    key={key}
                                    coursedata={data.course}
                                  />
                                );
                              })}
                          </Box>
                        ) : (
                          <Box className={style.listviewarticles}>
                            <Container maxWidth="lg">
                              {enrollCourse &&
                                enrollCourse.map((data: any, key: any) => {
                                  return (
                                    <EnrolledCourseCardListView
                                      key={key}
                                      coursedata={data.course}
                                    />
                                  );
                                })}
                            </Container>
                          </Box>
                        )}
                      </Container>
                    </Box>
                  )}
                </CardContent>
              </Card>
              <br />
            </Fragment>
          ) : (
            <Fragment>
              <Card>
                <CardContent>
                  <Typography variant="h5" className={style.headingcss}>
                    Your Subscription Plan
                  </Typography>
                  <Divider sx={{ marginTop: "5px" }}></Divider>
                  <br />
                  <br />
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      // columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Item className={subs.cardBorder}>
                          <Box className={subs.maindisplay}>
                            <Image
                              src="/Images/pages/pages_icon/subscription.png"
                              alt="image"
                              width="50"
                              height="50"
                              className={style.imgcss}
                            />
                            <Box>
                              <Typography
                                variant="subtitle1"
                                className={style.useNameFront}
                              >
                                Subscription Name
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                className={style.fontCSS}
                              >
                                {capitalizeFirstLetter(
                                  subsData && subsData?.name
                                )}
                              </Typography>
                            </Box>
                          </Box>
                        </Item>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Item className={subs.cardBorder}>
                          <Box className={subs.maindisplay}>
                            <Image
                              src="/Images/pages/pages_icon/calendar.png"
                              alt="image"
                              width="50"
                              height="50"
                              className={style.imgcss}
                            />
                            <Box>
                              <Typography
                                variant="subtitle1"
                                className={style.useNameFront}
                              >
                                Duration Term
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                className={style.fontCSS1}
                              >
                                {capitalizeFirstLetter(
                                  subsData && subsData?.duration_term
                                )}
                              </Typography>
                            </Box>
                          </Box>
                        </Item>
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Item className={subs.cardBorder}>
                          {" "}
                          <Box className={subs.maindisplay}>
                            <Image
                              src="/Images/pages/pages_icon/renewPic.png"
                              alt="image"
                              width="50"
                              height="50"
                              className={style.imgcss}
                            />
                            <Box>
                              <Typography
                                variant="subtitle1"
                                className={style.useNameFront1}
                              >
                                Renew Date
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                className={style.fontCSS2}
                              >
                                {moment(
                                  GetdateAfterOneMonth(subsData?.start_date)
                                ).format("DD MMMM YYYY")}
                              </Typography>
                            </Box>
                          </Box>
                        </Item>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
              <br />
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex" }}>
                    <Typography variant="h5" className={style.headingcss}>
                      Enrolled Courses
                    </Typography>

                    <Box className={style.alignendcss}>
                      <Stack spacing={1} className={style.gridicon}>
                        <IconButton
                          className={style.actionview1}
                          onClick={gridView}
                        >
                          <GridViewIcon
                            className={
                              dynamicCss === 1
                                ? style.gridColor
                                : style.iconColor
                            }
                          />
                        </IconButton>
                        <IconButton
                          className={style.actionview2}
                          onClick={listView}
                        >
                          <FormatListBulletedIcon
                            className={
                              dynamicCss === 2
                                ? style.gridColor
                                : style.iconColor
                            }
                          />
                        </IconButton>
                      </Stack>
                    </Box>
                  </Box>
                  <Divider sx={{ marginTop: "5px" }}></Divider>
                  <Box className={style.courses1}>
                    <Container maxWidth="lg">
                      {gridview ? (
                        <Box className={style.articles1}>
                          {enrollCourse &&
                            enrollCourse.map((data: any, key: any) => {
                              return (
                                <EnrolledCourseCard
                                  key={key}
                                  coursedata={data.course}
                                />
                              );
                            })}
                        </Box>
                      ) : (
                        <Box className={style.listviewarticles}>
                          <Container maxWidth="lg">
                            {enrollCourse &&
                              enrollCourse.map((data: any, key: any) => {
                                return (
                                  <EnrolledCourseCardListView
                                    key={key}
                                    coursedata={data.course}
                                  />
                                );
                              })}
                          </Container>
                        </Box>
                      )}
                    </Container>
                  </Box>
                </CardContent>
              </Card>
              <br />
            </Fragment>
          )}
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}
