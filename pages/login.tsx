import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import clsx from "clsx";
import { ILoginPayload } from "../src/api/types/auth";
import { spreadField } from "../src/utils/formik";
import Link from "../src/components/Link";
import Scaffold from "../src/components/Scaffold";
import { useDispatch } from "react-redux";
import { authActions } from "../src/store/modules/auth";
import { LoginSchema } from "../src/utils/validation/auth";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    margin: theme.spacing(2),
    minHeight: "350px",
    maxWidth: "400px",
    minWidth: "400px",
  },
  cardContent: {
    height: "100%",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function Login({}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const formik = useFormik<ILoginPayload>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(authActions.login(values));
    },
    validationSchema: LoginSchema,
  });

  return (
    <Scaffold>
      <Container className={classes.container}>
        <Card className={classes.card}>
          <CardHeader title={<Typography variant="h4">Login</Typography>} />
          <CardContent
            className={clsx(classes.formContainer, classes.cardContent)}
          >
            <TextField
              label="email"
              type="email"
              {...spreadField(formik, "email")}
            />
            <TextField
              label="password"
              type="password"
              {...spreadField(formik, "password")}
            />
            <Box display="flex" justifyContent="flex-end" alignItems="center">
              <Link href="/register">Register</Link>
              <Button onClick={() => formik.handleSubmit()}>
                <Typography variant="h6">Submit</Typography>
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Scaffold>
  );
}
