"use client";

import * as React from "react";
import { Button, Divider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styles from "../../styles/login.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";

const theme = createTheme();

export default function ResetPassword() {

    const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/')
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={5} md={7} lg={7}>
          <Box
            component={"img"}
            src={"/Images/company_logo.png"}
            width={"210px"}
            height={"70px"}
            className={styles.loginSideLogo}
          />
          <Box
            component={"img"}
            src={"/Images/authSide.png"}
            className={styles.loginSideImage}
            height={"640px"}
          />
        </Grid>
        <Grid item xs={12} sm={7} md={5} lg={5}>
          <Box
            sx={{
              my: 28,
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
              Reset Password
            </Typography>
           
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="npassword"
                label="Enter New Password"
                name="npassword"
                type="password"
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                name="cpassword"
                label="Confirm Password"
                type="password"
                id="cpassword"
              />

              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
