import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Container, makeStyles } from "@material-ui/core";

import AppBar from "../src/components/AppBar.tsx";
import Board from "../src/components/Board";
import { useDispatch, useSelector, useStore } from "react-redux";
import { selectBoardsState } from "../src/store/modules/boards/selectors";
import { IBoard, IFetchBoardsResponse } from "../src/api/types/boards";
import CreateBoard from "../src/components/CreateBoard";
import { boardsActions } from "../src/store/modules/boards";

const useStyles = makeStyles((theme) => ({
  appBarContainer: {
    padding: "none",
    margin: 0,
  },
  boardContainer: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function Home() {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);
  const boards: IBoard[] = useSelector(selectBoardsState)?.boards ?? [];
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

  return (
    <div>
      <Head>
        <title>Todoer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container
        maxWidth="xl"
        className={classes.appBarContainer}
        disableGutters
      >
        <AppBar />
      </Container>
      <Container
        maxWidth="md"
        className={classes.boardContainer}
        disableGutters
      >
        {boardsToRender}
      </Container>
    </div>
  );
}
