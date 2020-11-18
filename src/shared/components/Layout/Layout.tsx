import React, { FC } from 'react';
import { Container } from '@material-ui/core';
import Header from '../Header';

const Layout: FC<any> = ({ children }) => (
  <>
    <Header />
    <Container>{children}</Container>
  </>
);

export default Layout;
