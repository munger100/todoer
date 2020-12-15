import {AppBar as MuiAppBar, Toolbar, Typography} from "@material-ui/core";
import React from "react";

export default function AppBar() {
  return <MuiAppBar position="static">
    <Toolbar>
      <Typography variant="h6">
        Todoer
      </Typography>
    </Toolbar>
  </MuiAppBar>;
}
