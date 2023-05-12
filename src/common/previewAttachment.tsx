import { Box, Typography } from '@mui/material';
import React from 'react';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { Document, Page, pdfjs } from 'react-pdf';
import Sessions from "../styles/session.module.css"
import ReactPlayer from 'react-player';
import { BASE_URL } from '../config/config'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Preview = ({ name }: any) => {

    const extension = name.split('.').pop();
    if (extension === 'jpg' || extension === 'gif' || extension === 'png' || extension === 'jpeg') {
        return (
            <Box className={Sessions.updateSessionAttachments}>
                {/* <img src={`${BASE_URL}/${name}`} width='80px' height='80px'/> */}
                <Typography><a href={`${BASE_URL}/${name}`} download={name} target= '_blank'>
                    <ImageIcon /> Preview
                </a></Typography>
            </Box>
        )
    } else if (extension === 'mp4') {
        return (
            <Box className={Sessions.updateSessionAttachments}>
                {/* <ReactPlayer url={`${BASE_URL}/${name}`} controls={true} width='80px' height='80px' /> */}
                <a href={`${BASE_URL}/${name}`} download={name} target= '_blank'>
                   <VideoLibraryIcon/> Preview
                </a>
            </Box>
        );
    } else if (extension === 'txt') {
        return (
            <Box>
                 <a href={`${BASE_URL}/${name}`} download={name} target= '_blank'>
                 <DescriptionIcon /> Preview
                </a>
                
            </Box>
        )
    } else if (extension === 'pdf') {
        return (
            <Box className={Sessions.updateSessionAttachments}>
                {/* <Document file={`${BASE_URL}/${name}`}>
                    <Page pageNumber={1} />
                </Document> */}
                <a href={`${BASE_URL}/${name}`} download={name} target= '_blank'>
                <PictureAsPdfIcon/> Preview
                </a>
            </Box>
        );
    } else {
        return <Box>Cannot preview this file type</Box>;
    }

};

export default Preview;
