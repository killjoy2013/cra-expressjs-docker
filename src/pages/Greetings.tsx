import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
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
      alignItems="center"
      spacing={8}
    >
      <Grid item>
        <TextField variant="outlined" size="small" label="Name"></TextField>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary">
          Say Hello
        </Button>
      </Grid>
    </Grid>
  );
};

export default Greetings;
