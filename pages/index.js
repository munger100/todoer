import Head from 'next/head'
import React from 'react';
import { Container, makeStyles } from '@material-ui/core';

import AppBar from '../src/components/AppBar.tsx';

const useStyles = makeStyles(theme => ({
  appBarContainer: {
    padding: 'none',
    margin: 0,
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>Todoer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth='xl' className={classes.appBarContainer} disableGutters>
        <AppBar />
      </Container>
    </div>
  )
}
