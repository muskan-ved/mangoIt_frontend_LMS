// ***** React Import
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
// MUI Import
import { Box, Button, Card, CardContent, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
// External Components
import SideBar from "@/common/LayoutNavigations/sideBar";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import Footer from "@/common/LayoutNavigations/footer";
import Navbar from "../../../../common/LayoutNavigations/navbar";
import RichEditor from "@/common/RichTextEditor/textEditor";
// Helper Import
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { moduleValidations } from '@/validation_schema/moduleValidation';
import { LoadingButton } from "@mui/lab";
import CircularProgressBar from '@/common/CircularProcess/circularProgressBar';
import SpinnerProgress from '@/common/CircularProgressComponent/spinnerComponent';
import { capitalizeFirstLetter } from '@/common/CapitalFirstLetter/capitalizeFirstLetter';
// Types Import
import { courseType } from '@/types/courseType';
import { moduleType } from '@/types/moduleType';
// CSS Import
import styles from "../../../../styles/sidebar.module.css";
import ModuleCss from "../../../../styles/modules.module.css"
import { ToastContainer } from 'react-toastify';
// API services
import { HandleCourseGet } from '@/services/course';
import { HandleModuleCreate } from '@/services/module';


export default function AddSession() {
   const router: any = useRouter();
   const [despcriptionContent, setdespcriptionContent] = useState("");
   const [getCourses, setCourses] = useState<courseType | any>();
   const [isLoadingButton, setLoadingButton] = useState<boolean>(false);
   const [isLoading, setLoading] = useState<boolean>(false);

   const {
      register,
      handleSubmit,
      reset,
      setValue,
      control,
      formState: { errors },
   } = useForm<moduleType | any>({
      resolver: yupResolver(moduleValidations),
   });

   const handleContentChange = (value: string, identifier: string) => {
      setdespcriptionContent(value);
      setValue(identifier, value);

   };

   const onSubmit = async (event: any) => {
      setLoading(true);
      setLoadingButton(false)
      try {
         const res = await HandleModuleCreate(event)
         setLoading(false);
         setTimeout(() => {
            router.push('/courses/allmodules/')
         }, 1000)
      } catch (e) {
         console.log(e)
         setLoadingButton(true)
      }
   };

   const getCourseData = () => {
      HandleCourseGet('', '').then((courses) => {
         setCourses(courses.data)
      })
   };

   useEffect(() => {
      let localData: any;
      if (typeof window !== "undefined") {
         localData = window.localStorage.getItem("userData");
      }
      if (localData) {
         const userId = JSON.parse(localData);
         getCourseData();

      }
   }, []);

   function ErrorShowing(errorMessage: any) {
      return (
         <Typography variant="body2" color={"error"} gutterBottom>
            {errorMessage}{" "}
         </Typography>
      );
   }

   // console.log("oopps", getModules)
   return (
      <>
         <Navbar />
         <Box className={styles.combineContentAndSidebar}>
            <SideBar />
            <Box className={styles.siteBodyContainer}>
               {/* breadcumbs */}
               <BreadcrumbsHeading
                  First="Home"
                  Middle="Module"
                  Text="MODULE"
                  Link="/modules/addmodule"
               />
               {/* main content */}
               <Card>
                  <CardContent>
                     {!isLoading ?
                        <Box
                           component="form"
                           method="POST"
                           noValidate
                           autoComplete="off"
                           onSubmit={handleSubmit(onSubmit)}
                           onReset={reset}
                        >
                           <Grid container spacing={2}>
                              <Grid item xs={12} sm={12} md={12} lg={6} >
                                 <Box component="img" src="/Images/pages/addFeature.jpg" width={'100%'} />
                              </Grid>

                              <Grid item xs={12} sm={12} md={12} lg={6} >
                                 <Typography>ADD MODULE</Typography>
                                 <Grid item xs={12} sm={12} md={12} lg={12} className={ModuleCss.sessionNameGride} >

                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                       <InputLabel>
                                          Module Name
                                       </InputLabel>
                                       <TextField
                                          placeholder="Module Name"
                                          {...register("title")}
                                       />
                                       {errors && errors.title
                                          ? ErrorShowing(errors?.title?.message)
                                          : ""}
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                       <InputLabel>Course of Module</InputLabel>
                                       <Controller
                                          name="course_id"
                                          control={control}
                                          defaultValue=""
                                          render={({ field }) => (
                                             <FormControl fullWidth>
                                                <Select {...field} displayEmpty>
                                                   <MenuItem disabled value="">
                                                      Select Course
                                                   </MenuItem>
                                                   {getCourses?.map((course: any) => {
                                                      return (<MenuItem key={course.id} value={course.id}>{capitalizeFirstLetter(course?.title)}</MenuItem>)
                                                   })}
                                                </Select>
                                             </FormControl>
                                          )}
                                       />
                                       {errors && errors.course_id
                                          ? ErrorShowing(errors?.course_id?.message)
                                          : ""}
                                    </Grid>
                                 </Grid>

                                 <Grid item xs={12} sm={12} md={12} lg={12} mb={2} >
                                    <InputLabel>Status</InputLabel>
                                    <Controller
                                       name="status"
                                       control={control}
                                       defaultValue=""
                                       render={({ field }) => (
                                          <FormControl fullWidth>
                                             <Select {...field} displayEmpty>
                                                <MenuItem disabled value="">
                                                   Status
                                                </MenuItem>
                                                <MenuItem value={'active'} >
                                                   Active
                                                </MenuItem>
                                                <MenuItem value={'inactive'}>
                                                   In-active
                                                </MenuItem>
                                             </Select>
                                          </FormControl>
                                       )}
                                    />
                                    {errors && errors.status ? ErrorShowing(errors?.status?.message) : ""}
                                 </Grid>

                                 <Grid item xs={12} sm={12} md={12} lg={12} mb={2} >
                                    <InputLabel>Description</InputLabel>
                                    <RichEditor
                                       {...register("description")}
                                       value={despcriptionContent}
                                       onChange={(e) =>
                                          handleContentChange(e, "description")
                                       }
                                    />
                                    {despcriptionContent ? '' : errors && errors.description ? ErrorShowing(errors?.description?.message) : ""}
                                 </Grid>


                                 <Grid item xs={12} sm={12} md={12} lg={12} textAlign={"right"} >
                                    {!isLoadingButton ? <Button type="submit" size="large" variant="contained">
                                       ADD NEW MODULE
                                    </Button> : <LoadingButton loading={isLoadingButton} className={ModuleCss.updateLoadingButton}
                                       size="large" variant="contained" disabled >
                                       <CircularProgressBar />
                                    </LoadingButton>}
                                 </Grid>
                              </Grid>

                           </Grid>
                        </Box>
                        : <SpinnerProgress />}
                  </CardContent>
               </Card>
            </Box>
         </Box>
         {/* <Footer/> */}
         <ToastContainer />
      </>
   );
};


