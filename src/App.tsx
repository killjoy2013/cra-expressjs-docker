import {
  AppBar,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
} from "@material-ui/core";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Greetings from "./pages/Greetings";
import Home from "./pages/Home";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    href: {
      margin: 20,
      color: "white",
    },
  })
);

const App = () => {
  const classes = useStyles({});
  return (
    <BrowserRouter>
      <AppBar position="static">
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
