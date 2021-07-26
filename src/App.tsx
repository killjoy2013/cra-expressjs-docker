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
  const { refSocket, refSocketInterval, refPingCount } = appContext;

  useEffect(() => {
    refSocket.current = io({
      host:
        window["REACT_APP_CLIENT_ENVIRONMENT"] === "development"
          ? "http:localhost:3009"
          : "/",
      timeout: window["REACT_APP_SOCKET_TIMEOUT"],
      transports:
        window["REACT_APP_CLIENT_ENVIRONMENT"] === "development"
          ? ["polling"]
          : ["websocket"],
    });
    let socket = refSocket.current;
    socket.on("connect", () => {
      let eventDate = new Date();
      console.log(
        `connect....socketId:${
          socket.id
        }, timeout:${socket.io.timeout()} transport:${
          socket.io.engine.transport.name
        } on ${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString()}`
      );

      refSocketInterval.current = setInterval(() => {
        const start = new Date();

        // volatile, so the packet will be discarded if the socket is not connected
        socket.volatile.emit("ping", () => {
          let eventDate = new Date();
          refPingCount.current++;
          const latency = eventDate.getTime() - start.getTime();

          sessionStorage.setItem(
            "ping_status",
            `count:${
              refPingCount.current
            }, latency:${latency}, on ${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString()}`
          );

          //console.log("latency", latency);
        });
      }, 5000);
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
          socket.io.engine.transport.name
        } on ${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString()}`
      );
    });

    socket.on("connect_error", (error) => {
      let eventDate = new Date();
      console.log(
        `socket connect_error, id:${socket.id}, transport:${
          socket.io.engine.transport.name
        } on ${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString()}`,
        error
      );
    });

    socket.on("disconnect", (reason) => {
      clearInterval(refSocketInterval.current);
      let eventDate = new Date();
      console.log(
        `socket disconnect, id:${socket.id}, transport:${
          socket.io.engine.transport.name
        } on ${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString()} reason:${reason}`
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
