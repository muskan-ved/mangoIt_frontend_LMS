
// React Import
import { useEffect, useState } from "react";
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
import TableRow from "@mui/material/TableRow";
import { SearchOutlined } from "@mui/icons-material";
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
// CSS Import
import styles from "../../../styles/sidebar.module.css";
import Subscription from "../../../styles/subscription.module.css"
import { ToastContainer } from "react-toastify";
// API Service
import { AlertDialog } from "@/common/DeleteListRow/deleteRow";
import { HandleSubscriptionDelete, HandleSubscriptionGet } from "@/services/subscription";

interface Column {
    id: "id" | "name" | "price" | "durationTerm" | "durationValue" | "status" | "createdBy" | "action";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }
  
  const columns: Column[] = [
    { id: "id", label: "ID", },
    { id: "name", label: "SUBSCRIPTION NAME", minWidth: 190 },
    { id: "price", label: "PRICE", minWidth: 100 },
    { id: "durationTerm", label: "DURATION TERM", minWidth: 160 },
    { id: "durationValue", label: "DURATION VALUE", minWidth: 160 },
    { id: "status", label: "STATUS", minWidth: 100 },
    { id: "createdBy", label: "CREATED BY", minWidth: 120 },
    { id: "action", label: "ACTION", minWidth: 100 },
  ];
  

