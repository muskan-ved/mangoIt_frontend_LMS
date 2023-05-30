import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from '../../styles/webview.module.css'
import { capitalizeFirstLetter } from "../CapitalFirstLetter/capitalizeFirstLetter";

export default function CourseCard(props: any) {
    return (
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
    );
}
