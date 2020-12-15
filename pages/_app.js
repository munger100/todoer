import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import theme from "../src/utils/theme.ts";

function MyApp({ Component, pageProps }) {
  return <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Component {...pageProps} />
  </MuiThemeProvider>;
}

export default MyApp
