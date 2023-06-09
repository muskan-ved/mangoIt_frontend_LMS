// React Import
import React, { useState, useEffect, Fragment } from "react";

// MUI Import
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";

// Helper Import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingButton } from "@mui/lab";

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
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/router";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import {
  HandleSubscriptionGetByID,
  HandleSubscriptionPayment,
  HandleSubscriptionUpdate,
} from "@/services/subscription";
import { CreateOrderForSubscription, HandleOrderGetByUserID } from "@/services/order";
import { capitalizeFirstLetter } from "@/common/CapitalFirstLetter/capitalizeFirstLetter";
import { usePagination } from "@/common/Pagination/paginations";
import moment from "moment";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

// CSS Import
import profiles from "../../../../styles/profile.module.css";
import styles from "../../../../styles/sidebar.module.css";
import subs from "../../../../styles/subsciption.module.css";
import Link from "next/link";
import CircularProgressBar from "@/common/CircularProcess/circularProgressBar";
import { AlertSubscriptionDialog } from "@/common/SubscriptionStatus/subscriptionManage";

interface Column {
  id:
  | "id"
  | "amount"
  | "date"
  | "transaction_id"
  | "payment_method"
  | "pay_of_month";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "id", label: "ID", minWidth: 120 },
  { id: "amount", label: "AMOUNT", minWidth: 120 },
  { id: "date", label: "DATE", minWidth: 120 },
  { id: "pay_of_month", label: "PAY OF MONTH", minWidth: 120 },
  { id: "transaction_id", label: "TRANSACTION ID", minWidth: 120 },
  { id: "payment_method", label: "PAYMENT METHOD", minWidth: 120 },
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const d = new Date();

