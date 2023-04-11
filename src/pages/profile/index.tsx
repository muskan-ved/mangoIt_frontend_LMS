import * as React from "react";
import {
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import ProfileEdit from "./profileEdit";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRegisterValidations } from "../../validation_schema/authValidation";
import { registerType } from "../../types/authType";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";
import BackupIcon from "@mui/icons-material/Backup";
import profiles from "../../styles/profile.module.css";
import styles from "../../styles/sidebar.module.css";
import { ToastContainer } from "react-toastify";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import { useTheme } from '@mui/material/styles';
import { HandleProfile } from '@/services/user'

export default function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerType>({ resolver: yupResolver(userRegisterValidations) });


  const [toggle, setToggle] = React.useState<boolean>(false);
const theme = useTheme()


  const handleEdit = async () => {
    setToggle(true)

    const user=  await HandleProfile(64)
    console.log(user)
    
    // ProfileEdit()
  }

  return (
    <>
    <Navbar />
    <Box className={styles.combineContentAndSidebar}>
      <SideBar />

      <Box padding={2} width={'100%'}>
        {/* breadcumbs */}
        <BreadcrumbsHeading
          First="Home"
          Middle="Profile"
          Text="USER PROFILE"
          Link="/profile"
        />

        {/* main content */}
        <Card >
        <CardContent >
          <Grid container spacing={3} >
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box className={profiles.profileImageBox} >
                <Box component='img' src="/profile.png" width='150px' height='150px' borderRadius='15px' />
                <Box sx={{marginLeft:'15px'}}>
                  <Typography
                    variant="subtitle1"
                    sx={{fontWeight: "bold", color: "#7C7C7C" }}>
                    Shubham
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#7C7C7C" }}>
                    testemail@gmail.com
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#7C7C7C" }}>
                    Learner
                  </Typography>

                  <IconButton  onClick={handleEdit}>
                  <EditIcon>
                  </EditIcon>
                  </IconButton>
               
                </Box>
              </Box>
             </Grid>
            </Grid>
             
           <Grid container spacing={3}  columns={{ xs: 8, sm: 8, md: 12, lg:12 }} sx={{ maxWidth: '50%', width:' 100%',  float: 'right', marginRight:'100px', marginBottom:'150px' }}>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: toggle ? false : true,
                }}
                id="outlined-fname"
                label="First Name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: toggle ? false : true,
                }}
                id="outlined-fname"
                label="Last Name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: toggle ? false : true,
                }}
                id="outlined-email"
                label="Email Address"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={2}
                  label="Role"
                 
                >
                  <MenuItem value={1}>Admin</MenuItem>
                  <MenuItem value={2}>Learner</MenuItem>
                </Select>
              </FormControl>
            </Grid>
{/*          
            <Grid item xs={12} sm={12} md={12} lg={12} >
            <Button
              fullWidth
              sx= {{backgroundColor: "blue !important", border:'dashed'}}
              variant="contained"
              component="label"
                   >
             <BackupIcon />
                Upload a File
                <input
               type="file"
                   hidden
                    />
            </Button>
            </Grid> */}
          </Grid>
        </CardContent>
      </Card>
  
      </Box>
    </Box>
  </>

  );
}
