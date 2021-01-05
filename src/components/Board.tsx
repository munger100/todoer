import {
  CardHeader,
  Card,
  CardContent,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { boardsActions } from "../store/modules/boards";

interface IBoardProps {
  id: string;
  name: string;
  color?: string;
}

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default function Board({ name, id }: IBoardProps) {
  const dispatch = useDispatch();
  const deleteBoardHandler = useCallback(() => {
    dispatch(boardsActions.delete(id));
  }, [id]);
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader title={name} titleTypographyProps={{ variant: "h5" }} />
      <CardContent></CardContent>
      <CardContent className={classes.cardActions}>
        <Button onClick={deleteBoardHandler}>DELETE</Button>
      </CardContent>
    </Card>
  );
}
