import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const Greetings = () => {
  debugger;
  return (
    <Paper>
      <Grid container direction="column">
        <TextField variant="outlined" size="small" label="Name"></TextField>
        <Button>Say Hello</Button>
        <Button>Say Bye...</Button>
      </Grid>
    </Paper>
  );
};

export default Greetings;
