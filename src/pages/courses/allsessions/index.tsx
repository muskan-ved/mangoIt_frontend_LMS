// React Import
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";

// MUI Import
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
// External Components
import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import Footer from "@/common/LayoutNavigations/footer";
import { handleSortData } from "@/common/Sorting/sorting";
import { capitalizeFirstLetter } from "@/common/CapitalFirstLetter/capitalizeFirstLetter";
//Type Import
import { sessionType } from "@/types/sessionType";
import { courseType } from "@/types/courseType";
import { moduleType } from "@/types/moduleType";
// CSS Import
import styles from "../../../styles/sidebar.module.css";
import Sessions from "../../../styles/session.module.css"
// API Service
import { HandleSessionDelete, HandleSessionGet } from "@/services/session";
import { HandleCourseGet } from "@/services/course";
import { HandleModuleGet } from "@/services/module";
// import { AlertDialog } from "@/common/DeleteListRow/deleteRow";



interface Column {
  id: "id" | "title" | "course_id" | "module_id" | "is_deleted" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "id", label: "ID", },
  { id: "title", label: "SESSION NAME", minWidth: 170 },
  { id: "course_id", label: "COURSE NAME", minWidth: 100 },
  { id: "module_id", label: "MODULE NAME", minWidth: 100 },

  { id: "is_deleted", label: "STATUS", minWidth: 100 },
  { id: "action", label: "ACTION", minWidth: 100 },
];

