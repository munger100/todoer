import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
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

export default function CreateBoard({}) {
  const dispatch = useDispatch();

  const createBoardHandler = useCallback(() => {}, []);

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
    <Card>
      <CardContent onClick={createBoardHandler}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" children={"Add a board"} />
          <HorizontalSpacer useMargin />
          <TextField label="Name" {...spreadField(formik, "name")} />
          <HorizontalSpacer useMargin />
          <Button onClick={formik.handleSubmit} variant="h1">
            <Typography variant="h5">+</Typography>
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
