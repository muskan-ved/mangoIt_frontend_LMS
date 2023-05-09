// ***** React Import
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";

// MUI Import
import { Box, Button, Card, CardContent, FormControl, Grid, IconButton, InputLabel, MenuItem, NativeSelect, Select, TextField, Typography } from "@mui/material";

// External Components
import SideBar from "@/common/LayoutNavigations/sideBar";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import Footer from "@/common/LayoutNavigations/footer";
import Navbar from "../../../../common/LayoutNavigations/navbar";
import RichEditor from "@/common/RichTextEditor/textEditor";

// validation import

// Helper Import
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sessionValidations } from '@/validation_schema/sessionValidation';
import { LoadingButton } from "@mui/lab";
import CircularProgressBar from '@/common/CircularProcess/circularProgressBar';
import SpinnerProgress from '@/common/CircularProgressComponent/spinnerComponent';

// Types Import
import { sessionType } from '@/types/sessionType';
import { courseType } from '@/types/courseType';
import { moduleType } from '@/types/moduleType';
// CSS Import
import styles from "../../../../styles/sidebar.module.css";
import Sessions from "../../../../styles/session.module.css"
import { ToastContainer } from 'react-toastify';

// API services
import { HandleCourseGet } from '@/services/course';
import { HandleModuleGet } from '@/services/module';
import { HandleSessionUpdate, HandleSessionCreate, HandleSessionGetByID } from '@/services/session';
import { capitalizeFirstLetter } from '@/common/CapitalFirstLetter/capitalizeFirstLetter';


