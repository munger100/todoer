import {createMuiTheme} from "@material-ui/core";

export default createMuiTheme({
  typography: {
    fontFamily: [
      "Source Sans Pro",
      "Montserrat",
      "-apple-system",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Droid Sans",
      "Helvetica Neue",
      "Helvetica",
      "sans-serif",
    ].join(","),
  },
  props: {
    MuiTextField: {
      variant: "outlined",
    },
    MuiCardHeader: {
      titleTypographyProps: { variant: "h2" },
    },
    MuiDialogTitle: {
      disableTypography: true,
    },
    MuiCard: {
      variant: "outlined",
    },
  },
});
