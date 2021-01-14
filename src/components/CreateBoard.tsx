import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { boardsActions } from "../store/modules/boards";
import { useFormik } from "formik";
import { ICreateBoardsPayload } from "../api/types/boards";
import { CreateBoardSchema } from "../utils/validation/board";
import { spreadField } from "../utils/formik";
import { HorizontalSpacer } from "./spacers";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
    width: "100%",
    padding: theme.spacing(2),
  },
}));

export default function CreateBoard({}) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik<ICreateBoardsPayload>({
    initialValues: {
      name: "",
      color: "",
    },
    validationSchema: CreateBoardSchema,
    onSubmit: (values) => {
      dispatch(boardsActions.create(values));
      setSubmitted(true);
    },
  });

  useEffect(() => {
    if (submitted) {
      formik.resetForm();
    }
  }, [submitted]);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" children={"Add a board"} />
          <HorizontalSpacer useMargin />
          <TextField label="Name" {...spreadField(formik, "name")} />
          <HorizontalSpacer useMargin />
          <Button onClick={() => formik.dirty && formik.handleSubmit()}>
            <Typography variant="h5">+</Typography>
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
