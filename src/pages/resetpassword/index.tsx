import * as React from "react";
import { Button ,TextField,Box,Grid,Typography, InputAdornment, IconButton} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import AuthSidebar from "../../common/LayoutNavigations/authSideLayout";
import { LoadingButton } from "@mui/lab";
import CircularProgressBar from "@/common/CircularProcess/circularProgressBar";
import { resetPasswordType } from "@/types/authType";
import { yupResolver } from "@hookform/resolvers/yup";
import { userResetPasswordValidations } from "@/validation_schema/authValidation";
import { useForm } from "react-hook-form";
import { HandleResetPassword } from "@/services/auth";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Visibility, VisibilityOff } from "@mui/icons-material";

const theme = createTheme();

export default function ResetPassword() {

    const { register,	handleSubmit,formState: { errors } } = useForm<resetPasswordType>({resolver: yupResolver(userResetPasswordValidations)});
    const router = useRouter();
    const [loading,setLoading] = React.useState<boolean>(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const onSubmit = async(event: any) => {
    
    const getToken = {token : localStorage.getItem('forgotPasswordToken'),
  }
  const reqData = {
    ...getToken,
    ...event
};
    setLoading(true)
    await HandleResetPassword(reqData).then((res) => {
    if(res.status === 202){
      router.push('/login')
      localStorage.removeItem('forgotPasswordToken')
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
      <ToastContainer/>
      <Grid container component="main">
        <AuthSidebar/>
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
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="outlined-basic"
                label="New Password"
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
                margin="none"
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

             {!loading ? <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button> : <LoadingButton loading={loading}  fullWidth
                size="large" sx={{ mt: 3, mb: 2 }}
                variant="outlined" disabled >
         <CircularProgressBar/>
        </LoadingButton>}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
