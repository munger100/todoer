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
import { ILoginPayload, IRegisterPayload } from "../src/api/types/auth";
import { spreadField } from "../src/utils/formik";
import Link from "../src/components/Link";
import Scaffold from "../src/components/Scaffold";
import { useDispatch } from "react-redux";
import { authActions } from "../src/store/modules/auth";
import {RegisterSchema} from "../src/utils/validation/auth";

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
  const formik = useFormik<IRegisterPayload>({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    onSubmit: (values) => {
      dispatch(authActions.register(values));
    },
    validationSchema: RegisterSchema
  });

  return (
    <Scaffold>
      <Container className={classes.container}>
        <Card className={classes.card}>
          <CardHeader title={<Typography variant="h4">Register</Typography>} />
          <CardContent
            className={clsx(classes.formContainer, classes.cardContent)}
          >
            <TextField label="name" {...spreadField(formik, "name")} />
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
            <Link href="/login"> Login</Link>
            <Button onClick={() => formik.handleSubmit()}>
              <Typography variant="h6">Register</Typography>
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Scaffold>
  );
}
