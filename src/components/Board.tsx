import {
  CardHeader,
  Card,
  CardContent,
  makeStyles,
  Button,
  TextField,
} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { boardsActions } from "../store/modules/boards";
import { IEditBoardsPayload } from "../api/types/boards";
import { ITask } from "../api/types/tasks";
import { spreadField } from "../utils/formik";
import { EditBoardSchema } from "../utils/validation/board";
import CreateTask from "./CreateTask";
import Task from "./Task";

interface IBoardProps {
  id: string;
  name: string;
  color?: string;
  tasks?: ITask[];
}

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default function Board({ name, id, color, tasks }: IBoardProps) {
  const dispatch = useDispatch();
  const classes = useStyles({});

  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing, setIsEditing]);

  const deleteBoardHandler = useCallback(() => {
    dispatch(boardsActions.delete(id));
  }, [id]);

  const formik = useFormik<IEditBoardsPayload>({
    initialValues: {
      id,
      name,
      color: color || "",
    },
    validationSchema: EditBoardSchema,
    onSubmit: () => {},
  });

  const editBoardHandler = useCallback(() => {
    dispatch(boardsActions.edit(formik.values));
    toggleEditing();
  }, [formik]);

  const createTaskHandler = useCallback(
    (values) => {
      dispatch(
        boardsActions.createTask({
          ...values,
          id,
        })
      );
    },
    [id]
  );

  const sortedTasks = [...tasks].sort((a, b) => a.id.localeCompare(b.id));

  return isEditing ? (
    <Card className={classes.card}>
      <form onSubmit={() => formik.handleSubmit()}>
        <CardHeader
          title={<TextField label="Name" {...spreadField(formik, "name")} />}
        />
        <CardContent>
          {sortedTasks?.map((props, idx) => (
            <Task key={idx} boardId={id} isEditing {...props} />
          ))}
          <CreateTask createTaskHandler={createTaskHandler} />
        </CardContent>
        <CardContent className={classes.cardActions}>
          <Button onClick={editBoardHandler}>Save</Button>
          <Button onClick={toggleEditing}>Discard Changes</Button>
          <Button onClick={deleteBoardHandler}>Delete</Button>
        </CardContent>
      </form>
    </Card>
  ) : (
    <Card className={classes.card}>
      <CardHeader title={name} titleTypographyProps={{ variant: "h5" }} />
      <CardContent>
        {sortedTasks?.map((props, idx) => (
          <Task key={idx} boardId={id} {...props} />
        ))}
      </CardContent>
      <CardContent className={classes.cardActions}>
        <Button onClick={toggleEditing}>Edit</Button>
        <Button onClick={deleteBoardHandler}>Delete</Button>
      </CardContent>
    </Card>
  );
}
