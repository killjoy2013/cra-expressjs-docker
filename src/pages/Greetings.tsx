import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useState } from "react";
import ReactJson from "react-json-view";
import { DemoVisitor } from "../graphql/types";

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
  const [helloMessage, setHelloMessage] = useState<DemoVisitor>({
    name: "",
    id: 0,
    message: "",
  });
  const [goodbyeMessage, setGoodbyeMessage] = useState<DemoVisitor>({
    name: "",
    id: 0,
    message: "",
  });

  const handleChange = (event: any) => {
    setName(event.target.value);
  };
  const handleHello = async (event: any) => {
    const { data } = await axios.post<DemoVisitor>(
      `/api/greetings/hello`,
      {
        name,
        id: 3,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    setHelloMessage(data);
  };
  const handleGoodbye = async (event: any) => {
    const { data } = await axios.post<DemoVisitor>(
      `/api/greetings/goodbye`,
      {
        name,
        id: 5,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    setGoodbyeMessage(data);
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
        <ReactJson
          src={helloMessage}
          displayDataTypes={false}
          shouldCollapse={false}
        ></ReactJson>
      </Grid>
      <Grid item container direction="row" alignItems="center">
        <Button variant="contained" color="primary" onClick={handleGoodbye}>
          Say Goodbye
        </Button>
        <ReactJson
          src={goodbyeMessage}
          displayDataTypes={false}
          shouldCollapse={false}
        ></ReactJson>
      </Grid>
    </Grid>
  );
};

export default Greetings;
