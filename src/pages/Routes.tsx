import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";

import {
  AppBar,
  Toolbar,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import Greetings from "./Greetings";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    href: {
      margin: 20,
      color: "white",
    },
  })
);

const Routes = () => {
  const classes = useStyles({});
  return (
    <Router>
      <div>
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
      </div>
    </Router>
  );
};

export default Routes;
