import {
  Button,
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(5),
      padding: theme.spacing(2),
    },
  }),
);

const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.paper} elevation={0}>
        <Typography variant="h5">Template app</Typography>
        <Button variant="contained" color="primary" className="mt-15">
          Hello world!
        </Button>
      </Paper>
    </div>
  );
};

export default Home;
