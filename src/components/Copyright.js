import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import React from "react";

export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" to={"http://localhost:3000"}>
                <span>Pizza Builder</span>
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