export default function View() {
  const [rows, setRows] = useState<any>([]);
  const [subsData, setSubsdata] = useState<any>([]);
  const [toggle, setToggle] = useState<boolean>(false);
  const [isLoadingButton, setLoadingButton] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [subsId, setSubId] = useState<any>();
  const [userId, setuserId] = useState<any>();
  const [spinner, setshowspinner] = React.useState(false);


  useEffect(() => {
    let localData: any;
    var getId: any;

    if (typeof window !== "undefined") {
      localData = window.localStorage.getItem("userData");
    }
    if (localData) {
      getId = JSON.parse(localData);
    }
    getAllCourseData(getId?.id);
    getSubsData();
    setuserId(getId?.id)
  }, []);

  const router = useRouter();

  const getSubsData = async () => {
    const id = router?.query?.id;
    if (id) {
      HandleSubscriptionGetByID(id).then((data) => {
        setSubsdata(data?.data);
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
  const count = Math.ceil(rows?.length / PER_PAGE);
  const DATA = usePagination(rows, PER_PAGE);
  const handlePageChange = (e: any, p: any) => {
    setPage(p);
    DATA.jump(p);
  };

  const getAllCourseData = (id: any) => {
    HandleOrderGetByUserID(id).then((subs) => {
      setRows(subs.data);
    });
  };

  const cancelSubscription = (id: any) => {
    setOpen(!open);
    setSubId(id);
  };

  const handleSubsUpdate = async () => {
    let reqData = {
      status: "canceled",
    };
    setOpen(false);
    setLoadingButton(true);
    await HandleSubscriptionUpdate(subsId, reqData)
      .then((res) => {
        setTimeout(() => {
          setToggle(!toggle);
          router.push("/user/subscription");
          setLoadingButton(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setLoadingButton(false);
      });
  };

  //acccept payment
  const AcceptPayment = () => {
    setshowspinner(true)
    const reqData = {
      userId: userId,
      subscriptioId: subsData?.id
    }
    CreateOrderForSubscription(reqData).then((result) => {
      if (result?.status === 201 && result?.data) {
        localStorage.setItem("orderId", result?.data?.id)
        const data = {
          productName: subsData?.name,
          amount: result?.data?.amount,
          quantity: 1
        }
        HandleSubscriptionPayment(data).then((result) => {
          if (result) {
            setshowspinner(false)
            router.push(result);
          }
        })
      }
    })
  }

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
              Middle="Subscription"
              Text="VIEW"
              Link="/user/subscription"
            />
            <Box className={courseStyle.backbtn}>
              <Link
                href="/user/subscription"
                style={{ textDecoration: "none" }}
              >
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  className={courseStyle.backbtncs}
                  id={styles.muibuttonBackgroundColor}
                >
                  <ArrowBackOutlinedIcon />
                  &nbsp;Back
                </Button>
              </Link>
            </Box>
          </Box>
          {/* main content */}
          <Card>
            <CardContent>
              <Box className={profiles.userData}>
                <Box className={subs.maindisplay}>
                  <Typography variant="subtitle1" className={subs.useNameFront}>
                    Subscription Id :
                  </Typography>
                  &emsp;
                  <Typography variant="subtitle2" className={subs.fontCSS}>
                    {subsData && subsData?.id}
                  </Typography>
                </Box>
                <Box className={subs.maindisplay}>
                  <Typography variant="subtitle1" className={subs.useNameFront}>
                    Name :
                  </Typography>
                  &emsp;
                  <Typography variant="subtitle2" className={subs.fontCSS}>
                    {capitalizeFirstLetter(subsData && subsData?.name)}
                  </Typography>
                </Box>
                <Box className={subs.maindisplay}>
                  <Typography variant="subtitle1" className={subs.useNameFront}>
                    Amount :
                  </Typography>
                  &emsp;
                  <Typography variant="subtitle2" className={subs.fontCSS}>
                    ${subsData && subsData?.price}
                  </Typography>
                </Box>
                <Box className={subs.maindisplay}>
                  <Typography variant="subtitle1" className={subs.useNameFront}>
                    Status :
                  </Typography>
                  &emsp;
                  <Typography
                    variant="subtitle2"
                    className={subs.fontCSS}
                    sx={{ color: "green" }}
                  >
                    {capitalizeFirstLetter(subsData && subsData?.status)}
                  </Typography>
                </Box>
                <Box className={subs.maindisplay}>
                  <Typography variant="subtitle1" className={subs.useNameFront}>
                    Start Date :
                  </Typography>
                  &emsp;
                  <Typography variant="subtitle2" className={subs.fontCSS}>
                    {subsData?.start_date
                      ? moment(subsData?.start_date).format("DD MMM YYYY")
                      : ""}
                  </Typography>
                </Box>
                <Box className={subs.maindisplay}>
                  <Typography variant="subtitle1" className={subs.useNameFront}>
                    Next Pay :
                  </Typography>
                  &emsp;
                  <Typography variant="subtitle2" className={subs.fontCSS}>
                    5 June 2023
                  </Typography>
                </Box>
                <br />
                {subsData.status === "canceled" ? (
                  // <Link href="www.google.com">
                  <Fragment>
                    <Box className={subs.maindisplay1}>
                      <Typography
                        variant="subtitle1"
                        className={subs.useSubsCancell}
                      >
                        If you want to activate this subscription
                      </Typography>
                      &nbsp;
                      <Link href="/user/subscribeplan">
                        <Typography
                          variant="subtitle1"
                          className={subs.useSubsMessage}
                        >
                          Click here
                        </Typography>
                      </Link>
                    </Box>
                  </Fragment>
                ) : subsData.status === "inactive" ? (
                  ""
                ) : (
                  // </Link>
                  <Box className={subs.btncss1}>
                    {!isLoadingButton ? (
                      <Button
                        variant="contained"
                        onClick={() => cancelSubscription(subsData?.id)}
                        id={styles.muibuttonBackgroundColor}
                      >
                        Cancel Subscription
                      </Button>
                    ) : (
                      <LoadingButton
                        loading={isLoadingButton}
                        size="large"
                        className={subs.subsbtn}
                        variant="contained"
                        disabled
                      >
                        <CircularProgressBar />
                      </LoadingButton>
                    )}
                  </Box>
                )}
              </Box>
              <Button variant="contained" endIcon={<CreditCardIcon />} onClick={AcceptPayment}>
                Renew Subscription  {spinner === true ? <CircularProgress color="inherit" /> : ""}
              </Button>
            </CardContent>
          </Card>
          <br />
          <Card>
            <CardContent>
              <Typography variant="h5" className={subs.headingcss}>
                Orders
              </Typography>
              <Box className={profiles.userData}>
                <Paper>
                  <TableContainer className={courseStyle.tableContainer}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ top: 0, minWidth: column.minWidth }}
                            >
                              {toggle ? (
                                column.label === "ID" ? (
                                  <Typography>ID </Typography>
                                ) : (
                                  column.label
                                )
                              ) : column.label === "ID" ? (
                                <Typography>ID </Typography>
                              ) : (
                                column.label
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows && rows.length > 0 ? (
                          DATA.currentData() &&
                          DATA.currentData().map((row: any) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.id}
                              >
                                <TableCell>{row?.id}</TableCell>
                                <TableCell>${subsData?.price}</TableCell>
                                <TableCell>
                                  {moment(row?.createdAt).format("DD MMM YYYY")}
                                </TableCell>
                                <TableCell>
                                  {monthNames[d.getMonth()]}
                                </TableCell>
                                <TableCell>{row?.transaction_id}</TableCell>
                                <TableCell>
                                  {" "}
                                  {capitalizeFirstLetter(row?.payment_type)}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={7}
                              sx={{ fontWeight: 600, textAlign: "center" }}
                            >
                              {" "}
                              Record not Found{" "}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                    <Stack
                      className={courseStyle.stackStyle}
                      direction="row"
                      alignItems="right"
                      justifyContent="space-between"
                    >
                      <Pagination
                        className="pagination"
                        count={count}
                        page={page}
                        color="primary"
                        onChange={handlePageChange}
                      />
                      <FormControl>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          defaultValue={5}
                          onChange={handlerowchange}
                          size="small"
                          style={{ height: "40px", marginRight: "11px" }}
                        >
                          <MenuItem value={5}>5</MenuItem>
                          <MenuItem value={20}>20</MenuItem>
                          <MenuItem value={50}>50</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                  </TableContainer>
                </Paper>
                <AlertSubscriptionDialog
                  open={open}
                  onClose={cancelSubscription}
                  onSubmit={handleSubsUpdate}
                  title={"Cancel Subscription"}
                  whatYouDelete="Cancel Subscription"
                />
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
