import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';

const RenderDialog = ({ handleClose, title, open, children, maxWidth, dialogActions }) => {
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      maxWidth={maxWidth}
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="filter-markup-dialog-title"
    >
      <form autoComplete="off">
        <DialogTitle component={'div'} id="filter-markup-dialog-title" sx={{ p: 2.5 }}>
          <Typography variant="h4">{title}</Typography>
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
        <DialogActions sx={{ px: 2.5, py: 2 }}>{dialogActions}</DialogActions>
      </form>
    </Dialog>
  );
};

export default RenderDialog;
RenderDialog.propTypes = {
  handleClose: PropTypes.func,
  title: PropTypes.any,
  open: PropTypes.bool,
  children: PropTypes.any,
  maxWidth: PropTypes.string,
  dialogActions: PropTypes.any
};
