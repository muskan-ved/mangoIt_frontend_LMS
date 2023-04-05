import { Box, Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import styles from "../../styles/login.module.css";

const AuthSidebar = () => {
    return ( <><CssBaseline />
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
    </Grid></> );
}
 
export default AuthSidebar;