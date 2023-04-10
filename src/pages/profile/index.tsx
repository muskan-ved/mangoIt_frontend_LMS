import * as React from "react";
import {
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
import { red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import Navbar from "@/common/navbar";
import SideBar from "@/common/sideBar";
import BackupIcon from "@mui/icons-material/Backup";
import styles from "../../styles/profile.module.css";
import { ToastContainer } from "react-toastify";

export default function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerType>({ resolver: yupResolver(userRegisterValidations) });


  const [toggle,setToggle] = React.useState<boolean>(false);


  const handleEdit = async() => {
    setToggle(true)
   
    // await ProfileEdit(event).then((res) => {
    //   if(res.status === 201){
    //     router.push('/login')
    //   }
    //   setToggle(false)
    // }).catch(() => {
    //   setToggle(false)
    // })
  

    ProfileEdit()
  }

  return (
    <>

    <Navbar/>
    <Box className={styles.combineContentAndSidebar}>
    <SideBar/>
    
  
    <Grid item xs={12} sm={7} md={5} lg={5}>
    <Card >
    <CardContent>

      <Box
        sx={{
          height: "100vh",
          display: "flex",
          position: "absolute",
          top: "64px",
          width: "100% !important"
        }}
      >
        <SideBar />
        <ToastContainer />
        <Card sx={{ width: "100%" }} >
          <CardContent >
            <Grid container spacing={3}>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box className={styles.profileImageBox}>
                  <Box component='img' src="/profile.png" width='150px' height='150px' />
                  <Box >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold" }}>
                      Shubham
                    </Typography>

                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "bold" }}>
                      Email: testemail@gmail.com
                    </Typography>

                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "bold" }}>
                      Role: Learner
                    </Typography>

                    <EditIcon onClick={handleEdit}>
                    </EditIcon>
                 
                  </Box>
                </Box>
              </Grid>
            </Grid>


            <Grid container spacing={3} sx={{ width: '100%', maxWidth: '50%', float: 'right' }}>

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
            </Grid>
          </CardContent>
        </Card>
      </Box>
      </CardContent>
      </Card>
      </Grid>
      </Box>
    </>
  );
}
