import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Container, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import WebViewNavbar from "@/common/LayoutNavigations/webviewnavbar";
import WebViewFooter from "@/common/LayoutNavigations/webviewfooter";
import styles from '../../../styles/webview.module.css'
import { HandleCourseGet, HandleCourseGetByID } from "@/services/course";
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Link from "next/link";
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { CourseCard, SubscribtionPanCard } from "@/common/ResuableCardCmp/coursescard";
import { GetallSubsctions } from "@/services/subscription";
import { capitalizeFirstLetter } from "../../../common/CapitalFirstLetter/capitalizeFirstLetter";

export default function CoursesDetailsPage() {
    const router = useRouter();
    const { id } = router.query;
    const [coursedet, setcoursedet] = useState<any>([]);
    const [subsdata, setsubsdata] = useState([]);
    const [Courses, setCourses] = useState([]);
    const [FreeCourses, setFreeCourses] = useState([]);
    const [PaidCourses, setPaidCourses] = useState([]);
    const scollToRef = useRef<any>();
    useEffect(() => {
        if (router.isReady) {
            getCourseDetails();
            getAllCourseData();
            getSubscribtion();
            router.push(`/user/coursedetails/${id}`);
        }
    }, [router.isReady]);
    //get course details by id
    const getCourseDetails = () => {
        HandleCourseGetByID(id).then((coursedetails) => {
            setcoursedet(coursedetails?.data)
        })
    }
    //get courses
    const getAllCourseData = () => {
        HandleCourseGet('', "").then((courses) => {
            setCourses(courses?.data);
            setFreeCourses(courses?.data?.filter((a: any) =>
                a?.course?.is_chargeable === "free"
            ))
            setPaidCourses(courses?.data?.filter((a: any) =>
                a?.course?.is_chargeable === "paid"
            ))
        })
    }
    //get subscription
    const getSubscribtion = () => {
        GetallSubsctions().then((subscdata) => {
            setsubsdata(subscdata)
        })
    }


    return (
        <>
            {/*header*/}
            <WebViewNavbar />
            {/*main part*/}
            <Box className={styles.coursesdetails}>
                <Container maxWidth="lg">
                    {/*main card content*/}
                    <Grid container spacing={2} className={styles.crsgrid}>
                        <Grid item xs={12} md={8} lg={9}>
                            <Box sx={{ display: 'flex' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 300, display: { xs: 'none', sm: 'block' } }}
                                    image="https://leverageedu.com/blog/wp-content/uploads/2020/06/Short-term-Professional-Courses-after-Graduation.jpg"
                                    alt={"kjho;lih"}
                                />
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography component="h2" variant="h5">
                                        {capitalizeFirstLetter(coursedet?.title)}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        Type : {capitalizeFirstLetter(coursedet?.is_chargeable)}
                                    </Typography>
                                    <Typography variant="subtitle1" paragraph sx={{ fontFamily: "sans - serif" }}>
                                        {capitalizeFirstLetter(coursedet?.short_description ? coursedet?.short_description
                                            : "")}
                                    </Typography>
                                    <Typography variant="subtitle1" paragraph>
                                        {capitalizeFirstLetter(coursedet?.long_description)}
                                    </Typography>
                                    <Button variant="contained" className="authPageButton" id={styles.muibuttonBackgroundColor} onClick={() => scollToRef.current.scrollIntoView({ behavior: "smooth" })} >
                                        Subscribe Now
                                    </Button>
                                </CardContent>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={3} lg={3}>
                            <center>
                                <Box sx={{ maxWidth: 345, display: 'flex' }} >
                                    <Box sx={{ background: "white", border: "border: 1px solid #80808024", borderRadius: "6px" }}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image=
                                            "https://t4.ftcdn.net/jpg/02/93/50/51/240_F_293505190_QACuhlzI4WXOeznVC59LLb2yUcQbf3xv.jpg"
                                            alt="gfg"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5"
                                                component="div">
                                                LMS
                                            </Typography>
                                            <Typography variant="body2"
                                                color="text.secondary">
                                                A Learning Management portal for Learning and Growing Skills.
                                                It contains well written Courses and Tools.
                                            </Typography>
                                            <Button variant="contained" sx={{ marginTop: "20px" }} id={styles.muibuttonBackgroundColor}>
                                                Enroll Now
                                            </Button>
                                        </CardContent>
                                    </Box>
                                </Box>
                            </center>
                        </Grid>
                    </Grid>
                    {/*main card details*/}
                    <Grid container spacing={2} className={styles.crsgrid} mt={5}>
                        <Grid item xs={12} md={8} lg={9}>
                            <Card sx={{ padding: "20px" }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" mt={2}>
                                        About This Course
                                    </Typography>
                                    <Typography variant="body2" color="text.primary" mt={1} sx={{ lineHeight: "26px" }}>
                                        {capitalizeFirstLetter(coursedet?.long_description)}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div" mt={2}>
                                        What you will learn
                                    </Typography>
                                    <List
                                        sx={{
                                            listStyleType: 'disc',
                                            pl: 2.5,
                                            '& .MuiListItem-root': {
                                                display: 'list-item',
                                            },
                                        }}>
                                        <ListItem className={styles.listitem}>
                                            There are many variations of passages of Lorem Ipsum available.
                                        </ListItem>
                                        <ListItem className={styles.listitem}>
                                            There are many variations of passages of Lorem Ipsum available.
                                        </ListItem>
                                        <ListItem className={styles.listitem}>
                                            There are many variations of passages of Lorem Ipsum available.
                                        </ListItem>
                                        <ListItem className={styles.listitem}>
                                            There are many variations of passages of Lorem Ipsum available.
                                        </ListItem>
                                        <ListItem className={styles.listitem}>
                                            There are many variations of passages of Lorem Ipsum available.
                                        </ListItem>
                                        <ListItem className={styles.listitem}>
                                            There are many variations of passages of Lorem Ipsum available.
                                        </ListItem>
                                        <ListItem className={styles.listitem}>
                                            There are many variations of passages of Lorem Ipsum available.
                                        </ListItem>
                                        <ListItem className={styles.listitem}>
                                            There are many variations of passages of Lorem Ipsum available.
                                        </ListItem>
                                        <ListItem className={styles.listitem}>
                                            There are many variations of passages of Lorem Ipsum available.
                                        </ListItem>
                                        <ListItem className={styles.listitem}>
                                            There are many variations of passages of Lorem Ipsum available.
                                        </ListItem>
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={3} lg={3}>
                            <center>
                                <Card sx={{ maxWidth: 345, display: 'flex' }} >
                                    <CardActionArea >
                                        <CardContent>
                                            <List>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <PeopleIcon />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary="146 Learner"
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <LocalOfferIcon />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary="$120"
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <AlarmOnIcon />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary="3 weeks"
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <WorkspacePremiumIcon />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary="Intermediate"
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <AlarmOnIcon />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary="3-4 hour per week"
                                                    />
                                                </ListItem>
                                            </List >
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </center>
                            <Box sx={{ maxWidth: 345, display: 'flex' }} >
                                <CardContent>
                                    <Typography gutterBottom variant="h6"
                                        component="div">
                                        Related Courses
                                    </Typography>
                                    <List
                                        sx={{
                                            listStyleType: 'disc',
                                            pl: 2.5,
                                            '& .MuiListItem-root': {
                                                display: 'list-item',
                                            },
                                        }}>
                                        {Courses?.slice(0, 5).map((data: any, key: any) => {
                                            return (<ListItem >
                                                <Link href="#" className={styles.listitems}>{data?.course?.title}
                                                </Link>
                                            </ListItem >)
                                        })}
                                    </List>
                                </CardContent>
                            </Box>
                        </Grid>
                    </Grid>
                    {/*top enrolled course*/}
                    <Box className={styles.enrolled} ref={scollToRef}>
                        <Container maxWidth="lg">
                            <Box className={styles.headerbox}>
                                <Typography variant="h6" gutterBottom className={styles.h6}>
                                    Our Subscription plan
                                </Typography>
                                <Divider className={styles.divder} />
                            </Box>
                            {subsdata.map((data, key) => {
                                return (<SubscribtionPanCard subsdata={data} key={key} />)
                            })
                            }
                        </Container>
                    </Box>
                    {/*top enrolled course*/}
                    <Box className={styles.enrolled}>
                        <Container maxWidth="lg">
                            <Box className={styles.headerbox}>
                                <Typography variant="h6" gutterBottom className={styles.h6}>
                                    Top Enrolled Courses
                                </Typography>
                                <Divider className={styles.divder} />
                            </Box>
                            <Box className={styles.articles}>
                                {PaidCourses?.slice(0, 6).map((data, key) => {
                                    return (<CourseCard key={key} paidcourses={data} />)
                                })}
                            </Box>
                        </Container>
                    </Box>
                    {/*top Free course*/}
                    <Box className={styles.freecourses}>
                        <Container maxWidth="lg">
                            <Box className={styles.headerbox}>
                                <Typography variant="h6" gutterBottom className={styles.h6}>
                                    Top Free Courses
                                </Typography>
                                <Divider className={styles.divder} />
                            </Box>
                            <Box className={styles.articles}>
                                {FreeCourses?.slice(0, 6).map((data, key) => {
                                    return (
                                        <CourseCard key={key} freecourses={data} />
                                    )
                                })}
                            </Box>
                        </Container>
                    </Box>
                </Container >
            </Box >
            {/*footer*/}
            < WebViewFooter />
        </>
    );
}
