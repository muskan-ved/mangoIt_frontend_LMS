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
// Helper Import
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { courseValidations } from '@/validation_schema/courseValidation';
import { LoadingButton } from "@mui/lab";
import CircularProgressBar from '@/common/CircularProcess/circularProgressBar';
import SpinnerProgress from '@/common/CircularProgressComponent/spinnerComponent';
import { capitalizeFirstLetter } from '@/common/CapitalFirstLetter/capitalizeFirstLetter';
// Types Import
import { sessionType } from '@/types/sessionType';
import { courseType } from '@/types/courseType';
import { moduleType } from '@/types/moduleType';
// CSS Import
import styles from "../../../../../styles/sidebar.module.css";
import ModuleCss from "../../../../../styles/modules.module.css";
import { ToastContainer } from 'react-toastify';
// API services
import { HandleCourseGet, HandleCourseGetByID, HandleCourseUpdate } from '@/services/course';
import { Attachment, Description, Image, Movie, PictureAsPdf } from '@mui/icons-material';
import { type } from 'os';
import { HandleModuleGetByID, HandleModuleUpdate } from '@/services/module';
import { moduleValidations } from '@/validation_schema/moduleValidation';



export default function UpdateModule() {
    // const router: any = useRouter();
    // const [getDespcriptionContent, setDespcriptionContent] = useState("");
    // const [getUpdateModule, setUpdateModule] = useState<moduleType | any>([]);
    // const [getModule, setModule] = useState<moduleType | any>();
    // const [getCourses, setCourses] = useState<courseType | any>();
    // const [getCourseId, setCourseId] = useState<any>("");
    // const [isLoadingButton, setLoadingButton] = useState<boolean>(false);
    // const [isLoading, setLoading] = useState<boolean>(false);
    // const [error, setErrors] = useState<string>();
    // const {
    //     register,
    //     handleSubmit,
    //     reset,
    //     setValue, getValues,
    //     control,
    //     formState: { errors }, setError
    // } = useForm<moduleType | any>({
    //     resolver: yupResolver(moduleValidations),
    // });
    // console.log('getvalue', getValues())

    // useEffect(() => {
    //     let localData: any;
    //     if (typeof window !== "undefined") {
    //         localData = window.localStorage.getItem("userData");
    //     }
    //     if (localData) {
    //         getModuleData();
    //         getCourseData();
    //     }
    // }, [router.query]);

    // const handleContentChange = (value: string, identifier: string) => {
    //     if (identifier === 'description') {
    //         if (value === '<p><br></p>') {
    //             setError(identifier, { message: 'Description is a required field' });
    //             setValue(identifier, '');

    //         } else {
    //             setError(identifier, { message: '' })
    //             setValue(identifier, value);
    //         }
    //         setDespcriptionContent(value);
    //     }

    // };

    // const onSubmit = async (event: any) => {
    //     const id = router.query.id
    //     console.log(event, "onsubmit", errors)

    //     if (errors.description?.message === '' || (typeof errors === 'object' && errors !== null)) {
    //         setLoading(true);
    //         setLoadingButton(false)
    //         try {
    //             const res = await HandleModuleUpdate(id, event)
    //             getModuleData()
    //             setLoading(false);
    //             setTimeout(() => {
    //                 router.push('/admin/courses/allmodules/')
    //             }, 1000)
    //         } catch (e) {
    //             console.log(e)
    //             setLoadingButton(true)
    //         }
    //     } else {
    //         setError('description', { message: 'Description is a required field' });
    //     }
    // };

    // const handleUpdate = (e: any) => {
    //     // if(e.target.name === 'title'){
    //     setModule({ ...getModule, title: e.target.value })
    //     // }
    // }

    // const getModuleData = async () => {
    //     const id = router.query.id
    //     if (id) {
    //         HandleModuleGetByID(id).then((module) => {
    //             setModule(module.data)
    //             setCourseId(module.data?.course_id)
    //             const fields = [
    //                 "course_id",
    //                 "title",
    //                 "status",
    //                 "description",
    //             ];
    //             fields.forEach((field) => setValue(field, module.data[field]));
    //             // setCourseId(module.data?.course_id)
    //         })
    //             .catch((error) => {
    //                 setErrors(error.message);
    //             });
    //     }
    //     // console.log('Course', getCourse)
    //     if (error) {
    //         return <Typography >{error}</Typography >;
    //     }

    //     if (!getModule) {
    //         return <Typography >Loading...</Typography >;
    //     }
    // }


    // const getCourseData = () => {
    //     HandleCourseGet('', '').then((courses) => {
    //         setCourses(courses.data)
    //     })
    // };





    // function ErrorShowing(errorMessage: any) {
    //     return (
    //         <Typography variant="body2" color={"error"} gutterBottom>
    //             {errorMessage}{" "}
    //         </Typography>
    //     );
    // }
    // console.log(getDespcriptionContent,"opps",errors,getModule?.description )
    return (
        <Box>
            <Box>update user</Box>
        </Box>
        // <>
        //   <Navbar />
        //   <Box className={styles.combineContentAndSidebar}>
        //     <SideBar />

        //     <Box className={styles.siteBodyContainer}>
        //       {/* breadcumbs */}
        //       <BreadcrumbsHeading
        //         First="Home"
        //         Middle="Module"
        //         Text="MODULE"
        //         Link="/admin/courses/allmodules"
        //       />
        //       {/* main content */}
        //       <Card>
        //         <CardContent>
        //           {!isLoading ?
        //             <Box
        //               component="form"
        //               method="POST"
        //               noValidate
        //               autoComplete="off"
        //               onSubmit={handleSubmit(onSubmit)}
        //               onReset={reset}
        //             >
        //               <Grid container spacing={2}>
        //                 <Grid item xs={12} sm={12} md={12} lg={6} >
        //                   <Box component="img" src="/Images/pages/addFeature.jpg" width={'100%'} />
        //                 </Grid>

        //                 <Grid item xs={12} sm={12} md={12} lg={6} mt={5}>
        //                   <Typography className={ModuleCss.InputLabelFont} mb={1}>EDIT MODULE</Typography>
        //                   <Grid item xs={12} sm={12} md={12} lg={12} className={ModuleCss.courseNameGride} >

        //                     <Grid item xs={12} sm={12} md={6} lg={6}>
        //                       <InputLabel className={ModuleCss.InputLabelFont}>
        //                         Module Name
        //                       </InputLabel>
        //                       <TextField
        //                         {...register("title")}
        //                         value={getModule?.title}
        //                         onChange={handleUpdate}
        //                       />
        //                       {errors && errors.title
        //                         ? ErrorShowing(errors?.title?.message)
        //                         : ""}
        //                     </Grid>

        //                     <Grid item xs={12} sm={12} md={6} lg={6}>
        //                       <InputLabel className={ModuleCss.InputLabelFont}>Course of Module</InputLabel>
        //                       <Controller
        //                         name="course_id"
        //                         control={control}
        //                         defaultValue={getCourseId}                          
        //                         render={({ field }) => (
        //                           <FormControl fullWidth>
        //                             <Select {...field} displayEmpty>
        //                               <MenuItem disabled value="">
        //                                 Select Course
        //                               </MenuItem>
        //                               {getCourses?.map((course: any) => {
        //                                 return (<MenuItem key={course?.course.id} value={course?.course.id}>{capitalizeFirstLetter(course?.course.title)}</MenuItem>)
        //                               })}
        //                             </Select>
        //                           </FormControl>
        //                         )}
        //                       />
        //                       {errors && errors.course
        //                         ? ErrorShowing(errors?.course?.message)
        //                         : ""}
        //                     </Grid>
        //                   </Grid>

        //                   <Grid item xs={12} sm={12} md={12} lg={12} mb={2} >
        //                     <InputLabel className={ModuleCss.InputLabelFont}>Status</InputLabel>
        //                     <Controller
        //                       name="status"
        //                       control={control}
        //                       defaultValue={getModule?.status || ""}
        //                       // defaultValue=''
        //                       render={({ field }) => (
        //                         <FormControl fullWidth>
        //                           <Select {...field} displayEmpty>
        //                             <MenuItem value={'active'}>
        //                               Active
        //                             </MenuItem>
        //                             <MenuItem value={'inactive'}>
        //                               In-active
        //                             </MenuItem>
        //                           </Select>
        //                         </FormControl>
        //                       )}
        //                     />
        //                     {errors && errors.status
        //                       ? ErrorShowing(errors?.status?.message)
        //                       : ""}
        //                   </Grid>
        //                   <Grid item xs={12} sm={12} md={12} lg={12} mb={2}>
        //                     <InputLabel className={ModuleCss.InputLabelFont}>Description</InputLabel>
        //                     <RichEditor
        //                       {...register("description")}
        //                       value={getDespcriptionContent ? getDespcriptionContent : getModule?.description}
        //                       onChange={(value) =>
        //                         handleContentChange(value, "description")
        //                       }
        //                     />
        //                     {errors && errors.description ? ErrorShowing(errors?.description?.message) : ""}
        //                     {/* {getDespcriptionContent ? '' : errors && errors.description ? ErrorShowing(errors?.description?.message) : ""} */}
        //                   </Grid>

        //                   <Grid item xs={12} sm={12} md={12} lg={12} textAlign={"right"} >
        //                   <Button className={ModuleCss.cancelButton} variant="contained" size="large" onClick={() => router.push('/admin/courses/allmodules')} >Cancel</Button>
        //                     {!isLoadingButton ? <Button type="submit" size="large" variant="contained" id={styles.muibuttonBackgroundColor}>
        //                       UPDATE
        //                     </Button> : <LoadingButton loading={isLoadingButton} className={ModuleCss.updateLoadingButton}
        //                       size="large" variant="contained" disabled >
        //                       <CircularProgressBar />
        //                     </LoadingButton>}
        //                   </Grid>
        //                 </Grid>

        //               </Grid>
        //             </Box>
        //             : <SpinnerProgress />}
        //         </CardContent>
        //       </Card>
        //     </Box>
        //   </Box>
        //   {/* <Footer/> */}
        //   <ToastContainer />
        // </>
    );
};

