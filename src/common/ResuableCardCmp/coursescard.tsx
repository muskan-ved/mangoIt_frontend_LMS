import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from '../../styles/webview.module.css'

export default function CourseCard(props: any) {
    return (
        <Box className={styles.article}>
            <Box className={styles.articlewrapper}>
                <Box className={styles.figure}>
                    <img src="https://picsum.photos/id/1011/800/450" alt="" />
                </Box>
                <Box className={styles.articlebody}>
                    <Typography className={styles.h2}>HTML Course</Typography>
                    <Typography className={styles.h5}>Type : Free</Typography>
                </Box>
            </Box>
        </Box>
    );
}
