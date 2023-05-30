// ***** React Import
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
// MUI Import
import { Box, Button, Card, CardContent, FormControl, Grid, IconButton, InputLabel, MenuItem, NativeSelect, Select, TextField, Typography } from "@mui/material";
// External Components
import SideBar from "@/common/LayoutNavigations/sideBar";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import Footer from "@/common/LayoutNavigations/footer";
import Navbar from "../../../../../common/LayoutNavigations/navbar";
import RichEditor from "@/common/RichTextEditor/textEditor";
import Preview from '@/common/PreviewAttachments/previewAttachment';
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
import Sessions from "../../../../styles/session.module.css";
import courseStyle from "../../../../../styles/course.module.css";
import { ToastContainer } from 'react-toastify';
// API services
import { HandleCourseGet, HandleCourseGetByID, HandleCourseUpdate } from '@/services/course';
import { Attachment, Description, Image, Movie, PictureAsPdf } from '@mui/icons-material';
import { type } from 'os';



export default function UpdateCourse() {
  const router: any = useRouter();
  const [getLongDespcriptionContent, setLongDespcriptionContent] = useState("");
  const [getShortDespcriptionContent, setShortDespcriptionContent] = useState("");
  const [getUpdateCourse, setUpdateCourse] = useState<courseType | any>([]);
  const [getCourse, setCourse] = useState<courseType | any>();
  const [isLoadingButton, setLoadingButton] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setErrors] = useState<string>();

  const {
    register,
    handleSubmit,
    reset,
    setValue, getValues,
    control,
    formState: { errors }, setError
  } = useForm<courseType | any>({
    resolver: yupResolver(courseValidations),
  });
  // console.log('getvalue', getValues())
  const handleContentChange = (value: string, identifier: string) => {
    if(identifier === 'short_description'){
    if (value === '<p><br></p>') {
      setError(identifier, { message: 'Short Description is a required field' });
    } else {
      setError(identifier, { message: '' })
      setValue(identifier, value);
    }
    setShortDespcriptionContent(value);
  }

  if(identifier === 'long_description'){
    if (value === '<p><br></p>') {
      setError(identifier, { message: 'Long Description is a required field' });
    } else {
      setError(identifier, { message: '' })
      setValue(identifier, value);
    }
    setLongDespcriptionContent(value);
  }

  };

  const onSubmit = async (event: any) => {
    const id = router.query.id
    // const reqData = { ...event }
    if (errors.description?.message === '' || (typeof errors === 'object' && errors !== null)) {
      // const reqData: any = {
      //   description: event.description,
      //   title: event.title,

      // }

      // const formData = new FormData()
      // for (var key in reqData) {
      //   formData.append(key, reqData[key]);
      // }

      setLoading(true);
      setLoadingButton(false)
      try {
        const res = await HandleCourseUpdate(id, event)
        getCourseData()
        setLoading(false);
        setTimeout(() => {
          router.push('/admin/courses/allcourses/')
        }, 1000)
      } catch (e) {
        console.log(e)
        setLoadingButton(true)
      }
    } else {
      setError('description', { message: 'Description is a required field' });
    }
  };

  const handleUpdate = (e: any) => {
    // if(e.target.name === 'title'){
      setCourse({...getCourse, title:e.target.value})
    // }
  }

  const handleChange = (e: any) => {
    setCourse(e.target.value)
  };

  const getCourseData = async () => {
    const id = router.query.id
    if (id) {
      HandleCourseGetByID(id).then((course) => {
        // console.log('Course',course)
        setCourse(course.data)
        const fields = [
          "title",
          "is_chargeable",
          "status",
          "short_description",
          "long_description",
        ];
        fields.forEach((field) => setValue(field, course.data[field]));
      })
        .catch((error) => {
          setErrors(error.message);
        });
    }
// console.log('Course', getCourse)
    if (error) {
      return <Typography >{error}</Typography >;
    }

    if (!getCourse) {
      return <Typography >Loading...</Typography >;
    }
  }

  useEffect(() => {
    let localData: any;
    if (typeof window !== "undefined") {
      localData = window.localStorage.getItem("userData");
    }
    if (localData) {
      getCourseData();
    }
  }, [router.query]);

  function ErrorShowing(errorMessage: any) {
    return (
      <Typography variant="body2" color={"error"} gutterBottom>
        {errorMessage}{" "}
      </Typography>
    );
  }
  console.log("opps", errors)
  return (
    <>
      <Navbar />
      <Box className={styles.combineContentAndSidebar}>
        <SideBar />

        <Box className={styles.siteBodyContainer}>
          {/* breadcumbs */}
          <BreadcrumbsHeading
            First="Home"
            Middle="Course"
            Text="COURSE"
            Link="/admin/courses/allcourses"
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
                      <Typography>EDIT COURSE</Typography>
                      <Grid item xs={12} sm={12} md={12} lg={12} className={courseStyle.courseNameGride} >

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <InputLabel>
                            Course Name
                          </InputLabel>
                          <TextField
                            {...register("title")}
                            value={getCourse?.title}
                            onChange={handleUpdate}
                          />
                          {errors && errors.title
                            ? ErrorShowing(errors?.title?.message)
                            : ""}
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <InputLabel>Type</InputLabel>
                          <Controller
                          name="is_chargeable"
                          control={control}                        
                          defaultValue={getCourse?.is_chargeable || ""}
                          // defaultValue=''
                          render={({ field }) => (
                            <FormControl fullWidth>
                              <Select {...field} displayEmpty>
                                <MenuItem value={'free'}>
                                  Free
                                </MenuItem>
                                <MenuItem value={'paid'}>
                                  Paid
                                </MenuItem>
                              </Select>
                            </FormControl>
                          )}
                        />
                          {errors && errors.is_chargeable
                            ? ErrorShowing(errors?.is_chargeable?.message)
                            : ""}
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={12} mb={2} >
                        <InputLabel>Status</InputLabel>
                        <Controller
                          name="status"
                          control={control}                        
                          defaultValue={getCourse?.status || ""}
                          // defaultValue=''
                          render={({ field }) => (
                            <FormControl fullWidth>
                              <Select {...field} displayEmpty>
                                <MenuItem value={'active'}>
                                  Active
                                </MenuItem>
                                <MenuItem value={'inactive'}>
                                  In-active
                                </MenuItem>
                              </Select>
                            </FormControl>
                          )}
                        />
                        {errors && errors.status
                          ? ErrorShowing(errors?.status?.message)
                          : ""}
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} mb={2}>
                        <InputLabel>Description</InputLabel>
                        <RichEditor
                          {...register("short_description")}
                          value={getShortDespcriptionContent ? getShortDespcriptionContent : getCourse?.short_description}
                          onChange={(value) =>
                            handleContentChange(value, "short_description")
                          }
                        />
                        {errors && errors.short_description ? ErrorShowing(errors?.short_description?.message) : ""}
                        {/* {getShortDespcriptionContent ? '' : errors && errors.description ? ErrorShowing(errors?.description?.message) : ""} */}
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={12} mb={2} >
                        <InputLabel>Long Description</InputLabel>
                        <Box >
                          <RichEditor
                            {...register("long_description")}
                            value={getLongDespcriptionContent ? getLongDespcriptionContent : getCourse?.long_description}
                            onChange={(value) =>
                              handleContentChange(value, "long_description")
                            }
                          />
                        </Box>
                        {errors && errors.long_description ? ErrorShowing(errors?.long_description?.message) : ""}
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} textAlign={"right"} >
                        {!isLoadingButton ? <Button type="submit" size="large" variant="contained">
                          UPDATE COURSE
                        </Button> : <LoadingButton loading={isLoadingButton} className={courseStyle.updateLoadingButton}
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


