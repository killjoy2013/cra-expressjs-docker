import {
  AppBar,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
} from "@material-ui/core";
import io from "socket.io-client";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Greetings from "./pages/Greetings";
import Home from "./pages/Home";

const socket = io({
  host:
    window["REACT_APP_CLIENT_ENVIRONMENT"] === "development"
      ? "http:localhost:3009"
      : "/",
  timeout: window["REACT_APP_SOCKET_TIMEOUT"],
});

socket.on("connect", () => {
  let eventDate = new Date();
  console.log(
    `connect....socketId:${
      socket.id
    }, timeout:${socket.io.timeout()} on ${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString()}`
  );
});

socket.on("reconnect", () => {
  let eventDate = new Date();
  console.log(
    `reconnect....socketId:${
      socket.id
    }, timeout:${socket.io.timeout()} on ${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString()}`
  );
});

socket.on("disconnecting", () => {
  let eventDate = new Date();
  console.log(
    `socket disconnecting, id:${socket.id}, transport:${
      socket.io?.engine?.transport?.query?.transport
    } on ${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString()}`
  );
});

socket.on("connect_error", () => {
  let eventDate = new Date();
  console.log(
    `socket connect_error, id:${socket.id}, transport:${
      socket.io?.engine?.transport?.query?.transport
    } on ${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString()}`
  );
});

socket.on("disconnect", () => {
  let eventDate = new Date();
  console.log(
    `socket disconnect, id:${socket.id}, transport:${
      socket.io?.engine?.transport?.query?.transport
    } on ${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString()}`
  );
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    href: {
      margin: 20,
      color: "white",
    },
    appBar: {
      backgroundColor: window["REACT_APP_TOOLBAR_COLOR"],
    },
  })
);

const App = () => {
  const classes = useStyles({});
  return (
    <BrowserRouter>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Link className={classes.href} to="/">
            Home
          </Link>
          <Link className={classes.href} to="/greetings">
            Greetings
          </Link>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/greetings">
          <Greetings />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
