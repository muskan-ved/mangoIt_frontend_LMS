import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";
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
  Popover,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import styles from "../../../styles/sidebar.module.css";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import Footer from "@/common/LayoutNavigations/footer";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
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
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useRouter } from "next/router";
//Extra Imports
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
//Tpe Import
import { sessionType } from "@/types/sessionType";
// API Service
import { HandleSessionBySearch, HandleSessionGet } from "@/services/session";
import { courseType } from "@/types/courseType";
import { moduleType } from "@/types/moduleType";
import { capitalizeFirstLetter } from "@/common/CapitalFirstLetter/capitalizeFirstLetter";

interface Column {
  id: "id" | "title" | "module_id" | "course_id" | "is_deleted" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "id", label: "ID", },
  { id: "title", label: "SESSION NAME", minWidth: 170 },
  { id: "module_id", label: "MODULE NAME", minWidth: 100 },
  { id: "course_id", label: "COURSE NAME", minWidth: 100 },
  { id: "is_deleted", label: "STATUS", minWidth: 100 },
  { id: "action", label: "ACTION", minWidth: 100 },

];

const AllSession = () => {

  const [getCourse, setCourse] = React.useState<courseType | any>([]);
  const [getModule, setModule] = React.useState<moduleType | any>([]);
  const [rows, setRows] = React.useState<sessionType | any>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const router = useRouter()
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const handleSearch = (e: any) => {
    // console.log(e.nativeEvent.data)
    const search = e.nativeEvent.data;
    HandleSessionBySearch(search).then((iteamSeached)=>{
      console.log(iteamSeached)
    })
  }

  const getSessionData = () => {
    HandleSessionGet().then((sessions) => {
      setRows(sessions.data);
    })
  }


  React.useEffect(() => {
    getSessionData();
  }, []);


  return (
    <>
      <Navbar />
      <Box className={styles.combineContentAndSidebar}>
        <SideBar />

        <Box className={styles.siteBodyContainer}>
          {/* breadcumbs */}
          <BreadcrumbsHeading
            First="Home"
            Middle="Session"
            Text="SESSION"
            Link="/session/allsessions"
          />

          {/* main content */}
          <Card>
            <CardContent>
              <TextField
                id="standard-bare"
                variant="outlined"
                placeholder="Search"
               
                onChange={(e) => handleSearch(e)}
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchOutlined />
                    </IconButton>
                  ),
                }}
              />
              <Box
                sx={{ float: "right", display: "flex", alignItems: "center" }}
              >
                <PopupState variant="popover" popupId="demo-popup-popover" >
                  {(popupState) => (


                    <Box>
                      <Button
                        sx={{ display: "inline-flex", color: "#1976d2" }}
                        {...bindTrigger(popupState)}
                      >
                        <FilterAltOutlinedIcon />
                        Filter
                      </Button>
                      <Popover
                        {...bindPopover(popupState)}
                        style={{ width: '35% !important' }}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <Box>
                          <Container
                            className="filter-box"
                            style={{ padding: "15px" }}
                          >
                            <Grid>
                              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                Filter
                              </Typography>
                              <Box component="form"
                                noValidate
                                //   onSubmit={handleSubmit(onSubmit)}
                                sx={{ mt: 1 }}>
                                <Stack
                                  style={{ marginTop: "10px" }}
                                  className="form-filter"
                                >
                                  <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={6} >
                                      <Stack spacing={2}>
                                        <InputLabel htmlFor="name" sx={{ fontWeight: 'bold' }}>
                                          Module
                                        </InputLabel>
                                        <FormControl fullWidth>
                                          <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            onChange={
                                              (e: any) => null
                                              // setCustType(e.target.value)
                                            }
                                          // value={custType}
                                          >
                                            <MenuItem value={0}>All</MenuItem>
                                            {/* {custtype &&
                                                  custtype.map(
                                                    (data: any, key: any) => {
                                                      return (
                                                        <MenuItem
                                                          key={key}
                                                          value={data.id}
                                                        >
                                                          {data.name}
                                                        </MenuItem>
                                                      );
                                                    }
                                                  )} */}
                                          </Select>
                                        </FormControl>
                                      </Stack>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={6} >
                                      <Stack spacing={2}>
                                        <InputLabel htmlFor="name" sx={{ fontWeight: 'bold' }}>
                                          Course
                                        </InputLabel>
                                        <FormControl fullWidth>
                                          <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            onChange={
                                              (e: any) => null
                                              // setCustType(e.target.value)
                                            }
                                          // value={custType}
                                          >
                                            <MenuItem value={0}>All</MenuItem>
                                            {/* {custtype &&
                                                  custtype.map(
                                                    (data: any, key: any) => {
                                                      return (
                                                        <MenuItem
                                                          key={key}
                                                          value={data.id}
                                                        >
                                                          {data.name}
                                                        </MenuItem>
                                                      );
                                                    }
                                                  )} */}
                                          </Select>
                                        </FormControl>
                                      </Stack>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={6}>
                                      <Stack spacing={2}>
                                        <InputLabel htmlFor="enddate" sx={{ fontWeight: 'bold' }}>
                                          Status
                                        </InputLabel>
                                        <FormControl fullWidth>
                                          <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            onChange={
                                              (e: any) => null
                                              // setcustStatus(e.target.value)
                                            }
                                          // value={custStatus}
                                          >
                                            <MenuItem value={2}>All</MenuItem>
                                            <MenuItem value={1}>
                                              Active
                                            </MenuItem>
                                            <MenuItem value={0}>
                                              InActive
                                            </MenuItem>
                                          </Select>
                                        </FormControl>
                                      </Stack>
                                    </Grid>

                                    <Grid
                                      item
                                      xs={12}
                                      lg={12}
                                    >
                                      <Button
                                        size="medium"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{ float: 'right' }}

                                        onClick={popupState.close}
                                      >
                                        Apply Filter

                                      </Button>
                                    </Grid>
                                  </Grid>
                                </Stack>
                              </Box>
                            </Grid>
                          </Container>
                        </Box>
                      </Popover>
                    </Box>
                  )}
                </PopupState>
                &nbsp;
                <Button variant="contained" onClick={() => router.push('/courses/allsessions/addsession')}>Add Session</Button>
              </Box>
              <Paper sx={{ width: "100%" }}>
                <TableContainer sx={{ mt: 3 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ top: 0, minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row: any) => {

                          const statusColor = (row.status === "active" ? "green" : row.status === "inactive" ? "red" : "orange")
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.id}
                            >
                              <TableCell>{row.id}</TableCell>
                              <TableCell>{capitalizeFirstLetter(row.title)}</TableCell>
                              <TableCell>{capitalizeFirstLetter(row.module && row.module.title)}</TableCell>
                              <TableCell>{capitalizeFirstLetter(row.course && row.course.title)}</TableCell>
                              <TableCell sx={{ color: statusColor }}>{capitalizeFirstLetter(row.status)}</TableCell>
                              <TableCell><Button variant="outlined" color="success"><ModeEditOutlineIcon /></Button><Button variant="outlined" color="error"><DeleteOutlineIcon /></Button></TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />

            </CardContent>
          </Card>
        </Box>
      </Box>
      {/* <Footer/> */}
    </>
  );
};

export default AllSession 
