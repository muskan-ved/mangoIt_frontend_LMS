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
// Helper Import
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { courseValidations } from '@/validation_schema/courseValidation';
import { LoadingButton } from "@mui/lab";
import CircularProgressBar from '@/common/CircularProcess/circularProgressBar';
import SpinnerProgress from '@/common/CircularProgressComponent/spinnerComponent';
import { capitalizeFirstLetter } from '@/common/CapitalFirstLetter/capitalizeFirstLetter';
// Types Import
import { courseType } from '@/types/courseType';
// CSS Import
import styles from "../../../../../styles/sidebar.module.css";
import courseStyle from "../../../../../styles/course.module.css";
import { ToastContainer } from 'react-toastify';
// API services
import { HandleCourseGetByID, HandleCourseUpdate } from '@/services/course';



export default function UpdateCourse() {
  const router: any = useRouter();
  const [getLongDespcriptionContent, setLongDespcriptionContent] = useState("");
  const [getShortDespcriptionContent, setShortDespcriptionContent] = useState("");
  const [getCourse, setCourse] = useState<courseType | any>();
  const [isLoadingButton, setLoadingButton] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setErrors] = useState<string>();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors }, setError
  } = useForm<courseType | any>({
    resolver: yupResolver(courseValidations),
  });
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
    if(e.target.name === 'title'){
      setCourse({...getCourse, title:e.target.value})
    }
  }

  const handleChange = (e: any) => {
    setCourse(e.target.value)
  };

  const getCourseData = async () => {
    const id = router.query.id
    if (id) {
      HandleCourseGetByID(id).then((course) => {
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
            Current='Update Course'
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
                      <Box component="img" src="/Images/sideImages/update_section.svg" width={'100%'} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6} >
                      <Typography className={courseStyle.InputLabelFont} mb={1}>EDIT COURSE</Typography>
                      <Grid item xs={12} sm={12} md={12} lg={12} className={courseStyle.courseNameGride} >

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <InputLabel className={courseStyle.InputLabelFont}>
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
                          <InputLabel className={courseStyle.InputLabelFont}>Type</InputLabel>
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
                        <InputLabel className={courseStyle.InputLabelFont}>Status</InputLabel>
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
                        <InputLabel className={courseStyle.InputLabelFont}>Short Description</InputLabel>
                        <Box className={courseStyle.quillDescription1}>
                        <RichEditor
                          {...register("short_description")}
                          value={getShortDespcriptionContent ? getShortDespcriptionContent : getCourse?.short_description}
                          onChange={(value) =>
                            handleContentChange(value, "short_description")
                          }
                        />
                        </Box>
                        {errors && errors.short_description ? ErrorShowing(errors?.short_description?.message) : ""}
                        {/* {getShortDespcriptionContent ? '' : errors && errors.description ? ErrorShowing(errors?.description?.message) : ""} */}
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={12} mb={2} >
                        <InputLabel className={courseStyle.InputLabelFont}>Long Description</InputLabel>
                        <Box className={courseStyle.quillDescription1}>
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
                      <Button className={courseStyle.cancelButton} variant="contained" size="large" onClick={() => router.push('/admin/courses/allcourses')} id={styles.muibuttonBackgroundColor}>Cancel</Button>
                        {!isLoadingButton ? <Button type="submit" size="large" variant="contained" id={styles.muibuttonBackgroundColor}>
                          UPDATE
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


