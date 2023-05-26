// React Import
import { useState, useEffect } from "react";

// MUI Import
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Popover,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

// Helper Import
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Types Import
import { userType } from "@/types/userType";

// External Components
import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";
import SpinnerProgress from "@/common/CircularProgressComponent/spinnerComponent";
import CircularProgressBar from "@/common/CircularProcess/circularProgressBar";
import CloseIcon from "@mui/icons-material/Close";
import courseStyle from "../../../../../styles/course.module.css";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import * as React from "react";
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
import {
  HandleSubscriptionGet,
  HandleSubscriptionGetByID,
} from "@/services/subscription";
import { capitalizeFirstLetter } from "@/common/CapitalFirstLetter/capitalizeFirstLetter";
import { usePagination } from "@/common/Pagination/paginations";
import { AlertDialog } from "@/common/DeleteListRow/deleteRow";
import { handleSortData } from "@/common/Sorting/sorting";

// CSS Import
import profiles from "../../../../../styles/profile.module.css";
import styles from "../../../../../styles/sidebar.module.css";
import subs from "../../../../../styles/subsciption.module.css";

// API services

import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
interface Column {
  id: "id" | "amount" | "date" | "transaction_id" | "payment_method";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "id", label: "ID", minWidth: 120 },
  { id: "amount", label: "AMOUNT", minWidth: 120 },
  { id: "date", label: "DATE", minWidth: 120 },
  { id: "transaction_id", label: "TRANSACTION ID", minWidth: 120 },
  { id: "payment_method", label: "PAYMENT METHOD", minWidth: 120 },
];

export default function View() {
  const [rows, setRows] = React.useState<any>([]);
  const [subsData, setSubsdata] = React.useState<any>([]);
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    let localData: any;
    if (typeof window !== "undefined") {
      localData = window.localStorage.getItem("userData");
    }
    getAllCourseData();
    getSubsData();
  }, []);

  const router = useRouter();
 
  const getSubsData = async () => {
    const id = router?.query?.id;
    if (id) {
      HandleSubscriptionGetByID(id).then((data) => {
        setSubsdata(data?.data)
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

  const getAllCourseData = () => {
    HandleSubscriptionGet().then((subs) => {
      setRows(subs.data);
    });
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
            Middle="View"
            Text="VIEW"
            Link="/subscription"
          />

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
                    Amount :
                  </Typography>
                  &emsp;
                  <Typography variant="subtitle2" className={subs.fontCSS}>
                    {subsData && subsData?.price}
                  </Typography>
                </Box>
                <Box className={subs.maindisplay}>
                  <Typography variant="subtitle1" className={subs.useNameFront}>
                    Start Date :
                  </Typography>
                  &emsp;
                  <Typography variant="subtitle2" className={subs.fontCSS}>
                    12 May 2023
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
                <Box className={subs.btncss}>
                  <Button variant="contained">Cancel Subscription</Button>
                </Box>
              </Box>
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
                                  <Typography>
                                    ID{" "}
                                    {/* <ArrowDownwardOutlinedIcon fontSize="small" />{" "} */}
                                  </Typography>
                                ) : (
                                  column.label
                                )
                              ) : column.label === "ID" ? (
                                <Typography>
                                  ID{" "}
                                  {/* <ArrowUpwardOutlinedIcon fontSize="small" />{" "} */}
                                </Typography>
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
                                <TableCell>${row?.price}</TableCell>
                                <TableCell>
                                  {/* {capitalizeFirstLetter(
                                  row?.course?.is_chargeable
                                )} */}
                                  25 May 2023
                                </TableCell>
                                <TableCell>emsfhdh12fhf</TableCell>
                                <TableCell>Card</TableCell>
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
