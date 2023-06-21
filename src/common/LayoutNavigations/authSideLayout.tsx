import { Box, Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import styles from "../../styles/login.module.css";

const AuthSidebar = () => {
    return ( <><CssBaseline />
    <Grid item xs={12} sm={12} md={6} lg={6}>
      <Box
        component={"img"}
        src={"/Images/company_logo.png"}
        width={"210px"}
        height={"70px"}
        className={styles.loginSideLogo}
      />
      <Box
        component={"img"}
        src={"/Images/pages/sideImages/Sign in-amico.svg"}
        className={styles.loginSideImage}
        height={"86vh"}
      />
    </Grid></> );
}
 
export default AuthSidebar;