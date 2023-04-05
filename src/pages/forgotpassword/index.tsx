"use client";

import * as React from "react";
import { Button, Divider,Link,Box,Typography,Grid,TextField } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import AuthSidebar from "../login/authSidebar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordType } from "@/types/authType";
import { userForgotPasswordValidations } from "@/validation_schema/authValidation";
import { HandleForgotPassword } from "@/services/auth";
import { LoadingButton } from "@mui/lab";
import CircularProgressBar from "@/common/circularProgressBar";

const theme = createTheme();

export default function ForgotPassword() {

  const { register,	handleSubmit,formState: { errors } } = useForm<forgotPasswordType>({resolver: yupResolver(userForgotPasswordValidations)});
  const [loading,setLoading] = React.useState<boolean>(false);

  const onSubmit = async(event:any) => {

    const reqData:any = {
      to:event.email,
      subject:'Reset Password'
    }

    const formData = new FormData()
    for (var key in reqData) {
      formData.append(key, reqData[key]);
    }
    setLoading(true)
    await HandleForgotPassword(formData).then((res) => {
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
      <ToastContainer/>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <AuthSidebar/>
        <Grid item xs={12} sm={7} md={5} lg={5}>
          <Box
            sx={{
              my: 20,
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
              Forgot Password
            </Typography>
            <Grid container>
              <Grid item className="GlobalTextColor">
                Enter Email Address
              </Grid>
            </Grid>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="outlined-email"
                label="Email Address"
                {...register("email")}
                autoFocus
              />
              {errors && errors.email ? ErrorShowing(errors?.email?.message) : ''}

              {!loading ? <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send
              </Button>
              : <LoadingButton loading={loading}  fullWidth
                size="large" sx={{ mt: 3, mb: 2 }}
                variant="outlined" disabled >
         <CircularProgressBar/>
        </LoadingButton>}

              <Link
                href="/login"
                variant="body2"
                className="GlobalTextColor"
                sx={{ textDecoration: "none" }}
              >
                Back to sign in
              </Link>

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
                  type="submit"
                  fullWidth
                  variant="outlined"
                  startIcon={<FacebookIcon />}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Continue with Facebook
                </Button>

                <Button
                  type="submit"
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
