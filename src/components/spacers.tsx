import { makeStyles, Box, BoxProps } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme) => ({
  horizontal: ({ size = 1, useMargin }: ISpacerProps) => ({
    width: !useMargin && theme.spacing(size),
    marginRight: useMargin && theme.spacing(size),
  }),
  vertical: ({ size = 1, useMargin }: ISpacerProps) => ({
    height: !useMargin && theme.spacing(size),
    marginBottom: useMargin && theme.spacing(size),
  }),
  box: ({ size = 1, useMargin }: ISpacerProps) => ({
    width: !useMargin && theme.spacing(size),
    height: !useMargin && theme.spacing(size),
  }),
  flex: {
    flexGrow: 1,
  },
}));

interface ISpacerProps {
  size?: number;
  useMargin?: boolean;
}

export function HorizontalSpacer({
  size,
  useMargin,
  ...boxProps
}: BoxProps & ISpacerProps) {
  const classes = useStyles({ size, useMargin });

  return (
    <Box
      {...boxProps}
      className={clsx(classes.horizontal, boxProps.className)}
    />
  );
}

export function VerticalSpacer({
  size,
  useMargin,
  ...boxProps
}: BoxProps & ISpacerProps) {
  const classes = useStyles({ size, useMargin });

  return (
    <Box {...boxProps} className={clsx(classes.vertical, boxProps.className)} />
  );
}

export function BoxSpacer({
  size,
  useMargin,
  ...boxProps
}: BoxProps & ISpacerProps) {
  const classes = useStyles({ size, useMargin });

  return (
    <Box {...boxProps} className={clsx(classes.box, boxProps.className)} />
  );
}

export function FlexSpacer(props: BoxProps) {
  const classes = useStyles({});

  return <Box {...props} className={clsx(classes.flex, props.className)} />;
}
