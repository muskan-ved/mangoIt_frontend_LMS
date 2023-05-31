import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from '../../styles/webview.module.css'
import { capitalizeFirstLetter } from "../CapitalFirstLetter/capitalizeFirstLetter";
import { Card, CardActionArea, CardContent, CardMedia, Grid } from "@mui/material";
import Link from "next/link";

export function CourseCard(props: any) {
    const c_id = props?.coursedata?.course?.id || props?.paidcourses?.course?.id || props?.freecourses?.course?.id;
    return (
        <Link href={`/user/coursedetails/${c_id}`}>
            <CardActionArea component="a" >
                <Box className={styles.article}>
                    <Box className={styles.articlewrapper}>
                        <Box className={styles.figure}>
                            <img src="https://leverageedu.com/blog/wp-content/uploads/2020/06/Short-term-Professional-Courses-after-Graduation.jpg" alt="" />
                        </Box>
                        <Box className={styles.articlebody}>
                            <Typography className={styles.h2}>{capitalizeFirstLetter(props?.paidcourses?.course?.title) || capitalizeFirstLetter(props?.freecourses?.course?.title) || capitalizeFirstLetter(props?.coursedata
                                ?.course?.title)}</Typography>
                            <Typography className={styles.h5}>Type : {capitalizeFirstLetter(props?.paidcourses?.course?.is_chargeable) || capitalizeFirstLetter(props?.freecourses?.course?.is_chargeable) || capitalizeFirstLetter(props?.coursedata?.course?.is_chargeable)}</Typography>
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
            <Link href={`/user/coursedetails/${c_id}`}>
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
