import {
  AppBar,
  Button,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../utils/hooks/auth";
import styles from "./Header.module.scss";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);
const Header = () => {
  const classes = useStyles();

  const { setToken, setUsername, token, username } = useAuth();
  const h = useHistory();

  const logout = (e: any) => {
    e.preventDefault();
    setToken("");
    setUsername("");
    h.push("/sign-in");
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Tutor platform
        </Typography>
        <div>
          <Button color="inherit">{username}</Button>
          <Button color="secondary" variant="outlined" onClick={logout}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
