// ***** React Import
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// MUI Import
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputAdornment,
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
import Navbar from "../../../../../common/LayoutNavigations/navbar";
// Helper Import
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import CircularProgressBar from "@/common/CircularProcess/circularProgressBar";
import SpinnerProgress from "@/common/CircularProgressComponent/spinnerComponent";
// Types Import
import { subscriptionPlan } from "@/types/subscription";
// CSS Import
import styles from "../../../../../styles/sidebar.module.css";
import Subscription from "../../../../../styles/subscription.module.css";
import { ToastContainer } from "react-toastify";
// API services
import { subscriptionPlanValidations } from "@/validation_schema/subscriptionValidation";
import { GetSubsctionsPlansDet, UpdateSubscriptionPlan } from "@/services/subscription";

export default function UpdateSubscriptionPlans() {
  const router: any = useRouter();
  const [isLoadingButton, setLoadingButton] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [durationTerm, setDurationTerm] = useState<any>('');


const {id} = router.query;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<subscriptionPlan | any>({
    resolver: yupResolver(subscriptionPlanValidations),
  });

  const onSubmit = async (event: any) => {

    setLoadingButton(true);
    try {
      const res = await UpdateSubscriptionPlan(id,event);
      if(res.status === 201){
        setTimeout(() =>{
            router.push("/admin/subscriptions/plans/");
        },2000)
      }
      setLoadingButton(false);
    } catch (e) {
      console.log(e);
      setLoadingButton(false);
    }
  };

  const getSubscriptionPlanById = () => {
    GetSubsctionsPlansDet(id).then((subscriptions: any) => {
      const fields = [
        "title",
        "amount",
        "duration_value",        
        "duration_term",
      ];
      fields.forEach((field) => setValue(field, subscriptions[field]));
      setDurationTerm(subscriptions?.duration_term)
    })
  }

  useEffect(() => {
    getSubscriptionPlanById()
  }, [])

  const handleDurationTerm = (e:any) => {
    setValue('duration_term',e.target.value)
    setDurationTerm(e.target.value)
  }


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
            Middle="Subscription Plans"
            Current="Update Subscription Plan"
            Text="SUBSCRIPTION PLANS"
            Link="/admin/subscriptions/plans/"
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
                  <Grid container >
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Box
                        component="img"
                        src="/Images/pages/addFeature.jpg"
                        width={"85%"}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Typography
                        className={Subscription.InputLabelFont}
                        mb={3}
                        mt={4}
                      >
                        UPDATE SUBSCRIPTION PLAN
                      </Typography>

                        <Grid item xs={12} sm={12} md={12} lg={12} mb={2}>
                          <InputLabel className={Subscription.InputLabelFont}>
                            Subscription Title
                          </InputLabel>
                          <TextField
                            placeholder="Subscription Title"
                            {...register("title")}
                            fullWidth
                          />
                          {errors && errors.title
                            ? ErrorShowing(errors?.title?.message)
                            : ""}
                        </Grid>

                        
                        <Grid item xs={12} sm={12} md={12} lg={12} mb={2}>
                          <InputLabel className={Subscription.InputLabelFont}>
                            Duration Term
                          </InputLabel>
                          <Controller
                            name="duration_term"
                            control={control}
                            defaultValue="month"
                            
                            render={({ field }) => (
                              <FormControl fullWidth>
                                <Select {...field} value={durationTerm} onChange={e => handleDurationTerm(e)}displayEmpty>
                                  <MenuItem value={"week"}>Week</MenuItem>
                                  <MenuItem value={"month"}>Month</MenuItem>
                                  <MenuItem value={"year"}>Year</MenuItem>
                                </Select>
                              </FormControl>
                            )}
                          />
                          {errors && errors.duration_term
                            ? ErrorShowing(errors?.duration_term?.message)
                            : ""}
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} mb={2}>
                          <InputLabel className={Subscription.InputLabelFont}>
                            Duration Value
                          </InputLabel>
                          <TextField
                          type="number"
                            placeholder="Duration Value"
                            {...register("duration_value")}
                            fullWidth
                          />
                          {errors && errors.duration_value
                            ? ErrorShowing(errors?.duration_value?.message)
                            : ""}
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} mb={2}>
                          <InputLabel className={Subscription.InputLabelFont}>
                            Price
                          </InputLabel>
                          <TextField
                          type="number"
                            placeholder="Subscription Price"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                              }}
                            {...register("amount")}
                            fullWidth
                          />
                          {errors && errors.amount
                            ? ErrorShowing(errors?.amount?.message)
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
                          onClick={() => router.push("/admin/subscriptions/plans/")}
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
                            Update
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
