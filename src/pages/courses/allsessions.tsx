import { Box, Button, Card, CardContent, Fade, MenuItem, FormControl, IconButton, InputLabel, Modal, NativeSelect, Popper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";
import styles from "../../styles/sidebar.module.css";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import Footer from "@/common/LayoutNavigations/footer";
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';


import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Padding, SearchOutlined } from "@mui/icons-material";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number,
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];


export default function AllSession() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    let localData: any;
    if (typeof window !== 'undefined') {
      localData = window.localStorage.getItem('userData')
    }
    if (localData) {
      // const userData = JSON.parse(localData);
      // handleSession().then((sessions)=>{
      //   console.log("sesssssss", sessions)
      // })    
    }
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [module, setModule] = React.useState<string | any>('');
  const [course, setCourse] = React.useState<string | any>('');
  const [status, setStatus] = React.useState<number | any>(0);

  const handleChange = (event: SelectChangeEvent) => {
    event.preventDefault()

    setModule(event.target.value as string);
    console.log(event)
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
            Middle="Session"
            Text="SESSION"
            Link="/sessions/allsession"
          />

          {/* main content */}
          <Box> All session</Box>
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
                sx={{ marginBottom: 3 }}
              />
              <Box sx={{ float: "right", display: "flex" }}>

                <PopupState variant="popper" popupId="demo-popup-popper">
                  {(popupState) => (
                    <Box>
                      <Button {...bindToggle(popupState)}>
                        <FilterAltOutlinedIcon />
                        FILTER
                      </Button>
                      <Popper {...bindPopper(popupState)} transition>
                        {({ TransitionProps }) => (
                          <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                              {/* <Typography sx={{ p: 2 }}>The content of the Popper.</Typography> */}
                              <Box sx={{ display: "flex" }}>
                                <Box sx={{ minWidth: 120 }}>
                                  <FormControl fullWidth>
                                    Module
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"                                
                                      onChange={handleChange}
                                      value= {module}
                                    >
                                      <MenuItem value={'html'}>HTML</MenuItem>
                                      <MenuItem value={'css'}>CSS</MenuItem>
                                      <MenuItem value={'js'}>JS</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Box>
                                <Box sx={{ minWidth: 120 }}>
                                  <FormControl fullWidth>
                                    Course
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={'course'}
                                      onChange={handleChange}
                                    >
                                      <MenuItem value={'html'}>HTML</MenuItem>
                                      <MenuItem value={'css'}>CSS</MenuItem>
                                      <MenuItem value={'js'}>JS</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Box>
                                <Box sx={{ minWidth: 120 }}>
                                  <FormControl fullWidth>
                                    Status
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={'status'}
                                      onChange={handleChange}
                                    >
                                      <MenuItem value={0}>In-Active</MenuItem>
                                      <MenuItem value={1}>Active</MenuItem>

                                    </Select>
                                  </FormControl>
                                </Box>
                              </Box>
                            </Paper>

                          </Fade>
                        )}
                      </Popper>
                    </Box>
                  )}
                </PopupState>
                <Button variant="contained"> Add Session </Button>
              </Box>

              <Paper sx={{ width: '100%' }}>
                <TableContainer >
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                          return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number'
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </CardContent>
          </Card>
        </Box>
      </Box>
      {/* <Footer /> */}
    </>
  );
};

