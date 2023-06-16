import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from '../../styles/webview.module.css'
import { capitalizeFirstLetter } from "../CapitalFirstLetter/capitalizeFirstLetter";
import { Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HandleCourseGet } from "@/services/course";

export function CourseCard(props: any) {
    const c_id = props?.coursedata?.course?.id || props?.paidcourses?.course?.id || props?.freecourses?.course?.id || props?.enrolledCourses
        .id;
    return (
        <Link href={`/coursedetails/${c_id}`}>
            <CardActionArea component="a" >
                <Box className={styles.article}>
                    <Box className={styles.articlewrapper}>
                        <Box className={styles.figure}>
                            <Box component='img' src="https://leverageedu.com/blog/wp-content/uploads/2020/06/Short-term-Professional-Courses-after-Graduation.jpg" alt="" />
                        </Box>
                        <Box className={styles.articlebody}>
                            <Typography className={styles.h2}>{capitalizeFirstLetter(props?.paidcourses?.course?.title) || capitalizeFirstLetter(props?.freecourses?.course?.title) || capitalizeFirstLetter(props?.coursedata
                                ?.course?.title) || capitalizeFirstLetter(props?.enrolledCourses
                                    .title)}</Typography>
                            <Typography className={styles.h5}>Type : {capitalizeFirstLetter(props?.paidcourses?.course?.is_chargeable) || capitalizeFirstLetter(props?.freecourses?.course?.is_chargeable) || capitalizeFirstLetter(props?.coursedata?.course?.is_chargeable) || capitalizeFirstLetter(props?.enrolledCourses.is_chargeable)}</Typography>
                        </Box>
                    </Box>
                </Box>
            </CardActionArea>
        </Link>
    );
}

export function CourseCardListView(props: any) {
    const c_id = props?.coursedata?.course?.id || props?.paidcourses?.course?.id || props?.freecourses?.course?.id;
    return (
        <Grid item xs={12} md={6}>
            <Link href={`/coursedetails/${c_id}`}>
                <CardActionArea component="a">
                    <Card sx={{ display: 'flex', marginTop: "40px", borderRadius: '15px' }} >
                        <CardMedia
                            component="img"
                            sx={{
                                width: 250,
                                display: { xs: 'none', sm: 'block' }
                            }}
                            image="https://leverageedu.com/blog/wp-content/uploads/2020/06/Short-term-Professional-Courses-after-Graduation.jpg"
                            alt="Live from space album cover"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="h2" variant="h5">
                                    {capitalizeFirstLetter(props?.paidcourses?.course?.title) || capitalizeFirstLetter(props?.freecourses?.course?.title) || capitalizeFirstLetter(props?.coursedata?.course?.title)}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" >
                                    Type : {capitalizeFirstLetter(props?.paidcourses?.course?.is_chargeable) || capitalizeFirstLetter(props?.freecourses?.course?.is_chargeable) || capitalizeFirstLetter(props?.coursedata?.course?.is_chargeable)}
                                </Typography>
                                <Typography sx={{ display: 'flex', alignItems: 'center' }} variant="subtitle1" >
                                    {props?.coursedata?.course?.short_description?.replace(/(<([^>]+)>)/ig, '') || props?.paidcourses?.course?.short_description?.replace(/(<([^>]+)>)/ig, '') || props?.freecourses?.course?.short_description?.replace(/(<([^>]+)>)/ig, '')}
                                </Typography>
                                <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                    {props?.freecourses?.course?.long_description?.replace(/(<([^>]+)>)/ig, '') || props?.paidcourses?.course?.long_description?.replace(/(<([^>]+)>)/ig, '') || props?.coursedata?.course?.long_description?.replace(/(<([^>]+)>)/ig, '')}
                                </Typography>
                                <Typography variant="subtitle1" color="primary" mt={2}>
                                    Continue reading...
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </CardActionArea>
            </Link>
        </Grid>

    );
}

export function SubscribtionPanCard(props: any) {
    const [totalcrscount, settotalcrscount] = useState(0);
    const [totalmodulecount, settotalmodulecount] = useState(0);
    const [totalsessionscount, settotalsessionscount] = useState(0);

    useEffect(() => {
        getAllCourseData();
    }, [])

    //get courses
    const getAllCourseData = () => {
        HandleCourseGet('', "").then((courses) => {
            let dt = 0;
            let dts = 0;
            courses?.data?.filter((a: any, key: any) => {
                if (a?.course?.is_chargeable === "paid" && a?.course?.status === "active" && a?.sessionCount?.length > 0) {
                    dt = dt + a?.sessionCount[0]?.sessionCount
                }
                if (a?.course?.is_chargeable === "paid" && a?.course?.status === "active" && a?.moduleCount?.length > 0) {
                    dts = dts + a?.moduleCount[0]?.moduleCount
                }
            }
            )
            settotalsessionscount(dt)
            settotalmodulecount(dts)
            settotalcrscount((courses?.data?.filter((a: any) =>
                a?.course?.is_chargeable === "paid" && a?.course?.status === "active").length
            ))
        })
    }
    return (
        <Grid item xs={12} md={6}>
            <center>
                <Box className={styles.subcarticle}>
                    <CardHeader title={`${props?.subsdata?.title}`}></CardHeader>
                    <CardContent  >
                        <Box px={1}>
                            <Typography variant="h3" component="h2" gutterBottom={true}>
                                ${props?.subsdata?.amount}/
                                <Typography variant="h6" color="textSecondary" component="span">per {props?.subsdata?.duration_term
                                }</Typography>
                            </Typography>
                            <Typography color="textSecondary" variant="subtitle1" component="p">{totalcrscount} Courses</Typography>
                            <Typography color="textSecondary" variant="subtitle1" component="p" mt={2}>{totalmodulecount} Modules</Typography>
                            <Typography color="textSecondary" variant="subtitle1" component="p" mt={2}>{totalsessionscount} Sessions</Typography>
                        </Box>
                        <Box px={1} mt={2}>
                            <Link href={`/checkout/${props?.subsdata?.id}`} >
                                <Button variant="contained" id={styles.muibuttonBackgroundColor}
                                >Subscribe Now</Button></Link>
                        </Box>
                    </CardContent>
                </Box>
            </center>
        </Grid>
    );
}

