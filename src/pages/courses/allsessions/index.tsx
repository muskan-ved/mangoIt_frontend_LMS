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
import { Margin, SearchOutlined } from "@mui/icons-material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import CloseIcon from '@mui/icons-material/Close';
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
import { ToastContainer } from "react-toastify";
// API Service
import { HandleSessionDelete, HandleSessionGet } from "@/services/session";
import { HandleCourseGet } from "@/services/course";
import { HandleModuleGet } from "@/services/module";
import { AlertDialog } from "@/common/DeleteListRow/deleteRow";


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
  const [search, setSearch] = React.useState('');
  const [getFilter, setFilter] = React.useState<number>(0);
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
    reset,
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
    setDeleteRow(row)
    setOpen(!open);

  };

  const resetFilterValue = () => {
    setFilter(0)
    reset({ course: 0, module, status: 0 });

  }

  const handleDeletesRow = () => {
    HandleSessionDelete(deleteRow.id).then((deletedRow) => {
      HandleSessionGet('', '').then((newRows) => {
        setRows(newRows.data)
      })
    })
    setOpen(!open);
  }

  const handleSort = (rowsData: any) => {
    const sortData = handleSortData(rowsData)
    setRows(sortData)
    setToggle(!toggle)
  }

  const handleSearch = (e: any, identifier: any) => {
    if (identifier === 'reset') {
      HandleSessionGet('', '').then((itemSeached) => {
        setRows(itemSeached.data);
      })
      setSearch(e)
    } else {
      const search = e.target.value;
      setSearch(e.target.value)
      HandleSessionGet(search, '').then((itemSeached) => {
        setRows(itemSeached.data);
      })
    }
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
            Link="/courses/allsessions"
          />

          {/* main content */}
          <Card>
            <CardContent>
              <TextField
                id="standard-search"
                value={search}
                variant="outlined"
                placeholder="Search"
                onChange={(e) => handleSearch(e, '')}
                InputProps={{
                  endAdornment: (
                    !search ? <IconButton>
                      <SearchOutlined />
                    </IconButton> : <IconButton onClick={(e) => handleSearch('', 'reset')}> <CloseIcon /></IconButton>
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
                        className={Sessions.popStateFilterButton}
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
                            style={{ padding: "15px", width: '100%' }}
                          >
                            <Grid>
                              <Typography variant="h5" className={Sessions.filterBox}>
                                Filter
                              </Typography>
                              <Box component="form"
                                // noValidate
                                onSubmit={handleSubmit(onSubmit)}
                                className={Sessions.filterForm}>
                                <Stack
                                  style={{ marginTop: "10px" }}
                                  className="form-filter"
                                >
                                  <Grid container spacing={2}>
                                    <Grid item xs={12} md={4} lg={4} >
                                      <Stack spacing={2}>
                                        <InputLabel htmlFor="name" className={Sessions.courseInFilter}>
                                          Course
                                        </InputLabel>
                                        <Controller
                                          name="course"
                                          control={control}
                                          defaultValue={getFilter}
                                          render={({ field }) => (
                                            <FormControl fullWidth>
                                              <Select {...field} displayEmpty>
                                                <MenuItem value={0}>
                                                  All
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

                                    <Grid item xs={12} md={4} lg={4} >
                                      <Stack spacing={2}>
                                        <InputLabel htmlFor="name" className={Sessions.moduleInFilter}>
                                          Module
                                        </InputLabel>
                                        <Controller
                                          name="module"
                                          control={control}
                                          defaultValue={getFilter}
                                          render={({ field }) => (
                                            <FormControl fullWidth>
                                              <Select {...field} displayEmpty>
                                                <MenuItem value={0}>
                                                  All
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

                                    <Grid item xs={12} md={4} lg={4}>
                                      <Stack spacing={2}>
                                        <InputLabel htmlFor="enddate" className={Sessions.statusInFilter} >
                                          Status
                                        </InputLabel>
                                        <Controller
                                          name="status"
                                          control={control}
                                          defaultValue={getFilter}
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
                                      <Box className={Sessions.boxInFilter}>
                                        <Button
                                          size="medium"
                                          variant="contained"
                                          color="primary"
                                          type="button"
                                          onClick={resetFilterValue}
                                        >
                                          Reset
                                        </Button>
                                        <Button
                                          size="medium"
                                          type="submit"
                                          variant="contained"
                                          color="primary"
                                          className={Sessions.applyButtonInFiltter}
                                          onClick={popupState.close}
                                        >
                                          Apply
                                        </Button>
                                      </Box>
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
              <Paper className={Sessions.papperForTable}>
                <TableContainer className={Sessions.tableContainer}>
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
                          const statusColor = (row.status === "active" ? Sessions.activeClassColor : row.status === "inactive" ? Sessions.inactiveClassColor : Sessions.draftClassColor)
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
                              <TableCell className={statusColor}>{capitalizeFirstLetter(row.status)}</TableCell>
                              <TableCell><Button onClick={() => router.push(`/courses/allsessions/updatesession/${row.id}`)} variant="outlined" color="success" className={Sessions.editDeleteButton}><ModeEditOutlineIcon /></Button>
                                <Button className={Sessions.editDeleteButton} variant="outlined" color="error" onClick={() => handleClickOpen(row)}><DeleteOutlineIcon /></Button>
                              </TableCell>
                            </TableRow>
                          );
                        }) : <TableRow><TableCell colSpan={6} className={Sessions.tableLastCell}> <Typography>Record not Found</Typography> </TableCell></TableRow>}
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
              <AlertDialog
                open={open}
                onClose={handleClickOpen}
                onSubmit={handleDeletesRow}
                title={deleteRow.title}
                whatYouDelete='Session'
              />
            </CardContent>
          </Card>
        </Box>
      </Box>
      {/* <Footer/> */}
      <ToastContainer />
    </>
  );
};

export default AllSession 
