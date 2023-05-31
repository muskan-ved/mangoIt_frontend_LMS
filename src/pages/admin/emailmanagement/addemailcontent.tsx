import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";
import { Box } from "@mui/system";
import styles from "../../../styles/sidebar.module.css";
import {
  Button,
  Card,
  CardContent,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import CircularProgressBar from "@/common/CircularProcess/circularProgressBar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailmanagementConfigValidations } from "@/validation_schema/configurationValidation";
import emailStyle from "../../../styles/allConfigurations.module.css";
import { emailmanagementType } from "@/types/siteType";
import {
  HandleEmailContentCreate,
} from "@/services/email";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

const AddEmailContent = () => {
  const [isLoadingButton, setLoadingButton] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<emailmanagementType | any>({
    resolver: yupResolver(emailmanagementConfigValidations),
  });

  const router = useRouter();

  const onSubmit = async (event: any) => {

    const reqData = {
            emailfrom: event.emailfrom,
            emailtype: event.emailtype,
            emailsubject: event.emailsubject
    }
    setLoadingButton(true);
    await HandleEmailContentCreate(reqData)
      .then((res) => {
        setLoadingButton(false);
        setTimeout(() =>{
            router.back()
        },2000)
      })
      .catch((err) => {
        console.log(err);
        setLoadingButton(false);
      });
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
            Middle="Email"
            Text="EMAIL MANAGEMENT"
            Link="/admin/emailmanagement"
          />

          {/* main content */}
          <Card>
            <CardContent>
              
                {/* save data in portal db */}
                <Box
                  component="form"
                  method="POST"
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit)}
                  onReset={reset}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <InputLabel
                        shrink
                        htmlFor="emailfrom"
                        className={emailStyle.inputLabels}
                      >
                        E-mail From
                      </InputLabel>
                      <TextField
                        fullWidth
                        id="emailfrom"
                        {...register("emailfrom")}
                        placeholder="Provide your email"
                      />
                      {errors && errors.emailfrom
                        ? ErrorShowing(errors?.emailfrom?.message)
                        : ""}
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <InputLabel
                        shrink
                        htmlFor="emailtype"
                        className={emailStyle.inputLabels}
                      >
                        E-Mail Type
                      </InputLabel>
                      <TextField
                        fullWidth
                        id="emailtype"
                        {...register("emailtype")}
                        placeholder="Provide your email type"
                      />
                      {errors && errors.emailtype
                        ? ErrorShowing(errors?.emailtype?.message)
                        : ""}
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <InputLabel
                        shrink
                        htmlFor="emailsubject"
                        className={emailStyle.inputLabels}
                      >
                        E-mail Subject
                      </InputLabel>
                      <TextField
                        fullWidth
                        id="emailsubject"
                        {...register("emailsubject")}
                        placeholder="Provide your subject for email"
                      />
                      {errors && errors.emailsubject
                        ? ErrorShowing(errors?.emailsubject?.message)
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
                        <Button
                          type="button"
                          size="large"
                          className={emailStyle.bothButtonSpace}
                          variant="contained"
                          onClick={() => router.back()}
                        >
                          Cancel
                        </Button>
                      {!isLoadingButton ? (
                        <Button
                          type="submit"
                          size="large"
                          variant="contained"
                          id={styles.muibuttonBackgroundColor}
                        >
                          Submit
                        </Button>
                      ) : (
                        <LoadingButton
                          loading={isLoadingButton}
                          size="large"
                          className={emailStyle.siteLoadingButton}
                          variant="contained"
                          disabled
                        >
                          <CircularProgressBar />
                        </LoadingButton>
                      )}
                    </Grid>
                  </Grid>
                </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <ToastContainer/>
    </>
  );
};

export default AddEmailContent;
