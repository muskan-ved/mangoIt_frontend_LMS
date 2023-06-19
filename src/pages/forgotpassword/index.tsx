import * as React from "react";
import { Button, Divider, Box, Typography, Grid, TextField } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthSidebar from "../../common/LayoutNavigations/authSideLayout";
import sidebarStyles from "../../styles/sidebar.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordType } from "@/types/authType";
import { userForgotPasswordValidations } from "@/validation_schema/authValidation";
import { HandleForgotPassword } from "@/services/auth";
import { LoadingButton } from "@mui/lab";
import CircularProgressBar from "@/common/CircularProcess/circularProgressBar";
import Link from "next/link";

const theme = createTheme();

export default function ForgotPassword() {

  const { register, handleSubmit, formState: { errors } } = useForm<forgotPasswordType>({ resolver: yupResolver(userForgotPasswordValidations) });
  const [loading, setLoading] = React.useState<boolean>(false);

  const onSubmit = async (event: any) => {

    const reqData: any = {
      to: event.email,
      emailType: 'forgot_password'
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

  function ErrorShowing(errorMessage: any) {
    return (<Typography variant="body2" color={'error'} gutterBottom>{errorMessage} </Typography>);
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Grid container component="main">
        <AuthSidebar />
        <Grid item xs={12} sm={7} md={5} lg={5}>
          <Box
            sx={{
              my: 24,
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
                className="authPageButton"
                id={sidebarStyles.muibuttonBackgroundColor}
                sx={{ mt: 3, mb: 2 }}

              >
                Send
              </Button>
                : <LoadingButton loading={loading} fullWidth
                  size="large" sx={{ mt: 3, mb: 2 }}
                  variant="outlined" disabled >
                  <CircularProgressBar />
                </LoadingButton>}

              <Link
                href="/login"
                className="GlobalTextColor"
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
                  startIcon={ <Box
                    component={"img"}
                    src={"/Images/pages/google.svg"}
                    width={"18px"}
                    height={"18px"}
                 
                  />}
                  sx={{ mt: 3 , color: "#000",borderColor: "#e8661b"}}
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
