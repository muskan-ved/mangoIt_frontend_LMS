import Navbar from "@/common/navbar";
import SideBar from "@/common/sideBar";
import { Box } from "@mui/material";

const AllCourses = () => {
    return ( <>
        <Navbar/>
        <Box sx={{ height: "100vh", display: "flex" ,position: "absolute",   top: "64px"}}>
        <SideBar/>
        
        All COurses
        </Box>
        </>
     );
}
 
export default AllCourses;