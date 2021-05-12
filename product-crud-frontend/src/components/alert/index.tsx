import * as React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogContentText,
        DialogActions, Button} from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';

const Alert = (props: any) => {

    const { title, content, onCloseAlert } = props;
    const [openDialog, setOpenDialog] = React.useState(true);

    const handleClose = (isDelete: boolean) => {
        setOpenDialog(false);
        onCloseAlert(isDelete);
    }

    return (
        <Dialog
        open={openDialog}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            <WarningIcon /> {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            No
          </Button>
          <Button onClick={() => handleClose(true)} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    )
}
export default Alert;