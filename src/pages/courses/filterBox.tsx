import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Popover } from "@mui/material";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

const FilterBox = ({id,anchorEl,openCloseFunc,open,handleFilterChange}:any) => {
    return ( 
        <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        The content of the Popover.
      
      {/* <Dialog
        open={open}
        onClose={openCloseFunc}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={openCloseFunc}>Disagree</Button>
          <Button onClick={handleFilterChange} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog> */}
      </Popover>
      )}
        </PopupState>
     );
}
 
export default FilterBox;