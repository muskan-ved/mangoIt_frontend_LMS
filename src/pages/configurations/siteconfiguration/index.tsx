// ** External Components
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";

// ** MUI Imports
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import UploadIcon from '@mui/icons-material/Upload';

// ** CSS Imports
import styles from "../../../styles/sidebar.module.css";
import siteStyles from "../../../styles/allConfigurations.module.css";

// ** React Imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Validation Imports
import { siteConfigValidations } from "@/validation_schema/siteValidation";
import { siteType } from "@/types/siteType";

const SiteConfiguration = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<siteType | any>({
    resolver: yupResolver(siteConfigValidations),
  });

  const onSubmit = async (event: any) => {
    console.log(event,"event")
  }

  const handleChange = (e: any) => {
    const file = e.target.files[0];

    if (e.target.name === "attachment") {
       const reader = new FileReader();
       reader.onload = (e: any) => {
        //   setFile(file);
        //   setValue("file", file);
       }
       if (file) {
          reader.readAsDataURL(file);
       }
    }
 }

  console.log(errors,"errors")

  return (
    <>
      <Navbar />
      <Box className={styles.combineContentAndSidebar}>
        <SideBar />

        <Box className={styles.siteBodyContainer}>
          {/* breadcumbs */}
          <BreadcrumbsHeading
            First="Home"
            Middle="Site"
            Text="SITE"
            Link="/configurations/siteconfiguration/"
          />

          {/* main content */}
          <Card>
            <CardContent>
              <Box
                component="form"
                method="POST"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                onReset={reset}
              >
                <Grid container spacing={3} marginBottom={"20px"}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <InputLabel shrink htmlFor="org_title" className={siteStyles.inputLabels}>
                      Organisation Title
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="org_title"
                      {...register("org_title")}
                      defaultValue={"org_logo"}
                    />
                    {/* {errors && errors.first_name
												? ErrorShowing(errors?.first_name?.message)
												: ""} */}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                  <InputLabel shrink htmlFor="org_llogo" className={siteStyles.inputLabels}>
                      Organisation Logo
                    </InputLabel>
                   
                        {/* show uploaded by db */}
                        

                        {/* upload in db */}
                      
                                   
                                    <Box className={siteStyles.siteAttachmentBox}>
                                       <InputLabel className={siteStyles.subbox} >
                                          <input
                                             type="file"
                                             {...register('org_logo')}
                                             onChange={handleChange}
                                             hidden
                                          />
                                          <Typography className={siteStyles.siteAttachments}> <UploadIcon/> UPLOAD</Typography>
                                       </InputLabel>
                                    </Box>
                                    {/* {file ? '' : errors && errors.file ? ErrorShowing(errors?.file?.message) : ""} */}
                                
                      
                    
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                  <InputLabel shrink htmlFor="org_logo" className={siteStyles.inputLabels}>
                      Organisation Favicon
                    </InputLabel>
                   
                        {/* show uploaded by db */}
                        

                        {/* upload in db */}
                      
                                   
                                    <Box className={siteStyles.siteAttachmentBox}>
                                       <InputLabel className={siteStyles.subbox} >
                                          <input
                                             type="file"
                                             {...register('org_favicon')}
                                            //  onChange={handleChange}
                                             hidden
                                          />
                                          <Typography className={siteStyles.siteAttachments}> <UploadIcon/> UPLOAD</Typography>
                                       </InputLabel>
                                    </Box>
                                    {/* {file ? '' : errors && errors.file ? ErrorShowing(errors?.file?.message) : ""} */}
                                
                      
                    
                  </Grid>

                 

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    textAlign={"right"}
                  >
                    <Button type="submit" size="large" variant="contained">
                      Submit
                    </Button>
                    {/* : <LoadingButton loading={isLoadingButton}
													size="large" className={profiles.updateLoadingButton} variant="contained" disabled >
													<CircularProgressBar />
												</LoadingButton>} */}
                  </Grid>
                  {/* )} */}
                </Grid>
              </Box>
              {/* : <SpinnerProgress />} */}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default SiteConfiguration;
