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
import { Auth } from "../../../store/auth/useAuth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);

const Header = () => {
  const classes = useStyles();

  const h = useHistory();
  const auth = Auth.useContainer();

  const logout = (e: any) => {
    auth.logout();
    setTimeout(() => {
      h.push("/sign-in");
    }, 200);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Tutor platform
        </Typography>
        <div>
          <Button color="inherit">{auth.data?.username}</Button>
          <Button color="secondary" variant="outlined" onClick={logout}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
