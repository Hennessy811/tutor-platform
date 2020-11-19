import {
  AppBar,
  Button,
  createStyles,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Auth from '../../../context/Auth';
import { version } from '../../../../package.json';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  }),
);

const Header = () => {
  const classes = useStyles();

  const h = useHistory();
  const auth = Auth.useContainer();

  const logout = () => {
    auth.logout();
    setTimeout(() => {
      h.push('/sign-in');
    }, 200);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link to="/">Tutor platform (v. {version})</Link>
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
