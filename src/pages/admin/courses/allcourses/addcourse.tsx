import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";
import SidebarStyles from "../../../../styles/sidebar.module.css";
import styles from "../../../../styles/course.module.css";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Footer from "@/common/LayoutNavigations/footer";
// CSS Import
import { ToastContainer } from "react-toastify";

import { useState } from "react";
import RichEditor from "@/common/RichTextEditor/textEditor";
import { Controller, useForm } from "react-hook-form";
import { courseType } from "@/types/courseType";
import { yupResolver } from "@hookform/resolvers/yup";
import { courseValidations } from "@/validation_schema/courseValidation";
import { HandleCourseCreate } from "@/services/course";
import { useRouter } from "next/router";
import CircularProgressBar from "@/common/CircularProcess/circularProgressBar";
import { LoadingButton } from "@mui/lab";
import SpinnerProgress from "@/common/CircularProgressComponent/spinnerComponent";


const AddCourse = () => {
  const [shortDespcriptionContent, setShortDespcriptionContent] = useState("");
  const [despcriptionContent, setdespcriptionContent] = useState("");
  const [isLoadingButton, setLoadingButton] = useState<boolean>(false);
  const router: any = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors }, setError
  } = useForm<courseType | any>({
    resolver: yupResolver(courseValidations),
  });

  const handleContentChange = (value: string, identifier: string) => {
    if (identifier === "long_description") {

      if (value === '<p><br></p>') {
        setError(identifier, { message: 'Long description is a required field' });
      } else {
        setError(identifier, { message: '' })
        setValue(identifier, value)
      }
      setdespcriptionContent(value);
    } else if (identifier === "short_description") {
      if (value === '<p><br></p>') {
        setError(identifier, { message: 'Short description is a required field' });
      } else {
        setError(identifier, { message: '' })
        setValue(identifier, value);
      }
      setShortDespcriptionContent(value);
    }
  };

  const onSubmit = async (value: any) => {
    setLoadingButton(true)
    try {
      const courseCreated = await HandleCourseCreate(value)
      setTimeout(() => {
        router.push('/admin/courses/allcourses/')
      }, 1000)
    setLoadingButton(false)
    }
    catch (e) {
      console.log(e);
      setLoadingButton(false)
    };
  }

  function ErrorShowing(errorMessage: any, identifier: string = '') {
    if (identifier === "long_description") {
      return (
        <Typography variant="body2" color={"error"} mt='67px' gutterBottom>
          {errorMessage}{" "}
        </Typography>
      );
    }
    else {
      return (
        <Typography variant="body2" color={"error"} gutterBottom>
          {errorMessage}{" "}
        </Typography>
      );
    }
  }
  return (
    <>
      <Navbar />
      <Box className={SidebarStyles.combineContentAndSidebar}>
        <SideBar />

        <Box className={SidebarStyles.siteBodyContainer}>
          {/* breadcumbs */}
          <BreadcrumbsHeading
            First="Home"
            Middle="Courses"
            Current="Add Course"
            Text="COURSES"
            Link="/admin/courses/allcourses"
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
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Box
                      component="img"
                      src="/Images/pages/addsession_pic.png"
                      width={"100%"}
                      height={"80%"}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Typography
                      variant="subtitle1"
                      className={styles.InputLabelFont}
                      mb={1}
                    >
                      ADD COURSE
                    </Typography>
                    <Grid item mb={2}>
                      <InputLabel className={styles.InputLabelFont}>
                        Course Name
                      </InputLabel>
                      <TextField
                        placeholder="Course Name"
                        {...register("title")}
                        fullWidth
                      />
                      {errors && errors.title
                        ? ErrorShowing(errors?.title?.message)
                        : ""}
                    </Grid>

                    <Grid item mb={2}>

                      <InputLabel className={styles.InputLabelFont}>
                        Type
                      </InputLabel>
                      <Controller
                        name="is_chargeable"
                        control={control}
                        defaultValue={'free'}
                        render={({ field }) => (
                          <FormControl fullWidth>
                            <Select {...field} displayEmpty>
                              {/* <MenuItem value={0}>All</MenuItem> */}
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
                    <Grid item mb={2}>
                      <InputLabel className={styles.InputLabelFont}>
                        Status
                      </InputLabel>
                      <Controller
                        name="status"
                        control={control}
                        defaultValue={'active'}
                        render={({ field }) => (
                          <FormControl fullWidth>
                            <Select {...field} displayEmpty>
                              {/* <MenuItem value={0}>All</MenuItem> */}
                              <MenuItem value={'active'}>
                                Active
                              </MenuItem>
                              <MenuItem value={'inactive'}>
                                Inactive
                              </MenuItem>
                            </Select>
                          </FormControl>
                        )}
                      />
                      {errors && errors.status
                        ? ErrorShowing(errors?.status?.message)
                        : ""}
                    </Grid>
                    <Box className={styles.wrapShortAndLongDescription}>
                      <Grid item mb={2}>
                        <InputLabel className={styles.InputLabelFont}>
                          Short Description
                        </InputLabel>
                        <Box className={styles.quillShortDescription}>
                          <RichEditor
                            {...register("short_description")}
                            value={shortDespcriptionContent}
                            onChange={(e) =>
                              handleContentChange(e, "short_description")
                            }
                          />
                        </Box>
                        {errors && errors.short_description ? ErrorShowing(errors?.short_description?.message) : ""}
                        {/* {errors && errors.short_description
                          ? ErrorShowing(errors?.short_description?.message)
                          : ""} */}
                      </Grid>

                      <Grid item className={styles.quillDescriptionTop} >
                        <InputLabel className={styles.InputLabelFont}>
                          Long Description
                        </InputLabel>
                        <Box className={styles.quillDescription}>
                          <RichEditor
                            value={despcriptionContent}
                            onChange={(e) =>
                              handleContentChange(e, "long_description")
                            }
                          />
                        </Box>
                        {errors && errors.long_description
                          ? ErrorShowing(errors?.long_description?.message, 'long_description')
                          : ""}
                      </Grid>
                    </Box>
                    <Grid item mt={2} className={!errors?.long_description?.message ? styles.addNewCourseButton : styles.SubmitButton} >
                    <Button className={styles.cancelButton} variant="contained" size="large" onClick={() => router.push('/admin/courses/allcourses')} id={SidebarStyles.muibuttonBackgroundColor}>Cancel</Button>
                      {!isLoadingButton ? <Button type="submit" size="large" variant="contained" id={SidebarStyles.muibuttonBackgroundColor}>
                        Submit
                      </Button> : <LoadingButton loading={isLoadingButton} className={styles.updateLoadingButton}
                        size="large" variant="contained" disabled >
                        <CircularProgressBar />
                      </LoadingButton>}
                    </Grid>
                  </Grid>
                </Grid>
              </Box>            
            </CardContent>
          </Card>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
};

export default AddCourse;