const AllSession = () => {

  const [getCourse, setCourse] = React.useState<courseType | any>([]);
  const [getModule, setModule] = React.useState<moduleType | any>([]);
  const [rows, setRows] = React.useState<sessionType | any>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [deleteRow, setDeleteRow] = React.useState<sessionType | any>([])

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

  const {
    handleSubmit,
    control,
  } = useForm();

  const onSubmit = (event: any) => {
    const filterData: any = {
      module_id: event.module,
      course_id: event.course,
      status: event.status,
    }
    HandleSessionGet('', filterData).then((itemFiltered) => {
      setRows(itemFiltered.data)
    })

  }
  const handleClickOpen = (row: any) => {
    // AlertDialog(row, deleteRow, open)
    setDeleteRow(row)
    setOpen(!open);

  };


  const handleDeletesRow = () => {
    HandleSessionDelete(deleteRow.id).then((deletedRow) => {
      HandleSessionGet('', '').then((newRows) => {
        setRows(newRows.data)
      })
    })
    setOpen(!open);
  }

  const handleEditRow = (e: any) => {
    console.log(e)
  }



  const handleSort = (rowsData: any) => {
    const sortData = handleSortData(rowsData)
    setRows(sortData)
    setToggle(!toggle)
  }

  const handleSearch = (e: any) => {
    const search = e.target.value;
    HandleSessionGet(search, '').then((itemSeached) => {
      setRows(itemSeached.data);
    })
  }

  const getSessionData = () => {
    HandleSessionGet('', '').then((sessions) => {
      setRows(sessions.data);
    })
  }

  const getModuleData = () => {
    HandleModuleGet().then((moduleSearched) => {
      setModule(moduleSearched.data)
    })
  }

  const getCourseData = () => {
    HandleCourseGet().then((courseSearched) => {
      setCourse(courseSearched.data)
    })
  }

  React.useEffect(() => {
    getSessionData();
    getModuleData();
    getCourseData();
  }, []);

  // console.log("oopp", deleteRow)
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
                className={Sessions.mainFilterBox}
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
                              <Typography variant="h5" className={Sessions.filterBox}>
                                Filter
                              </Typography>
                              <Box component="form"
                                noValidate

                                onSubmit={handleSubmit(onSubmit)}
                                sx={{ mt: 1 }}>
                                <Stack
                                  style={{ marginTop: "10px" }}
                                  className="form-filter"
                                >
                                  <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={6} >
                                      <Stack spacing={2}>
                                        <InputLabel htmlFor="name" sx={{ fontWeight: 'bold' }}>
                                          Course
                                        </InputLabel>
                                        <Controller
                                          name="course"
                                          control={control}
                                          defaultValue=""
                                          render={({ field }) => (
                                            <FormControl fullWidth>
                                              <Select {...field} displayEmpty>
                                                <MenuItem value={0}>
                                                  All course
                                                </MenuItem>
                                                {getCourse?.map((data: any) => {
                                                  return (<MenuItem key={data.id} value={data.id}>{capitalizeFirstLetter(data?.title)}</MenuItem>)
                                                })}
                                              </Select>
                                            </FormControl>
                                          )}
                                        />
                                      </Stack>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={6} >
                                      <Stack spacing={2}>
                                        <InputLabel htmlFor="name" sx={{ fontWeight: 'bold' }}>
                                          Module
                                        </InputLabel>
                                        <Controller
                                          name="module"
                                          control={control}
                                          defaultValue=""
                                          render={({ field }) => (
                                            <FormControl fullWidth>
                                              <Select {...field} displayEmpty>
                                                <MenuItem value={0}>
                                                  All module
                                                </MenuItem>
                                                {getModule?.map((data: any) => {
                                                  return (<MenuItem key={data.id} value={data.id}>{capitalizeFirstLetter(data?.title)}</MenuItem>)
                                                })}
                                              </Select>
                                            </FormControl>
                                          )}
                                        />
                                      </Stack>
                                    </Grid>

                                    <Grid item xs={12} md={6} lg={6}>
                                      <Stack spacing={2}>
                                        <InputLabel htmlFor="enddate" sx={{ fontWeight: 'bold' }}>
                                          Status
                                        </InputLabel>
                                        <Controller
                                          name="status"
                                          control={control}
                                          defaultValue=""
                                          render={({ field }) => (
                                            <FormControl fullWidth>
                                              <Select {...field} displayEmpty>
                                                <MenuItem value={0}>All</MenuItem>
                                                <MenuItem value={'active'}>
                                                  Active
                                                </MenuItem>
                                                <MenuItem value={'inactive'}>
                                                  In-active
                                                </MenuItem>
                                              </Select>
                                            </FormControl>
                                          )}
                                        />
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
                            onClick={() => {
                              column.label === 'ID' ?
                                handleSort(rows) :
                                ''
                            }}
                          >
                            {toggle ? column.label === 'ID' ? <Typography>ID <ArrowDownwardOutlinedIcon fontSize="small" /> </Typography> : column.label : column.label === 'ID' ? <Typography>ID <ArrowUpwardOutlinedIcon fontSize="small" /> </Typography> : column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows?.length > 0 ? rows
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
                              <TableCell>{capitalizeFirstLetter(row.course && row.course.title)}</TableCell>
                              <TableCell>{capitalizeFirstLetter(row.module && row.module.title)}</TableCell>
                              <TableCell sx={{ color: statusColor }}>{capitalizeFirstLetter(row.status)}</TableCell>
                              <TableCell><Button onClick={() => router.push(`/courses/allsessions/updatesession/${row.id}`)} variant="outlined" color="success" sx={{ margin: '5px' }}><ModeEditOutlineIcon /></Button>
                                <Button variant="outlined" color="error" onClick={() => handleClickOpen(row)}><DeleteOutlineIcon /></Button>
                              </TableCell>
                            </TableRow>
                          );
                        }) : <TableRow><TableCell colSpan={6} sx={{textAlign : 'center'}}> <Typography>Record not Found</Typography> </TableCell></TableRow>}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              <Dialog
                open={open}
                onClose={handleClickOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Delete Session"}
                </DialogTitle>
                <DialogContent >
                  <DialogContentText id="alert-dialog-description" >
                    Are you sure want to delete <Typography component={'span'} sx={{ fontWeight: 'bold' }}>{capitalizeFirstLetter(deleteRow.title)}</Typography>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClickOpen} color="error">No</Button>
                  <Button onClick={handleDeletesRow} autoFocus color="success">
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
              {/* <AlertDialog /> */}
            </CardContent>
          </Card>
        </Box>
      </Box>
      {/* <Footer/> */}
    </>
  );
};

export default AllSession 
