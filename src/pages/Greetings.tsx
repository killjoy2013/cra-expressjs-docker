import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      margin: 20,
    },
  })
);

const Greetings = () => {
  const classes = useStyles({});
  const [name, setName] = useState("");
  const handleChange = (event: any) => {
    setName(event.target.value);
  };
  const handleHello = (event: any) => {
    fetch(`/api/greeting?name=${encodeURIComponent(name)}`, {
      method: "POST",
    })
      .then((response) => {
        return response.json();
      })
      .then((message) => {
        console.log(message.greeting);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Grid
      className={classes.grid}
      container
      direction="column"
      alignItems="center"
      spacing={8}
    >
      <Grid item>
        <TextField
          variant="outlined"
          size="small"
          label="Name"
          onChange={handleChange}
        ></TextField>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleHello}>
          Say Hello
        </Button>
      </Grid>
    </Grid>
  );
};

export default Greetings;
