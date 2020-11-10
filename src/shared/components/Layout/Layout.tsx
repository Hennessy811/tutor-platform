import React, { FC } from 'react';
import { Container, makeStyles, Theme, Typography } from '@material-ui/core';
import Header from '../Header';

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    textAlign: 'center',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

const Layout: FC<any> = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <Container>{children}</Container>
      <Typography
        className={classes.footer}
        variant="body2"
        color="textSecondary"
      >
        {'Copyright © '}
        {new Date().getFullYear()}.
      </Typography>
    </>
  );
};

export default Layout;
