import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Container, makeStyles } from "@material-ui/core";

import Board from "../src/components/Board";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  selectBoards,
  selectBoardsState,
} from "../src/store/modules/boards/selectors";
import { IBoard, IFetchBoardsResponse } from "../src/api/types/boards";
import CreateBoard from "../src/components/CreateBoard";
import { boardsActions } from "../src/store/modules/boards";
import Scaffold from "../src/components/Scaffold";
import withAuth from "../src/utils/withAuth";

const useStyles = makeStyles((theme) => ({
  boardContainer: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default withAuth(function Home() {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);
  const boards: IBoard[] = useSelector(selectBoards);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loaded) {
      dispatch(boardsActions.fetch());
      setLoaded(true);
    }
  }, [loaded]);

  const boardsToRender = [
    ...boards.map((props, index) => <Board key={index} {...props} />),
    <CreateBoard />,
  ];

  const content = (
    <Container maxWidth="md" className={classes.boardContainer} disableGutters>
      {boardsToRender}
    </Container>
  );

  return <Scaffold>{content}</Scaffold>;
});
