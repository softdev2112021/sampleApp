import React, { Fragment } from 'react';

interface LayoutProps {
  children?: React.ReactNode,
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Fragment>
        {children}
    </Fragment>
  );
};

export default Layout;
