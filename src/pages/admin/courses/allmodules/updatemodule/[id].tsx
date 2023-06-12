// ***** React Import
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
// MUI Import
import { Autocomplete, Box, Button, Card, CardContent, FormControl, Grid, IconButton, InputLabel, MenuItem, NativeSelect, Select, TextField, Typography } from "@mui/material";
// External Components
import SideBar from "@/common/LayoutNavigations/sideBar";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import Footer from "@/common/LayoutNavigations/footer";
import Navbar from "../../../../../common/LayoutNavigations/navbar";
import RichEditor from "@/common/RichTextEditor/textEditor";
import newAtoCompelete from "../../../../../common/AutoCompeletes/autoComplete";
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
  const router: any = useRouter();
  const [getDespcriptionContent, setDespcriptionContent] = useState("");
  const [getUpdateModule, setUpdateModule] = useState<moduleType | any>([]);
  const [getModule, setModule] = useState<moduleType | any>();
  const [getCourses, setCourses] = useState<any>([]);
  const [getCourseId, setCourseId] = useState<any>();
  const [inputValue, setInputValue] = useState<any>([]);

  const [getCourseID, setCourseID] = React.useState<string | null>();
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
  } = useForm<moduleType | any>({
    resolver: yupResolver(moduleValidations),
  });

  useEffect(() => {
    let localData: any;
    if (typeof window !== "undefined") {
      localData = window.localStorage.getItem("userData");
    }
    if (localData) {
      getModuleData();
      getCourseData();
      setValue('course_id', defaultValue?.course?.id);
    }
  }, [router.query]);

  const defaultValue = { course: { id: `${getModule?.course_id}` } }; // Set your default value here



  // const defaultCourse = getModule?.course_id
  // console.log("new error", getModule?.course_id)
  // const findCourse = getCourses?.filter((item: any) => {
  //   return item?.course?.id === getModule?.course_id;
  // });
  // const defaultValue = { lebel: "test", label: findCourse[0]?.course?.title, value: findCourse[0]?.course?.id }
  // let options: any = [];
  // getCourses?.map((course: any) => {
  //   options.push({ label: course?.course?.title, value: course?.course?.id, })
  // })

  // handle changes for decriptions
  const handleContentChange = (value: string, identifier: string) => {
    if (identifier === 'description') {
      if (value === '<p><br></p>') {
        setError(identifier, { message: 'Description is a required field' });
        setValue(identifier, '');

      } else {
        setError(identifier, { message: '' })
        setValue(identifier, value);
      }
      setDespcriptionContent(value);
    }
  };
  //submit form
  const onSubmit = async (event: any) => {
    const id = router.query.id
    const reqData = { ...event, course_id: getCourseID }

    if (errors.description?.message === '' || (typeof errors === 'object' && errors !== null)) {
      setLoading(true);
      setLoadingButton(false)
      try {
        const res = await HandleModuleUpdate(id, reqData)
        getModuleData()
        setLoading(false);
        setTimeout(() => {
          // router.push('/admin/courses/allmodules/')
        }, 900)
      } catch (e) {
        console.log(e)
        setLoadingButton(true)
      }
    } else {
      setError('description', { message: 'Description is a required field' });
    }
  };

  const handleUpdate = (e: any) => {
    if (e.target.name === 'title') {
      setModule({ ...getModule, title: e.target.value })
    }
  }
  // get module data
  const getModuleData = async () => {
    const id = router.query.id
    if (id) {
      HandleModuleGetByID(id).then((module) => {
        setModule(module.data)
        setCourseId(module.data?.course_id)
        const fields = [
          "course_id",
          "title",
          "status",
          "description",
        ];
        fields.forEach((field) => setValue(field, module.data[field]));
      })
        .catch((error) => {
          setErrors(error.message);
        });
    }
    if (error) {
      return <Typography >{error}</Typography >;
    }

    if (!getModule) {
      return <Typography >Loading...</Typography >;
    }
  }

  // get all courses data 
  const getCourseData = () => {
    HandleCourseGet('', '').then((courses) => {
      setCourses(courses.data)
    })
  };

  function ErrorShowing(errorMessage: any) {
    return (
      <Typography variant="body2" color={"error"} gutterBottom>
        {errorMessage}{" "}
      </Typography>
    );
  }
  // console.log('getcours', getCourses, "module", getModule)
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
            Link="/admin/courses/allmodules"
          />
          {/* main content */}
          <Card>
            <CardContent>
              {!isLoading ?
                <form onSubmit={handleSubmit(onSubmit)}>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={6} >
                      <Box component="img" src="/Images/pages/addFeature.jpg" width={'100%'} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={6} mt={5}>
                      <Typography className={ModuleCss.InputLabelFont} mb={1}>EDIT MODULE</Typography>
                      <Grid item xs={12} sm={12} md={12} lg={12} className={ModuleCss.courseNameGride} >

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <InputLabel className={ModuleCss.InputLabelFont}>
                            Module Name
                          </InputLabel>
                          <TextField
                            {...register("title")}
                            value={getModule?.title}
                            onChange={handleUpdate}
                          />
                          {errors && errors.title
                            ? ErrorShowing(errors?.title?.message)
                            : ""}
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <InputLabel className={ModuleCss.InputLabelFont}>Course of Module</InputLabel>
                          {/* <Controller
                            name="course_id"
                            control={control}
                            defaultValue={getCourseId}                          
                            render={({ field }) => (
                              <FormControl fullWidth>
                                <Select {...field} displayEmpty>
                                  <MenuItem disabled value="">
                                    Select Course
                                  </MenuItem>
                                  {getCourses?.map((course: any) => {
                                    return (<MenuItem key={course?.course.id} value={course?.course.id}>{capitalizeFirstLetter(course?.course.title)}</MenuItem>)
                                  })}
                                </Select>
                              </FormControl>
                            )}
                          /> */}

                          <Autocomplete
                            {...register('course_id')}
                            id="combo-box-demo"
                            options={getCourses}
                            getOptionLabel={(option) => option?.course?.id}
                            onChange={(event, newValue) => {                              
                              setValue('course_id', newValue?.course?.id);
                            }}
                            defaultValue={defaultValue} // Set the defaultValue prop
                            renderInput={(params) => (
                              <TextField {...params} placeholder="Search for courses" />
                            )}
                          />

                          {errors && errors.course
                            ? ErrorShowing(errors?.course?.message)
                            : ""}
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={12} mb={2} >
                        <InputLabel className={ModuleCss.InputLabelFont}>Status</InputLabel>
                        <Controller
                          name="status"
                          control={control}
                          defaultValue={getModule?.status || ""}
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
                        <InputLabel className={ModuleCss.InputLabelFont}>Description</InputLabel>
                        <RichEditor
                          {...register("description")}
                          value={getDespcriptionContent ? getDespcriptionContent : getModule?.description}
                          onChange={(value) =>
                            handleContentChange(value, "description")
                          }
                        />
                        {errors && errors.description ? ErrorShowing(errors?.description?.message) : ""}
                        {/* {getDespcriptionContent ? '' : errors && errors.description ? ErrorShowing(errors?.description?.message) : ""} */}
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={12} textAlign={"right"} >
                        <Button className={ModuleCss.cancelButton} variant="contained" size="large" onClick={() => router.push('/admin/courses/allmodules')} id={styles.muibuttonBackgroundColor}>Cancel</Button>
                        {!isLoadingButton ? <Button type="submit" size="large" variant="contained" id={styles.muibuttonBackgroundColor}>
                          UPDATE
                        </Button> : <LoadingButton loading={isLoadingButton} className={ModuleCss.updateLoadingButton}
                          size="large" variant="contained" disabled >
                          <CircularProgressBar />
                        </LoadingButton>}
                      </Grid>
                    </Grid>

                  </Grid>
                  {/* </Box> */}
                </form>
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

