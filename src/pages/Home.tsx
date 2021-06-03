import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      margin: 20,
    },
  })
);

const Home = () => {
  const classes = useStyles({});
  return (
    <Grid className={classes.grid} container direction="row" justify="center">
      <Typography color="textSecondary" variant="h2">
        Welcome to Fancy Greetings App!
      </Typography>
    </Grid>
  );
};

export default Home;
