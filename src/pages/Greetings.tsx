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
  const [name, setName] = useState("");
  const [helloMessage, setHelloMessage] = useState("");

  const handleChange = (event: any) => {
    setName(event.target.value);
  };
  const handleHello = (event: any) => {
    fetch(`/api/greetings/hello?name=${encodeURIComponent(name)}`, {
      method: "POST",
    })
      .then((response) => {
        return response.json();
      })
      .then((message) => {
        setHelloMessage(message.greeting);
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
      alignItems="flex-start"
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
      <Grid item container direction="row" alignItems="center">
        <Button variant="contained" color="primary" onClick={handleHello}>
          Say Hello
        </Button>
        <Typography className={classes.message}>{helloMessage}</Typography>
      </Grid>
    </Grid>
  );
};

export default Greetings;
