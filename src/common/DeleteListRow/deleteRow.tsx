// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { Typography } from '@mui/material';
// import { capitalizeFirstLetter } from '../CapitalFirstLetter/capitalizeFirstLetter';

// export const AlertDialog = (row:any, deleteRow:any, open:any) => {
 
//   return (
//     <div>
//     <Dialog
//     open={open}
//     onClose={handleClickOpen}
//     aria-labelledby="alert-dialog-title"
//     aria-describedby="alert-dialog-description"
//   >
//     <DialogTitle id="alert-dialog-title">
//       {"Delete Session"}
//     </DialogTitle>
//     <DialogContent >
//       <DialogContentText id="alert-dialog-description" >
//         Are you sure want to delete <Typography component={'span'} sx={{fontWeight: 'bold'}}>{capitalizeFirstLetter(deleteRow.title)}</Typography>
//       </DialogContentText>
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={handleClickOpen} color="error">No</Button>
//       <Button onClick={handleDeletesRow} autoFocus color="success">
//         Yes
//       </Button>
//     </DialogActions>
//   </Dialog>
//   </div>
//   );
// }