import React, { useEffect } from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectHasSession } from "../store/modules/user/selectors";
import { selectHasChecked } from "../store/modules/auth/selectors";

const useStyles = makeStyles((theme) => ({
  loadingWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingTop: theme.spacing(8),
  },
}));

export default function withAuth(Component: React.ElementType) {
  function WithAuth(props: unknown) {
    const classes = useStyles({});

    const router = useRouter();

    const isSignedIn = useSelector(selectHasSession);

    useEffect(() => {
      if (!isSignedIn && process.browser) {
        router.push("/login");
      }
    }, [isSignedIn]);

    if (!process.browser) {
      return (
        <div className={classes.loadingWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (!isSignedIn) {
      return null;
    }

    return <Component {...props} />;
  }

  return WithAuth;
}