export default function AddSession() {

   const router: any = useRouter();
   const [despcriptionContent, setdespcriptionContent] = useState("");
   const [updateSession, setUpdateSession] = useState<sessionType | any>([]);
   const [getCourses, setCourses] = useState<courseType | any>();
   // const [getSession, setSession] = useState<sessionType | any>('7');
   const [getSessionName, setSessionName] = useState<sessionType | any>();
   // const [Value, setValue] = useState("1");
   const [getModules, setModules] = useState<moduleType | any>();
   const [file, setFile] = useState<string | any>('')
   const [isLoadingButton, setLoadingButton] = useState<boolean>(false);
   const [isLoading, setLoading] = useState<boolean>(false);

   const {
      register,
      handleSubmit,
      reset,
      setValue,
      control,
      formState: { errors },
   } = useForm<sessionType | any>({
      resolver: yupResolver(sessionValidations),
   });

   const handleContentChange = (value: string, identifier: string) => {
      setdespcriptionContent(value);
      setValue(identifier, value);

   };

   const onSubmit = async (event: any) => {
      const id = router.query.id
      // const reqData = { ...event, 'attachment': file }
      // const reqData = { ...event, 'title': getSessionName, 'attachment': file }
      const reqData: any = {
         description: event.description,
         module_id: event.module_id,
         course_id: event.course_id,
         title: event.title,
         attachment: file
      }

      const formData = new FormData()
      for (var key in reqData) {
         formData.append(key, reqData[key]);
      }
      // console.log('dfd',reqData)


      setLoading(true);
      setLoadingButton(false)
      try {
         const res = await HandleSessionUpdate(id, formData)
         getSessionData()
         setLoading(false);
         setTimeout(() => {
            router.push('/courses/allsessions/')
         }, 1000)
      } catch (e) {
         console.log(e)
         setLoadingButton(true)
      }

   };

   const handleUpdate = (e: any) => {
      // setSessionName(e.target.value);
      setUpdateSession(e.target.value)
      console.log('fef', updateSession)

   }

   const getSessionData = async () => {
      const id = router.query.id
      HandleSessionGetByID(id).then((session) => {
         setUpdateSession(session.data)
         // const fields = [
         //    "title",
         //    "module_id",
         //    "course_id",
         //    "description",
         // ];
         // fields.forEach((field) => setValue(field, session.data[field]));

      })

   }

   const getCourseData = () => {
      HandleCourseGet().then((courses) => {
         setCourses(courses.data)
      })

   };

   const getModuleData = () => {
      HandleModuleGet().then((modules) => {
         setModules(modules.data)
      })
   }

   useEffect(() => {
      let localData: any;
      if (typeof window !== "undefined") {
         localData = window.localStorage.getItem("userData");
         // console.log('ddsds',localData)
      }
      if (localData) {
         getSessionData();
         getCourseData();
         getModuleData();
      }
   }, []);

   function ErrorShowing(errorMessage: any) {
      return (
         <Typography variant="body2" color={"error"} gutterBottom>
            {errorMessage}{" "}
         </Typography>
      );
   }
   const errorFunction = () => {
      // return ("error")
   }

   const handleChange = (e: any) => {
      const file = e.target.files[0];

      if (e.target.name === "attachment") {
         const reader = new FileReader();
         reader.onload = (e: any) => {
            setFile(file);
            setValue("file", file);
         }
         if (file) {
            reader.readAsDataURL(file);
         }
      }
   }

   console.log('checkDataaa', updateSession.course?.id)
   return (
      <>
         <Navbar />
         <Box className={styles.combineContentAndSidebar}>
            <SideBar />

            <Box className={styles.siteBodyContainer}>
               {/* breadcumbs */}
               <BreadcrumbsHeading
                  First="Home"
                  Middle="Session"
                  Text="SESSION"
                  Link="/sessions/updatesession"
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
                                 <Typography>EDIT SESSION</Typography>
                                 <Grid item xs={12} sm={12} md={12} lg={12} className={Sessions.sessionNameGride} >

                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                       <InputLabel>
                                          Session Name
                                       </InputLabel>
                                       <TextField
                                          {...register("title")}
                                          value={updateSession.title}
                                          onChange={handleUpdate}
                                       // defaultValue={updateSession.title}
                                       />



                                       {errors && errors.title
                                          ? ErrorShowing(errors?.title?.message)
                                          : ""}
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                       <InputLabel>Course of session</InputLabel>
                                       <Controller
                                          name="course_id"
                                          control={control}
                                          defaultValue={updateSession.course?.id}
                                          render={({ field }) => (
                                             <FormControl fullWidth>
                                                <Select {...field}  displayEmpty>
                                                   {/* <MenuItem value=''>
                                                      {updateSession.course?.title}
                                                   </MenuItem> */}
                                                   {getCourses?.map((course: any) => {
                                                      return (<MenuItem key={course.id} value={course.id}>{capitalizeFirstLetter(course?.title)}</MenuItem>)
                                                   })}
                                                </Select>
                                             </FormControl>
                                          )}
                                       />
                                       {/* <InputLabel>Course of session</InputLabel>
                                       <Controller
                                          name="course_id"
                                          control={control}
                                          defaultValue=''
                                          render={({ field }) => (
                                             <FormControl fullWidth>
                                                <Select {...field} displayEmpty>
                                                   {/* <MenuItem value=''>
                                                      {updateSession.course?.title}
                                                   </MenuItem> */}

                                       {/* {getCourses?.map((course: any) => {
                                                      return (<MenuItem key={course.id}  value={course.id}>{capitalizeFirstLetter(course?.title)}</MenuItem>)
                                                   })} */}

                                       {/* <FormControl fullWidth>
                                          <InputLabel id="Input label">Course of session</InputLabel>
                                          <Select
                                             labelId="Input label"
                                             id="Select"
                                             // value={updateSession.course?.id}
                                             defaultValue={course?.id}
                                             onChange={handleValueChange}
                                          >
                                              {getCourses?.map((course: any) => {
                                                      return (<MenuItem key={course.id}  value={course.id}>{capitalizeFirstLetter(course?.title)}</MenuItem>)
                                                   })}
                                          </Select>
                                       </FormControl> */}


                                       {/* <option value={10}>Ten</option>
                                                   <option value={20}>Twenty</option>
                                                   <option value={30}>Thirty</option>
                                       {/* <FormControl fullWidth>
                                          {getCourses?.map((course: any) => {
                                              <NativeSelect
                                                defaultValue={course.id}
                                                inputProps={{
                                                   name: 'course_id',
                                                   id: 'uncontrolled-native',
                                                }}
                                             >

                                                <option key={course.id} value={course.id}> {capitalizeFirstLetter(course?.title)}</option>

                                             </NativeSelect>
                                          })}
                                       </FormControl> }
                                       */}

                                       {errors && errors.course_id
                                          ? ErrorShowing(errors?.course_id?.message)
                                          : ""}
                                    </Grid>
                                 </Grid>

                                 <Grid item xs={12} sm={12} md={12} lg={12} mb={2} >
                                    <InputLabel>Module of session</InputLabel>
                                    <Controller
                                       name="module_id"
                                       control={control}
                                       defaultValue=""
                                       render={({ field }) => (
                                          <FormControl fullWidth>
                                             <Select {...field} displayEmpty>
                                                <MenuItem value="">
                                                   {updateSession.module?.title}
                                                </MenuItem>
                                                {getModules?.map((module: any) => {
                                                   return (<MenuItem key={module.id} value={module.id}>{capitalizeFirstLetter(module?.title)}</MenuItem>)
                                                })}
                                             </Select>
                                          </FormControl>
                                       )}
                                    />
                                    {errors && errors.module_id ? ErrorShowing(errors?.module_id?.message) : ""}
                                 </Grid>

                                 <Grid item xs={12} sm={12} md={12} lg={12} mb={2}>
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

                                 <Grid item xs={12} sm={12} md={12} lg={12} mb={2}>
                                    <InputLabel>Attachment</InputLabel>
                                    <Box className={Sessions.sessionAttachmentBox}>
                                       <InputLabel className={Sessions.subbox} >

                                          <input
                                             type="file"
                                             {...register('attachment')}
                                             onChange={handleChange}
                                             hidden
                                          />

                                          <Typography className={Sessions.sessionAttachments}>  {!file.name ? "Upload" : file.name}</Typography></InputLabel>
                                    </Box>
                                    {file ? '' : errors && errors.file ? ErrorShowing(errors?.file?.message) : ""}
                                 </Grid>
                                 <Grid item xs={12} sm={12} md={12} lg={12} textAlign={"right"} >
                                    {!isLoadingButton ? <Button type="submit" size="large" variant="contained">
                                       UPDATE SESSION
                                    </Button> : <LoadingButton loading={isLoadingButton} className={Sessions.updateLoadingButton}
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


