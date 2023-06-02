import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";
import { Box } from "@mui/material";
import styles from "../../../styles/sidebar.module.css";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import { useEffect, useState } from "react";
import { usePagination } from "@/common/Pagination/paginations";
import { useForm } from "react-hook-form";
import { handleSortData } from "@/common/Sorting/sorting";

interface Column {
    id: "id" | "name" | "description" | "price" | "durationTerm" | "durationValue" | "createdBy" | "action";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }
  
  const columns: Column[] = [
    { id: "id", label: "ID", },
    { id: "name", label: "SUBSCRIPTION NAME", minWidth: 170 },
    { id: "description", label: "DESCRIPTION", minWidth: 100 },
    { id: "price", label: "PRICE", minWidth: 100 },
    { id: "durationTerm", label: "DURATION TERM", minWidth: 100 },
    { id: "durationValue", label: "STATUS", minWidth: 100 },
    { id: "createdBy", label: "STATUS", minWidth: 100 },
    { id: "action", label: "ACTION", minWidth: 100 },
  ];
  

const Subscriptions = () => {

    const [rows, setRows] = useState<any>([]);
    const [toggle, setToggle] = useState<boolean>(false);
    const [search, setSearch] = useState('');
    const [deleteRow, setDeleteRow] = useState<any>([])
    const [open, setOpen] = useState(false);
    const [getFilter, setFilter] = useState<number>(0);
    const [filterObject, setFilterObject] = useState<any>('');

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
    // console.log('row', row)
    setDeleteRow(row)
    setOpen(!open);

  }
  // to delete a row
  const handleDeletesRow = () => {
    // HandleCourseDelete(deleteRow.id).then((deletedRow) => {
    //   HandleSubscriptionsGet('', filterObject).then((newRows) => {
    //     setRows(newRows.data)
    //   })
    // })
    setOpen(!open);
  }

  const resetFilterValue = () => {
    setFilter(0)
    reset({ is_chargeable: 0, status: 0 });
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
        getAllSubscriptionData()
      setSearch(e)
    } else {
      const search = e.target.value;
      setSearch(e.target.value)
      getAllSubscriptionData()
    }
  }

  const getAllSubscriptionData = () => {
    // HandleSubscriptionsGet().then((courses:any) => {
    //   console.log(courses,"45")
    //   setRows(courses.data)
    // })
  }

  useEffect(() => {
    getAllSubscriptionData();
  }, [])

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
            <Box> All Module</Box>
          </Box>
        </Box>
      </> );
}
 
export default Subscriptions;