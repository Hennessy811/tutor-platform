import {
  AppBar,
  Button,
  createStyles,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';
import Config from '../../../context/Config';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  }),
);

const Header = () => {
  const classes = useStyles();
  const { user } = Config.useContainer();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Tutor platform
        </Typography>
        <div>
          <Button color="inherit">{user?.username}</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
