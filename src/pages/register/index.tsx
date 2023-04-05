"use client";

import {useState} from "react";
import { Button, Divider,TextField,Link,Box,Grid,Typography, IconButton, } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import styles from "../../styles/login.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { registerType } from "../../types/authType";
import { userRegisterValidations } from "../../validation_schema/authValidation";
import { HandleRegister } from "@/services/auth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import CircularProgressBar from "@/common/circularProgressBar";
import AuthSidebar from "../login/authSidebar";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const theme = createTheme();

export default function Register() {

  const { register,	handleSubmit,formState: { errors }  } = useForm<registerType>({resolver: yupResolver(userRegisterValidations)});
  const router = useRouter();
  const [loading,setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const handleClickShowPassword = () => setShowPassword((show) => !show);
const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const onSubmit = async(event:any) => {

    setLoading(true)
      await HandleRegister(event).then((res) => {
        if(res.status === 201){
          router.push('/login')
        }
        setLoading(false)
      }).catch(() => {
        setLoading(false)
      })
  };


  function ErrorShowing (errorMessage:any){
    return ( <Typography variant="body2" color={'error'} gutterBottom>{errorMessage} </Typography> );
  }

  return (

    <ThemeProvider theme={theme}>
       <ToastContainer />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <AuthSidebar/>
        <Grid item xs={12} sm={7} md={5} lg={5}>
          <Box
            sx={{
              my: 1,
              mx: 13,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              className="GlobalTextColor"
              sx={{ fontWeight: "bold" }}
            >
              Create Your Account
            </Typography>
            <Grid container>
              <Grid item className="GlobalTextColor">
                Already have an account?
                <Link
                  href="/login"
                  variant="body2"
                  className={styles.signInUpColor}
                  sx={{ textDecoration: "none", ml: 1 }}
                >
                  Login
                </Link>
              </Grid>
            </Grid>

            <Box
              component="form"
              method="POST"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="outlined-fname"
                label="First Name"
                {...register("first_name")}
                autoFocus
              />
              {errors && errors.first_name ? ErrorShowing(errors?.first_name?.message) : ''}
              <TextField
                margin="normal"
                fullWidth
                {...register("last_name")}
                label="Last Name"
                id="outlined-lname"
              />
              {errors && errors.last_name ? ErrorShowing(errors?.last_name?.message) : ''}
              <TextField
                margin="normal"
                fullWidth
                id="outlined-email"
                label="Email Address"
                {...register("email")}
              />
              {errors && errors.email ? ErrorShowing(errors?.email?.message) : ''}
              <TextField
                margin="normal"
                fullWidth
                id="outlined-password"
                label="Password"
                {...register("password")}
                type={showPassword ? 'text' : 'password'}
                autoFocus
                InputProps={{
                  endAdornment: (
                     <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                  ),
                }}
               
              />
              {errors && errors.password ? ErrorShowing(errors?.password?.message) : ''}

              <TextField
                margin="normal"
                fullWidth
                {...register("confirm_password")}
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                id="outlined-confirm_password"
                InputProps={{
                  endAdornment: (
                     <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                  ),
                }}
              />
              {errors && errors.confirm_password ? ErrorShowing(errors?.confirm_password?.message) : ''}
              {!loading? <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button> : <LoadingButton loading={loading}  fullWidth
                size="large" sx={{ mt: 3, mb: 2 }}
                variant="outlined" disabled >
         <CircularProgressBar/>
        </LoadingButton>}

              <Box sx={{ marginLeft: "90px" }}>
                <Divider
                  className="GlobalTextColor"
                  sx={{ width: "80%", fontWeight: "bold" }}
                >
                  {" "}
                  Or{" "}
                </Divider>
              </Box>
              <Box textAlign={"center"}>
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  startIcon={<FacebookIcon />}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Continue with Facebook
                </Button>

                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  sx={{ mt: 1 }}
                >
                  Continue with Google
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
