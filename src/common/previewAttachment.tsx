// import React from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// import ReactPlayer from 'react-player';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// const Preview = ( {name} : any) => {
//   // file:///home/devendra/mangoit-lms/mangoit-lms-backend/uploads/1683794717422img2.jpeg
//  // const { name, type } = file;
//  const type = name.split('.').pop()

//  switch (type) {
//   case 'application/pdf':
//     return (
//       <div>
//         <Document file={url}>
//           <Page pageNumber={1} />
//         </Document>
//         <a href={url} download={name}>
//           Download
//         </a>
//       </div>
//     );
//   case 'video/mp4':
//     return (
//       <div>
//         <ReactPlayer url={url} controls={true} />
//         <a href={url} download={name}>
//           Download
//         </a>
//       </div>
//     );
//   default:
//     return <div>Cannot preview this file type</div>;
// }

// };

// export default Preview;
