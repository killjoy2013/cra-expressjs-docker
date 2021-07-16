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
import { useEffect, useContext } from "react";
import { AppContext } from "contexts/AppContext";

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
  const appContext = useContext(AppContext);
  const { refSocket } = appContext;

  useEffect(() => {
    refSocket.current = io({
      host:
        window["REACT_APP_CLIENT_ENVIRONMENT"] === "development"
          ? "http:localhost:3009"
          : "/",
      timeout: window["REACT_APP_SOCKET_TIMEOUT"],
    });
    let socket = refSocket.current;
    socket.on("connect", () => {
      let eventDate = new Date();
      console.log(
        `connect....socketId:${
          socket.id
        }, timeout:${socket.io.timeout()} on ${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString()}`
      );

      setInterval(() => {
        const start = Date.now();

        // volatile, so the packet will be discarded if the socket is not connected
        socket.volatile.emit("ping", () => {
          const latency = Date.now() - start;
          //console.log("latency", latency);
        });
      }, 10000);
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
    socket.on("pong_from_server", () => {
      let eventDate = new Date();
      console.log(
        `pong from server....socketId:${
          socket.id
        }, timeout:${socket.io.timeout()} on ${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString()}`
      );
    });
  }, []);

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
