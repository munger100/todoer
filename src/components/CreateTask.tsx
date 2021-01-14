import React from "react";
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import { spreadField } from "../utils/formik";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export default function CreateTask({ createTaskHandler }) {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      label: "",
    },
    onSubmit: (values) => {
      createTaskHandler(values);
      formik.resetForm();
    },
  });

  return (
    <Box className={classes.box}>
      <TextField label="label" {...spreadField(formik, "label")} />
      <Button onClick={() => formik.handleSubmit()}>
        <Typography variant="h4">+</Typography>
      </Button>
    </Box>
  );
}
