import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      margin: 20,
    },
    message: {
      margin: 20,
    },
  })
);

const Greetings = () => {
  const classes = useStyles({});
  return (
    <Grid
      className={classes.grid}
      container
      direction="column"
      alignItems="flex-start"
      spacing={8}
    >
      <Grid item>
        <TextField variant="outlined" size="small" label="Name"></TextField>
      </Grid>
      <Grid item container direction="row" alignItems="center">
        <Button variant="contained" color="primary">
          Say Hello
        </Button>
      </Grid>
    </Grid>
  );
};

export default Greetings;
