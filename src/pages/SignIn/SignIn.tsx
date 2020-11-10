import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import { BACKEND_URL } from '../../shared/utils/config';
import Auth from '../../context/Auth';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        tutor.cskeleto.dev
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper1: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  btn: {
    margin: '20px auto',
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [message, setMessage] = useState('');
  const auth = Auth.useContainer();
  console.log(auth);

  useEffect(() => {
    if (location.search) {
      auth.login(location.search).then(() => {
        setMessage('Logged in successfully, redirecting...');
        setTimeout(() => history.push('/'), 1000);
      });
    }
  }, [location.search]);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        className={classes.paper1}
        elevation={6}
        square
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Вход | Регистрация
          </Typography>
          {message && (
            <Typography
              className={classes.submit}
              component="h2"
              variant="caption"
            >
              {message}
            </Typography>
          )}
          <Grid container>
            <Grid item className={classes.btn}>
              <a href={`${BACKEND_URL}/connect/google`}>
                <Button variant="contained" color="primary">
                  Google
                </Button>
              </a>
            </Grid>
          </Grid>
          <Copyright />
        </div>
      </Grid>
    </Grid>
  );
};

export default SignIn;