const Subscriptions = () => {

    const [rows, setRows] = useState<any>([]);
    const [toggle, setToggle] = useState<boolean>(false);
    const [search, setSearch] = useState('');
    const [deleteRow, setDeleteRow] = useState<any>([])
    const [open, setOpen] = useState(false);
    const [getFilter, setFilter] = useState<any>({filter:'all'});
    const [filterObject, setFilterObject] = useState<any>('');
const router = useRouter()


     //pagination
  const [row_per_page, set_row_per_page] = useState(5);
  let [page, setPage] = useState<any>(1);
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

  const {
    handleSubmit,
    control,
    reset,
  } = useForm();

  const handleClickOpen = (row: any) => {
    setDeleteRow(row)
    setOpen(!open);

  }
  // to delete a row
  const handleDeletesRow = () => {
    HandleSubscriptionDelete(deleteRow.id).then((newRows) => {
        setRows(newRows.data)
        getAllSubscriptionData()
      })
    setOpen(!open);
  }

  const resetFilterValue = () => {
    setFilter({filter:'all'})
    reset({ status: 0 });
  }

  const handleSort = (rowsData: any) => {
    const sortData = handleSortData(rowsData)
    setRows(sortData)
    setToggle(!toggle)
  }
  
  const handleSearch = (e: any, identifier: any) => {
    setPage(1);
    if (identifier === 'reset') {
        getAllSubscriptionData()
      setSearch(e)
    }else {
      setSearch(e.target.value)
      getAllSubscriptionData(e.target.value)
    }
  }

  const getAllSubscriptionData = (search:string='') => {
    HandleSubscriptionGet(search).then((subs:any) => {
      setRows(subs.data)
    })
  }

  useEffect(() => {
    getAllSubscriptionData();
  }, [])

  const onfiltersSubmit = (e: any, identifier: any) => {
    setFilter(0)
  }

    return ( <>
      <Navbar />
      <Box className={styles.combineContentAndSidebar}>
        <SideBar />

        <Box className={styles.siteBodyContainer}>
          {/* breadcumbs */}
          <BreadcrumbsHeading
           First="Home"
           Middle="Subscriptions"
           Text="SUBSCRIPTIONS"
           Link="/admin/subscription"
          />

          {/* main content */}
          <Card>
            <CardContent>
            <TextField
                id="standard-search"
                value={search}
                variant="outlined"
                placeholder="Search by 'Subscription Name'"
                onChange={(e) => handleSearch(e, '')}
                sx={{width:'25%'}}
                InputProps={{
                  endAdornment: (
                    !search ? <IconButton>
                      <SearchOutlined />
                    </IconButton> : <IconButton onClick={(e) => handleSearch('', 'reset')}> <CloseIcon /></IconButton>
                  ),
                }}
              />
              <Box
                className={Subscription.mainFilterBox}
              >
                <PopupState variant="popover" popupId="demo-popup-popover" >
                  {(popupState) => (
                    <Box >
                      <Button
                        className={Subscription.popStateFilterButton}
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
                              <Typography variant="h5" className={Subscription.filterBox}>
                                Filter
                              </Typography>
                              <Box component="form"
                                noValidate
                                onSubmit={handleSubmit(onfiltersSubmit)}
                                className={Subscription.filterForm}
                              >
                               
                                  <Grid container spacing={2}>
                                   
                                    <Grid item xs={12} lg={12}>
                                      
                                        <InputLabel className={Subscription.statusInFilter} >
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
                                   
                                    </Grid>
                                    <Grid
                                      item
                                      xs={12}
                                      lg={12}
                                    >
                                      <Box className={Subscription.boxInFilter}>
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
                                          id={styles.muibuttonBackgroundColor}
                                          size="medium"
                                          type="submit"
                                          variant="contained"
                                          color="primary"
                                          className={Subscription.applyButtonInFiltter}
                                          onClick={popupState.close}
                                        >
                                          Apply
                                        </Button>
                                      </Box>
                                    </Grid>
                                  </Grid>
                               
                              </Box>
                            </Grid>
                          </Container>
                        </Box>
                      </Popover>
                    </Box>
                  )}
                </PopupState>
                &nbsp;
                <Button variant="contained" onClick={() => router.push('/admin/subscription/addSubscription')} id={styles.muibuttonBackgroundColor}> + Add Subscription</Button>
              </Box>
              <Paper className={Subscription.papperForTable}>
                <TableContainer className={Subscription.tableContainer}>
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
                            className={Subscription.tableHeadingForId}
                          >
                            {column.label === "ID" ? (
                              <>
                                {column.label}
                                {toggle ? (
                                  <ArrowDownwardOutlinedIcon fontSize="small" />
                                ) : (
                                  <ArrowUpwardOutlinedIcon fontSize="small" />
                                )}
                              </>
                            ) : (
                              column.label
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows && rows.length > 0 ? DATA.currentData() &&
                        DATA.currentData()
                          .map((row: any) => {

                            const statusColor = (row.status === "active" ? Subscription.activeClassColor : row.status === "inactive" ? Subscription.inactiveClassColor : Subscription.draftClassColor)
                            return (
                              <TableRow
                                hover
                                // role="checkbox"
                                // tabIndex={-1}
                                key={row.id}
                              >
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{capitalizeFirstLetter(row.name)}</TableCell>
                                <TableCell>{row.price}</TableCell>
                                <TableCell>{capitalizeFirstLetter(row.duration_term)}</TableCell>
                                <TableCell>{row.duration_value}</TableCell>
                                <TableCell className={statusColor}>{capitalizeFirstLetter(row.status)}</TableCell>
                                <TableCell>{capitalizeFirstLetter(row?.user?.first_name)} {capitalizeFirstLetter(row?.user?.last_name)}</TableCell>
                                 <TableCell><Button onClick={() => router.push(`/admin/subscription/updatesubscription/${row.id}`)} variant="outlined" color="success" className={Subscription.editDeleteButton}><ModeEditOutlineIcon /></Button>
                                  <Button className={Subscription.editDeleteButton} variant="outlined" color="error" onClick={() => handleClickOpen(row)}><DeleteOutlineIcon /></Button> 
                                 </TableCell>
                              </TableRow>
                            );
                          })
                        : <TableRow><TableCell colSpan={6} className={Subscription.tableLastCell}> <Typography>Record not Found</Typography> </TableCell></TableRow>}
                    </TableBody>
                  </Table>
                  <Stack
                    className={Subscription.stackStyle}
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
    </> );
}
 
export default Subscriptions;