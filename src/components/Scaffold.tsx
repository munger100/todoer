import Head from "next/head";
import { Container, makeStyles } from "@material-ui/core";
import AppBar from "./AppBar";
import React from "react";

const useStyles = makeStyles((theme) => ({
  appBarContainer: {
    padding: "none",
    margin: 0,
  },
}));

export default function Scaffold({ children }) {
  const classes = useStyles();

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
      {children}
    </div>
  );
}
