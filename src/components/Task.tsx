import { useFormik } from "formik";
import { IEditTaskAction } from "../store/modules/boards/types";
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useMemo } from "react";
import { boardsActions } from "../store/modules/boards";
import { useDispatch } from "react-redux";
import { spreadField } from "../utils/formik";

interface ITaskProps {
  boardId: string;
  id: string;
  isEditing?: boolean;
  label: string;
  completed: boolean;
}

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
}));

export default function Task({
  label,
  isEditing = false,
  id,
  boardId,
  completed,
}: ITaskProps) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const taskPayload = {
    boardId,
    taskId: id,
  };

  const formik = useFormik<IEditTaskAction>({
    initialValues: {
      ...taskPayload,
      label,
    },
    onSubmit: (values) => {
      dispatch(boardsActions.editTask(values));
    },
  });

  const onToggleCompleted = useCallback(() => {
    dispatch(boardsActions.toggleTaskCompleted(taskPayload));
  }, [taskPayload]);

  const onDeleteTask = useCallback(() => {
    dispatch(boardsActions.deleteTask(taskPayload));
  }, [taskPayload]);

  const completedTag = useMemo(() => <div>{completed ? "✅" : "O"}</div>, [
    completed,
  ]);

  return isEditing ? (
    <Box className={classes.box}>
      <TextField
        label="label"
        defaultValue={label}
        {...spreadField(formik, "label")}
      />
      <Typography variant="h6">{completedTag}</Typography>
      <Button onClick={() => formik.dirty && formik.handleSubmit()}>
        Apply Changes
      </Button>
      <Button onClick={onDeleteTask}>Delete</Button>
    </Box>
  ) : (
    <Box className={classes.box}>
      <Typography variant="h6">{label}</Typography>
      <Button onClick={onToggleCompleted}>{completedTag}</Button>
    </Box>
  );
}
