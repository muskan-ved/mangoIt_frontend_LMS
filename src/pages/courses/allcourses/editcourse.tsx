import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";
import SidebarStyles from "../../../styles/sidebar.module.css";
import styles from "../../../styles/course.module.css";
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
  TextField,
  Typography,
} from "@mui/material";
import Footer from "@/common/LayoutNavigations/footer";
import { useState } from "react";
import RichEditor from "@/common/RichTextEditor/textEditor";
import { useForm } from "react-hook-form";
import { courseType } from "@/types/courseType";
import { yupResolver } from "@hookform/resolvers/yup";
import { courseValidations } from "@/validation_schema/courseValidation";

const EditCourse = () => {
  const [shortDespcriptionContent, setShortDespcriptionContent] = useState("");
  const [despcriptionContent, setdespcriptionContent] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<courseType | any>({
    resolver: yupResolver(courseValidations),
  });

  const handleContentChange = (value: string, identifier: string) => {
    if (identifier === "long_description") {
      setdespcriptionContent(value);
      setValue(identifier, value);
    } else if (identifier === "short_description") {
      setShortDespcriptionContent(value);
      setValue(identifier, value);
    }
  };

  const onSubmit = (value: any) => {
    console.log(value, "course submit");
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
      <Box className={SidebarStyles.combineContentAndSidebar}>
        <SideBar />

        <Box className={SidebarStyles.siteBodyContainer}>
          {/* breadcumbs */}
          <BreadcrumbsHeading
            First="Home"
            Middle="Courses"
            Text="Courses"
            Link="/courses/allcourses/addcourse"
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
                      src="/Images/pages/addFeature.jpg"
                      width={"100%"}
                      height={"100%"}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Typography
                      variant="subtitle1"
                      className={styles.CourseInputLabelFont}
                      mb={2}
                    >
                      ADD COURSE
                    </Typography>
                    <Grid item mb={2}>
                      <InputLabel className={styles.CourseInputLabelFont}>
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
                      <InputLabel className={styles.CourseInputLabelFont}>
                        Type
                      </InputLabel>
                      <FormControl fullWidth>
                        <Select value={1} {...register("is_chargeable")}>
                          <MenuItem value={1}>Type</MenuItem>
                        </Select>
                      </FormControl>
                      {errors && errors.is_chargeable
                        ? ErrorShowing(errors?.is_chargeable?.message)
                        : ""}
                    </Grid>

                    <Grid item mb={2}>
                      <InputLabel className={styles.CourseInputLabelFont}>
                        Status
                      </InputLabel>
                      <FormControl fullWidth>
                        <Select value={1} {...register("status")}>
                          <MenuItem value={1}>status</MenuItem>
                        </Select>
                      </FormControl>
                      {errors && errors.status
                        ? ErrorShowing(errors?.status?.message)
                        : ""}
                    </Grid>
                    <Box className={styles.wrapShortAndLongDescription}>
                      <Grid item mb={5}>
                        <InputLabel className={styles.CourseInputLabelFont}>
                          Short Description
                        </InputLabel>
                        <Box className={styles.quillShortDescription}>
                          <RichEditor
                            value={shortDespcriptionContent}
                            onChange={(e) =>
                              handleContentChange(e, "short_description")
                            }
                          />
                        </Box>
                        {errors && errors.short_description
                          ? ErrorShowing(errors?.short_description?.message)
                          : ""}
                      </Grid>

                      <Grid item className={styles.quillDescriptionTop} mt={4}>
                        <InputLabel className={styles.CourseInputLabelFont}>
                          Description
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
                          ? ErrorShowing(errors?.long_description?.message)
                          : ""}
                      </Grid>
                    </Box>
                    <Grid item mt={3} className={styles.SubmitButton}>
                      <Button type="submit" variant="contained">
                        ADD NEW COURSE
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default EditCourse;
