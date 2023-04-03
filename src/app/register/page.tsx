"use client";

import * as React from "react";
import { Button, Divider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styles from "../../styles/login.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

const theme = createTheme();

export default function Register() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="fname"
                label="First Name"
                name="fname"
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                name="lname"
                label="Last Name"
                id="lname"
              />
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <TextField
                margin="normal"
                fullWidth
                name="cpassword"
                label="Confirm Password"
                type="cpassword"
                id="cpassword"
              />

              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>

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
