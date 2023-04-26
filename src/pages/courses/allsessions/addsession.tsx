// ***** React Import
import React, { useState, useEffect } from 'react';

// MUI Import
import { Box, Button, Card, CardContent, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

// External Components
import SideBar from "@/common/LayoutNavigations/sideBar";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import Footer from "@/common/LayoutNavigations/footer";
import Navbar from "../../../common/LayoutNavigations/navbar";
import RichEditor from "@/common/RichTextEditor/textEditor";

// validation import

// Helper Import
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sessionValidations } from '@/validation_schema/sessionValidation';

// Types Import
import { sessionType } from '@/types/sessionType';
import { courseType } from '@/types/courseType';
import { moduleType } from '@/types/moduleType';
// CSS Import
import styles from "../../../styles/sidebar.module.css";
import Sessions from "../../../styles/session.module.css"

// API services
import { HandleCourse } from '@/services/course';
import { HandleModule } from '@/services/module';
import { HandleSessionCreate } from '@/services/session';


export default function addSession() {

   const [despcriptionContent, setdespcriptionContent] = useState("");
   const [getCourses, setCourses] = useState<courseType | any>();
   const [getModules, setModules] = useState<moduleType | any>();
   const [file, setFile] = useState<string | any>('')

   const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
   } = useForm<sessionType | any>({
      resolver: yupResolver(sessionValidations),
   });

   const handleContentChange = (value: string, identifier: string) => {
      setdespcriptionContent(value);
      setValue(identifier, value);

   };

   const onSubmit = (event: any) => {
      const reqData = { ...event, 'profile_pic': file }
      const formData = new FormData()
      for (var key in reqData) {
			formData.append(key, reqData[key]);
		}

      HandleSessionCreate(formData).then((res)=>{
         console.log(res)
      })
      // console.log("session submit", event);
   };

   const getCourseData = () => {
      HandleCourse().then((courses) => {
         setCourses(courses.data)
      })

   };

   const getModuleData = () => {
      HandleModule().then((modules) => {
         setModules(modules.data)
      })
   }

   useEffect(() => {
      let localData: any;
      if (typeof window !== "undefined") {
         localData = window.localStorage.getItem("userData");
      }
      if (localData) {
         const userId = JSON.parse(localData);
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
  
   const handleChange = (e: any) => {
		const file = e.target.files[0];
		if (e.target.name === "attachment") {
			const reader = new FileReader();
			reader.onload = (e: any) => {
				setFile(file)
			}
			reader.readAsDataURL(file);
		}
	}
   //  console.log(file)
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
                  Link="/sessions/addsession"
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
                        <Grid container spacing={2}>
                           <Grid item xs={12} sm={12} md={12} lg={6} >
                              <Box component="img" src="/Images/pages/addFeature.jpg" width={'100%'} />
                           </Grid>

                           <Grid item xs={12} sm={12} md={12} lg={6} >
                              <Typography>ADD SESSION</Typography>
                              <Grid item xs={12} sm={12} md={12} lg={12} className={Sessions.sessionNameGride} >

                                 <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <InputLabel>
                                       Session Name
                                    </InputLabel>
                                    <TextField
                                       placeholder="Session Name"
                                       {...register("title")}
                                    />
                                    {errors && errors.title
                                       ? ErrorShowing(errors?.title?.message)
                                       : ""}
                                 </Grid>

                                 <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <InputLabel>Course of session</InputLabel>
                                    <FormControl fullWidth>
                                       <Select {...register("course_id")}>
                                          {getCourses?.map((course: any) => {
                                             return (<MenuItem value={course.id}>{course.title}</MenuItem>)
                                          })}

                                       </Select>
                                    </FormControl>
                                    {errors && errors.course_id
                                       ? ErrorShowing(errors?.course_id?.message)
                                       : ""}
                                 </Grid>
                              </Grid>

                              <Grid item xs={12} sm={12} md={12} lg={12} mb={2} >
                                 <InputLabel>Module of session</InputLabel>
                                 <FormControl fullWidth>
                                    <Select {...register("module_id")}>
                                       {getModules?.map((module: any) => {
                                          return (<MenuItem value={module.id}>{module.title}</MenuItem>)
                                       })}

                                    </Select>
                                 </FormControl>
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
                                 {errors && errors.description ? ErrorShowing(errors?.description?.message) : ""}
                              </Grid>

                              <Grid item xs={12} sm={12} md={12} lg={12} mb={2}>
                                 <InputLabel>Attachment</InputLabel>
                                 <Box className={Sessions.sessionAttachmentBox}>
                                    <InputLabel className={Sessions.subbox} >
                                       <input
                                          type="file"
                                          {...register("attachment")}
                                          onChange={handleChange}
                                          hidden
                                       />
                                       <Typography className={Sessions.sessionAttachments}> Upload</Typography></InputLabel>
                                 </Box>
                                 {errors && errors.attachment ? ErrorShowing(errors?.attachment?.message) : ""}
                              </Grid>
                              <Grid item xs={12} sm={12} md={12} lg={12} textAlign={"right"} >
                                 <Button type="submit" size="large" variant="contained">
                                    ADD NEW SESSION
                                 </Button>
                              </Grid>
                           </Grid>

                        </Grid>
                     </Box>
                  </CardContent>
               </Card>
            </Box>
         </Box>
         {/* <Footer/> */}
      </>
   );
};


