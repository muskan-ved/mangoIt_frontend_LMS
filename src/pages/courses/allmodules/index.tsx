import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";
import * as React from "react";
import { useRouter } from "next/router";
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
  Paper,
  Popover,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import styles from "../../../styles/sidebar.module.css";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import { SearchOutlined } from "@mui/icons-material";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import { capitalizeFirstLetter } from "@/common/CapitalFirstLetter/capitalizeFirstLetter";
import { HandleModuleGet } from "@/services/module";

interface Column {
  id: "id" | "title" | "course_id" | "module_id" | "is_deleted" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "id", label: "ID", },
  { id: "title", label: "MODULE NAME", minWidth: 170 },
  { id: "course_id", label: "COURSE NAME", minWidth: 100 },
  { id: "module_id", label: "NO. SESSION", minWidth: 100 },
  { id: "is_deleted", label: "STATUS", minWidth: 100 },
  { id: "action", label: "ACTION", minWidth: 100 },
];

const AllModules = () => {
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
  const handleClickOpen = (data: any) => {

  }
  const handleSort = (data: any) => {

  }

  const getModuleData = () => {
    HandleModuleGet('', '').then((modules) => {
      setRows(modules.data);
    })
  }

  React.useEffect(() => {
    getModuleData();
  }, []);
  console.log('oops', rows)
  return (
    <>
      <Navbar />
      <Box className={styles.combineContentAndSidebar}>
        <SideBar />

        <Box className={styles.siteBodyContainer}>
          {/* breadcumbs */}
          <BreadcrumbsHeading
            First="Home"
            Middle="Module"
            Text="MODULE"
            Link="/courses/allmodules"
          />

          {/* main content */}
          <Card>
            <CardContent>
              <TextField
                id="standard-bare"
                variant="outlined"
                placeholder="Search"
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
                                          Type
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
                <Button variant="contained" onClick={() => router.push('/courses/allmodules/addmodule')}>Add Module</Button>
              </Box>
              <Paper >
                <TableContainer >
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
                          // const statusColor = (row.status === "active" ? Sessions.activeClassColor : row.status === "inactive" ? Sessions.inactiveClassColor : Sessions.draftClassColor)
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.id}
                            >
                              <TableCell>{row.module.id}</TableCell>
                              <TableCell>{capitalizeFirstLetter(row.module.title)}</TableCell>
                              <TableCell>{capitalizeFirstLetter(row.module.course && row.module.course.title)}</TableCell>
                              <TableCell>{(row.sessionCount.sessionCount)}</TableCell>
                              <TableCell >{capitalizeFirstLetter(row.module.status)}</TableCell>
                              <TableCell><Button onClick={() => router.push(`/courses/allsessions/updatesession/${row.id}`)} variant="outlined" color="success" ><ModeEditOutlineIcon /></Button>
                                <Button variant="outlined" color="error" onClick={() => handleClickOpen(row)}><DeleteOutlineIcon /></Button>
                              </TableCell>
                            </TableRow>
                          );
                        }) : <TableRow><TableCell colSpan={6} > <Typography>Record not Found</Typography> </TableCell></TableRow>}
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
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default AllModules;
