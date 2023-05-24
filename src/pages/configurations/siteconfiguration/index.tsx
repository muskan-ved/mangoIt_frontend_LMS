// ** External Components
import { useState } from "react";
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
import UploadIcon from "@mui/icons-material/Upload";

// ** CSS Imports
import styles from "../../../styles/sidebar.module.css";
import siteStyles from "../../../styles/allConfigurations.module.css";

// ** React Imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Types Imports
import { siteType } from "@/types/siteType";


// ** Service & Validation Imports
import { siteConfigValidations } from "@/validation_schema/siteValidation";
import { HandleSiteConfigCreate } from "@/services/site";

const SiteConfiguration = () => {
  const [previewProfile, setPreviewProfile] = useState<siteType>({
    org_logo: "",
    org_favicon: "",
  });
	const [isLoadingButton, setLoadingButton] = useState<boolean>(false);
  const [portalData, setPortalData] = useState<siteType>({
    org_title: "",
    org_logo: "",
    org_favicon: "",
  });

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
	const reqData:any = 
		{
			org_title: event?.org_title,
			org_logo: event?.org_logoo,
			org_favicon: event?.org_favicoon,
		}
	
	// HandleSiteConfigCreate
	const formData:any = new FormData()

		for (var key in reqData) {
			formData.append(key, reqData[key]);
		}

		setLoadingButton(true)
		await HandleSiteConfigCreate(formData)
			.then((res) => {
				setLoadingButton(false)
console.log(res,"ress")
				// setTimeout(() => {
				// 	setToggle(!toggle);
				// 	getProfileData(res.data.id);
				// }, 900);
			})
			.catch((err) => {
				console.log(err);
				setLoadingButton(false)

			});
  };

  const handleChange = (e: any) => {
    const file = e.target.files[0];

    if (e.target.name === "org_logo") {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setPreviewProfile({ ...previewProfile, org_logo: e.target.result });
        setValue("org_logoo", file);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else if (e.target.name === "org_favicon") {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setPreviewProfile({ ...previewProfile, org_favicon: e.target.result });
        setValue("org_favicoon", file);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  function ErrorShowing(errorMessage: any) {
    return (
      <Typography variant="body2" color={"error"} gutterBottom>
        {errorMessage}{" "}
      </Typography>
    );
  }

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
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Box
                      component="img"
                      src="/Images/pages/sideImages/siteSide.svg"
                      width={"100%"}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      margin={"10px 0px 20px 0px"}
                    >
                      <InputLabel
                        shrink
                        htmlFor="org_title"
                        className={siteStyles.inputLabels}
                      >
                        Organisation Title
                      </InputLabel>
                      <TextField
                        fullWidth
                        id="org_title"
                        {...register("org_title")}
                        defaultValue={"orglogo"}
                      />
                      {errors && errors.org_title
                        ? ErrorShowing(errors?.org_title?.message)
                        : ""}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      marginBottom={"20px"}
                    >
                      <InputLabel
                        shrink
                        htmlFor="org_llogo"
                        className={siteStyles.inputLabels}
                      >
                        Organisation Logo
                      </InputLabel>

                      {/* show uploaded by db */}

                      {/* upload in db */}

                      <Box className={siteStyles.siteAttachmentBox}>
                        <InputLabel className={siteStyles.subbox}>
                          <input
                            type="file"
                            {...register("org_logo")}
                            onChange={handleChange}
                            hidden
                          />
                          {previewProfile?.org_logo ? (
							<Box className={siteStyles.cameraIconMain}>
                            <Box
                              component={"img"}
                              src={previewProfile?.org_logo}
                              className={siteStyles.previewImage}
                              width={"200px"}
                            />
							<IconButton className={siteStyles.siteCameraIconLogo} aria-label="upload picture" component="label">  <input
                            type="file"
                            {...register("org_logo")}
                            onChange={handleChange}
                            hidden
                          /> <UploadIcon className={siteStyles.cameraAltIconLogo} /> </IconButton>
						  </Box>
                          ) : (
                            <Typography className={siteStyles.siteAttachments}>
                              {" "}
                              <UploadIcon /> UPLOAD
                            </Typography>
                          )}
                        </InputLabel>
                      </Box>
                      {previewProfile?.org_logo
                        ? ""
                        : errors && errors.org_logoo
                        ? ErrorShowing(errors?.org_logoo?.message)
                        : ""}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      marginBottom={"20px"}
                    >
                      <InputLabel
                        shrink
                        htmlFor="org_logo"
                        className={siteStyles.inputLabels}
                      >
                        Organisation Favicon
                      </InputLabel>

                      {/* show uploaded by db */}

                      {/* upload in db */}

                      <Box className={siteStyles.siteAttachmentBox}>
                        <InputLabel className={siteStyles.subbox}>
                          <input
                            type="file"
                            {...register("org_favicon")}
                            onChange={handleChange}
                            hidden
                          />
                          {previewProfile?.org_favicon ? (
							<Box className={siteStyles.cameraIconMain}>
                            <Box
                              component={"img"}
                              src={previewProfile?.org_favicon}
                              className={siteStyles.previewImage}
                              width={"50px"}
                            />
							<IconButton className={siteStyles.siteCameraIconFavicon} aria-label="upload picture" component="label">  <input
                            type="file"
                            {...register("org_favicon")}
                            onChange={handleChange}
                            hidden
                          /> <UploadIcon className={siteStyles.cameraAltIconFavicon} /> </IconButton>
																</Box>
                          ) : (
                            <Typography className={siteStyles.siteAttachments}>
                              {" "}
                              <UploadIcon /> UPLOAD
                            </Typography>
                          )}
                        </InputLabel>
                      </Box>
                      {previewProfile?.org_favicon
                        ? ""
                        : errors && errors.org_favicoon
                        ? ErrorShowing(errors?.org_favicoon?.message)
                        : ""}
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
