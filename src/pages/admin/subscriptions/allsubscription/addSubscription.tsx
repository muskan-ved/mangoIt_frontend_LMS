// ***** React Import
import React, { useState } from "react";
import { useRouter } from "next/router";
// MUI Import
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
// External Components
import SideBar from "@/common/LayoutNavigations/sideBar";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import Footer from "@/common/LayoutNavigations/footer";
import Navbar from "../../../../common/LayoutNavigations/navbar";
// Helper Import
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import CircularProgressBar from "@/common/CircularProcess/circularProgressBar";
import SpinnerProgress from "@/common/CircularProgressComponent/spinnerComponent";
// Types Import
import { sessionType } from "@/types/sessionType";
// CSS Import
import styles from "../../../../styles/sidebar.module.css";
import Subscription from "../../../../styles/subscription.module.css";
import { ToastContainer } from "react-toastify";
// API services
import { subscriptionValidations } from "@/validation_schema/subscriptionValidation";
import { HandleSubscriptionPost } from "@/services/subscription";


export default function AddSubscription() {
  const router: any = useRouter();
  const [isLoadingButton, setLoadingButton] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<sessionType | any>({
    resolver: yupResolver(subscriptionValidations),
  });

  const onSubmit = async (event: any) => {
    let localData: any;
    if (typeof window !== "undefined") {
      const parsingData: any = window.localStorage.getItem("userData");
      localData = JSON.parse(parsingData);
    }


    const reqData: any = {
      name: event.name,
      description: event.description,
      price: event.price,
      userId: localData.id,
      startDate: event.duration,
      status: event.status,
      duration_term: event.duration_term,
      duration_value: event.duration_value,
    };

    setLoading(true);
    setLoadingButton(false);
    try {
      const res = await HandleSubscriptionPost(reqData);
      setLoading(false);
      router.push("/admin/subscription/");
    } catch (e) {
      console.log(e);
      setLoadingButton(true);
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
            Middle="Subscription"
            Current="Add Subscription"
            Text="SUBSCRIPTION"
            Link="/admin/subscriptions/allsubscription/"
          />
          {/* main content */}
          <Card>
            <CardContent>
              {!isLoading ? (
                <Box
                  component="form"
                  method="POST"
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit)}
                  onReset={reset}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                      <Box
                        component="img"
                        src="/Images/sideImages/add_section.svg"
                        width={"100%"}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6}>
                      <Typography
                        className={Subscription.InputLabelFont}
                        mb={3}
                        mt={4}
                      >
                        ADD SUBSCRIPTION
                      </Typography>

                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        className={Subscription.sessionNameGride}
                      >
                        <Grid item xs={12} sm={12} md={6} lg={6} mr={2}>
                          <InputLabel className={Subscription.InputLabelFont}>
                            Subscription Name
                          </InputLabel>
                          <TextField
                            placeholder="Subscription Name"
                            {...register("name")}
                            fullWidth
                          />
                          {errors && errors.name
                            ? ErrorShowing(errors?.name?.message)
                            : ""}
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <InputLabel className={Subscription.InputLabelFont}>
                            Price
                          </InputLabel>
                          <TextField
                            placeholder="Price"
                            {...register("price")}
                            fullWidth
                          />
                          {errors && errors.price
                            ? ErrorShowing(errors?.price?.message)
                            : ""}
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        className={Subscription.sessionNameGride}
                      >
                        <Grid item xs={12} sm={12} md={6} lg={6} mr={2}>
                          <InputLabel className={Subscription.InputLabelFont}>
                            Duration Term
                          </InputLabel>
                          <TextField
                            placeholder="Duration Term"
                            {...register("duration_term")}
                            fullWidth
                          />
                          {errors && errors.duration_term
                            ? ErrorShowing(errors?.duration_term?.message)
                            : ""}
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <InputLabel className={Subscription.InputLabelFont}>
                            Duration Value
                          </InputLabel>
                          <TextField
                            placeholder="Duration Value"
                            {...register("duration_value")}
                            fullWidth
                          />
                          {errors && errors.duration_value
                            ? ErrorShowing(errors?.duration_value?.message)
                            : ""}
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        className={Subscription.sessionNameGride}
                      >
                        <Grid item xs={12} sm={12} md={6} lg={6} mr={2}>
                          <InputLabel className={Subscription.InputLabelFont}>
                            Duration
                          </InputLabel>
                          <TextField
                            fullWidth
                            type="date"
                            placeholder="Duration Date"
                            {...register("duration")}
                          />
                          {errors && errors.duration
                            ? ErrorShowing(errors?.duration?.message)
                            : ""}
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <InputLabel className={Subscription.InputLabelFont}>
                            Status
                          </InputLabel>
                          <Controller
                            name="status"
                            control={control}
                            defaultValue="active"
                            render={({ field }) => (
                              <FormControl fullWidth>
                                <Select {...field} displayEmpty>
                                  <MenuItem value={"active"}>Active</MenuItem>
                                  <MenuItem value={"inactive"}>
                                    Inactive
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            )}
                          />
                          {errors && errors.module_id
                            ? ErrorShowing(errors?.module_id?.message)
                            : ""}
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={12} mb={2}>
                        <InputLabel className={Subscription.InputLabelFont}>
                          Description
                        </InputLabel>
                        <TextareaAutosize minRows={4} aria-label="empty textarea" placeholder="Empty" {...register("description")} className={Subscription.textareaManuallyStyle} />

                        {errors && errors.description
                          ? ErrorShowing(errors?.description?.message)
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
                          className={Subscription.cancelButton}
                          variant="contained"
                          size="large"
                          onClick={() => router.push("/admin/subscription")}
                          id={styles.muibuttonBackgroundColor}
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
                            className={Subscription.updateLoadingButton}
                            size="large"
                            variant="contained"
                            disabled
                          >
                            <CircularProgressBar />
                          </LoadingButton>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <SpinnerProgress />
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
      {/* <Footer/> */}
      <ToastContainer />
    </>
  );
}
