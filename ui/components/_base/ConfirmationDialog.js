import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function ConfirmationDialog({
  open,
  onClose,
  onAccept,
  title = "Confirm Action",
  subtitle = "Are you sure you want to proceed?",
  acceptButton = "Confirm",
  rejectButton = "Cancel"
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {subtitle}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {rejectButton}
        </Button>
        <Button onClick={onAccept} color="primary" autoFocus>
          {acceptButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
