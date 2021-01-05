import React from "react";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import type { AppContext } from "next/app";
import theme from "../src/utils/theme.ts";
import createStore from "../src/store";
import { Provider } from "react-redux";
import App from "next/app";
import withReduxSaga from "next-redux-saga";
import withRedux from "next-redux-wrapper";
import { IWithStore } from "../../vote/src/store";

class RootApp extends App<IWithStore> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles?.parentElement?.removeChild(jssStyles);
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <MuiThemeProvider
          theme={theme}
          children={
            <>
              <CssBaseline />
              <Component {...pageProps} />
            </>
          }
        />
      </Provider>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(RootApp));
