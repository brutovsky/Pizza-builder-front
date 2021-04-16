import Snackbar from "@material-ui/core/Snackbar";
import React from "react";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const snack = (open, setOpen, severity, text) =>{
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return <Snackbar
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
    >
        <Alert onClose={handleClose} severity={severity}>
            {text}
        </Alert>
    </Snackbar>;
}
