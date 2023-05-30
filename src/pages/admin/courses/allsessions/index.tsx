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
  Pagination,
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
import { usePagination } from "@/common/Pagination/paginations";
//Type Import
import { sessionType } from "@/types/sessionType";
import { courseType } from "@/types/courseType";
import { moduleType } from "@/types/moduleType";
// CSS Import
import styles from "../../../../styles/sidebar.module.css";
import Sessions from "../../../../styles/session.module.css"
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
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [getFilter, setFilter] = React.useState<number>(0);
  const [deleteRow, setDeleteRow] = React.useState<sessionType | any>([])

  const router = useRouter()
  //pagination
  const [row_per_page, set_row_per_page] = React.useState(5);
  let [page, setPage] = React.useState<any>(1);
  function handlerowchange(e: any) {
    set_row_per_page(e.target.value);
  }
  const PER_PAGE = row_per_page;
  const count = Math.ceil(rows.length / PER_PAGE);
  const DATA = usePagination(rows, PER_PAGE);
  const handlePageChange = (e: any, p: any) => {
    setPage(p);
    DATA.jump(p);
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
  // to delete a row
  const handleDeletesRow = () => {
    HandleSessionDelete(deleteRow.id).then((deletedRow) => {
      HandleSessionGet('', '').then((newRows) => {
        setRows(newRows.data)
      })
    })
    setOpen(!open);
  }

  const resetFilterValue = () => {
    setFilter(0)
    reset({ course: 0, module: 0, status: 0 });
  }

  const handleSort = (rowsData: any) => {
    const sortData = handleSortData(rowsData)
    setRows(sortData)
    setToggle(!toggle)
  }

  const handleSearch = (e: any, identifier: any) => {
    setPage(1);
    DATA.jump(1);
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
    HandleModuleGet('', '').then((moduleSearched) => {
      setModule(moduleSearched.data)
    })
  }

  const getCourseData = () => {
    HandleCourseGet('', '').then((courseSearched) => {
      setCourse(courseSearched.data)
    })
  }

  React.useEffect(() => {
    getSessionData();
    getModuleData();
    getCourseData();
  }, []);
  console.log(' session rowss', rows)
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
            Link="/admin/courses/allsessions"
          />

          {/* main content */}
          <Card>
            <CardContent>
              <TextField
                id="standard-search"
                value={search}
                variant="outlined"
                placeholder="Search by session"
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
                                className={Sessions.filterForm}
                              >
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
                                                  return (<MenuItem key={data.course.id} value={data.course.id}>{capitalizeFirstLetter(data?.course.title)}</MenuItem>)
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
                                                  return (<MenuItem key={data.module.id} value={data.module.id}>{capitalizeFirstLetter(data?.module.title)}</MenuItem>)
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
                <Button variant="contained" onClick={() => router.push('/admin/courses/allsessions/addsession')}>Add Session</Button>
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
                    <TableBody>{console.log('row', DATA)}
                      {rows && rows.length > 0 ? DATA.currentData() &&
                        DATA.currentData()
                          .map((row: any) => {

                            const statusColor = (row.status === "active" ? Sessions.activeClassColor : row.status === "inactive" ? Sessions.inactiveClassColor : Sessions.draftClassColor)
                            return (
                              <TableRow
                                hover
                                // role="checkbox"
                                // tabIndex={-1}
                                key={row.id}
                              >
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{capitalizeFirstLetter(row.title)}</TableCell>
                                <TableCell>{capitalizeFirstLetter(row.course && row.course.title)}</TableCell>
                                <TableCell>{capitalizeFirstLetter(row.module && row.module.title)}</TableCell>
                                <TableCell className={statusColor}>{capitalizeFirstLetter(row.status)}</TableCell>
                                <TableCell><Button onClick={() => router.push(`/admin/courses/allsessions/updatesession/${row.id}`)} variant="outlined" color="success" className={Sessions.editDeleteButton}><ModeEditOutlineIcon /></Button>
                                  <Button className={Sessions.editDeleteButton} variant="outlined" color="error" onClick={() => handleClickOpen(row)}><DeleteOutlineIcon /></Button>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        : <TableRow><TableCell colSpan={6} className={Sessions.tableLastCell}> <Typography>Record not Found</Typography> </TableCell></TableRow>}
                    </TableBody>
                  </Table>
                  <Stack
                    className={Sessions.stackStyle}
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
                        style={{ height: "40px", marginRight: '11px' }}
                      >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </TableContainer>
              </Paper>

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
