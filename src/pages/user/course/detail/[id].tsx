// React Import
import React, { useState, useEffect, Fragment } from "react";

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

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import ReactPlayer from "react-player/lazy";

// Helper Import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// External Components
import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";
import Paper from "@mui/material/Paper";

import { useRouter } from "next/router";
import { HandleCourseByCourseId } from "@/services/course";
import { capitalizeFirstLetter } from "@/common/CapitalFirstLetter/capitalizeFirstLetter";
import { usePagination } from "@/common/Pagination/paginations";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import MenuBookIcon from "@mui/icons-material/MenuBook";

// CSS Import
import styles from "../../../../styles/sidebar.module.css";
import subs from "../../../../styles/subsciption.module.css";
import courseStyle from "../../../../styles/course.module.css";
import Image from "next/image";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { BASE_URL } from "@/config/config";

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
  const [couseData, setCousedata] = useState<any>([]);
  const [files, setFiles] = useState<any>("");
  const [activeToggle, setActiveToggle] = useState<any>("");
  const [sessionData, setSessionData] = useState<any>([]);

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

  const handlebtnClick = (rowData: any) => {
    setActiveToggle(rowData.id);
    setSessionData(rowData);
    if (rowData.attachment.includes("txt")) {
      console.log("txt", rowData.attachment);
      setFiles(rowData.attachment);
    } else if (rowData.attachment.includes("mp4")) {
      setFiles(rowData.attachment);
    } else if (rowData.attachment.includes("pdf")) {
      setFiles(rowData.attachment);
      console.log("pddfff", rowData.attachment);
    } else if (
      rowData.attachment.includes("jpeg") ||
      rowData.attachment.includes("jpg") ||
      rowData.attachment.includes("png")
    ) {
      setFiles(rowData.attachment);
    } else {
      setFiles(rowData.attachment);
    }
  };
  console.log("couseDatacouseData", couseData);

  const download = (identifier: any) => {
    let imagename = files && files?.slice(8);
    var element = document.createElement("a");
    if (identifier === "image") {
      var file = new Blob([`${BASE_URL}/${files}`], {
        type: "image/*",
      });
      element.href = URL.createObjectURL(file);
      element.download = `${imagename}`;
      element.click();
    } else if (identifier === "pdf") {
      var file = new Blob([`${BASE_URL}/${files}`], {
        type: "application/pdf",
      });
      element.href = URL.createObjectURL(file);
      element.download = `${imagename}`;
      element.click();
    } else if (identifier === "txt") {
      const filePath = `${BASE_URL}/${files}`;
      window.open(filePath, "_blank");
    }
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
                      {files && files?.includes("mp4") ? (
                        <Grid item xs={7}>
                          <ReactPlayer
                            controls={true}
                            url={`${BASE_URL}/${files}`}
                          />
                          {/* <Item> */}
                          <Typography
                            variant="h5"
                            className={subs.useNameFront1}
                          >
                            {capitalizeFirstLetter(
                              sessionData && sessionData?.title
                            )}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            className={courseStyle.fontCS}
                          >
                            {capitalizeFirstLetter(
                              sessionData &&
                                sessionData?.description?.replace(
                                  /(<([^>]+)>)/gi,
                                  ""
                                )
                            )}
                          </Typography>
                          {/* </Item> */}
                        </Grid>
                      ) : files && files?.includes("pdf") ? (
                        <Grid item xs={7}>
                          <Box className={subs.maindisplay}>
                            <Typography
                              variant="h5"
                              className={subs.useNameFront1}
                            >
                              {capitalizeFirstLetter(
                                sessionData && sessionData?.title
                              )}
                            </Typography>
                            &nbsp;
                            <Button onClick={() => download("pdf")}>
                              <FileDownloadOutlinedIcon
                                className={courseStyle.filedownloadcss}
                              />
                            </Button>
                          </Box>
                          <Typography
                            variant="subtitle2"
                            className={courseStyle.fontCS}
                          >
                            {capitalizeFirstLetter(
                              sessionData &&
                                sessionData?.description?.replace(
                                  /(<([^>]+)>)/gi,
                                  ""
                                )
                            )}
                          </Typography>
                          {/* </Item> */}
                        </Grid>
                      ) : files && files?.includes("txt") ? (
                        <Grid item xs={7}>
                          <Box className={subs.maindisplay}>
                            <Typography
                              variant="h5"
                              className={subs.useNameFront1}
                            >
                              {capitalizeFirstLetter(
                                sessionData && sessionData?.title
                              )}
                            </Typography>
                            &nbsp;
                            <Button onClick={() => download("txt")}>
                              <FileDownloadOutlinedIcon
                                className={courseStyle.filedownloadcss}
                              />
                            </Button>
                          </Box>
                          <Typography
                            variant="subtitle2"
                            className={courseStyle.fontCS}
                          >
                            {capitalizeFirstLetter(
                              sessionData &&
                                sessionData?.description?.replace(
                                  /(<([^>]+)>)/gi,
                                  ""
                                )
                            )}
                          </Typography>
                          {/* </Item> */}
                        </Grid>
                      ) : (files && files?.includes("jpeg")) ||
                        (files && files?.includes("jpg")) ||
                        (files && files?.includes("png")) ? (
                        <Grid item xs={8}>
                          <Item>
                            <Image
                              className={courseStyle.imgwidth}
                              alt="image"
                              src={`${BASE_URL}/${files}`}
                              width={350}
                              height={400}
                            />
                            <Box className={subs.maindisplay}>
                              <Typography
                                variant="h5"
                                className={subs.useNameFront1}
                              >
                                {capitalizeFirstLetter(
                                  sessionData && sessionData?.title
                                )}
                              </Typography>
                              &nbsp;
                              <Button onClick={() => download("image")}>
                                <FileDownloadOutlinedIcon
                                  className={courseStyle.filedownloadcss}
                                />
                              </Button>
                            </Box>
                            <Typography
                              variant="subtitle2"
                              className={courseStyle.fontCS}
                            >
                              {capitalizeFirstLetter(
                                sessionData &&
                                  sessionData?.description?.replace(
                                    /(<([^>]+)>)/gi,
                                    ""
                                  )
                              )}
                            </Typography>
                          </Item>
                        </Grid>
                      ) : !files ? (
                        <Fragment>
                          <Typography
                            variant="h4"
                            className={subs.useNameFront1}
                          >
                            {capitalizeFirstLetter(
                              couseData && couseData?.title
                            )}
                          </Typography>
                          <br />
                          <Typography
                            variant="subtitle2"
                            className={subs.fontCSS1}
                          >
                            {capitalizeFirstLetter(
                              (couseData && couseData?.long_description) ||
                                (couseData && couseData?.short_description)
                            )}
                          </Typography>
                        </Fragment>
                      ) : (
                        ""
                      )}
                    </Item>
                  </Grid>
                  <Grid item xs={5}>
                    <Box className={subs.maindiv}>
                      <Typography variant="h5" className={subs.useNameFront2}>
                        Course Curriculum
                      </Typography>
                      {couseData &&
                        couseData?.modules?.map((item: any) => (
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography className={courseStyle.typoTitle}>
                                <MenuBookIcon className={subs.iconcss} /> &nbsp;{" "}
                                {capitalizeFirstLetter(item?.title)}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails className="vvv">
                              {item?.sessions.map((ee: any) => {
                                const togglee =
                                  ee?.id === activeToggle ? "active" : "";
                                return (
                                  <Box
                                    sx={{
                                      width: "100%",
                                      bgcolor: "background.paper",
                                    }}
                                  >
                                    <nav aria-label="main mailbox folders">
                                      <List>
                                        <ListItem disablePadding>
                                          <ListItemButton
                                            className={
                                              togglee &&
                                              courseStyle.backgroundClick
                                            }
                                            onClick={() => handlebtnClick(ee)}
                                          >
                                            <Typography
                                              variant="subtitle2"
                                              className={courseStyle.typolist}
                                            >
                                              {capitalizeFirstLetter(ee?.title)}
                                            </Typography>
                                          </ListItemButton>
                                        </ListItem>
                                      </List>
                                    </nav>
                                    <Divider />
                                  </Box>
                                );
                              })}
                            </AccordionDetails>
                          </Accordion>
                        ))}
                    </Box>
                  </Grid>
                  {/* <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    className={subs.btncss}
                  >
                    Enroll Now
                  </Button> */}
                  <br />
                </Grid>
              </Box>
              {/* <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  {files && files?.includes("mp4") ? (
                    <Grid item xs={8}>
                      <Item>
                        <ReactPlayer
                          controls={true}
                          url={`http://localhost:6030/${files}`}
                        />
                      </Item>
                    </Grid>
                  ) : files && files?.includes("png") ? (
                    <Grid item xs={8}>
                      <Item>
                        <Image
                          className={courseStyle.imgwidth}
                          alt="image"
                          src={`http://localhost:6030/${files}`}
                          width={350}
                          height={400}
                        />
                      </Item>
                    </Grid>
                  ) : (
                    ""
                  )}
                </Grid>
              </Box> */}
            </CardContent>
          </Card>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}
