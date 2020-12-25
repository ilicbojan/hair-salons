import React, { useState } from 'react';
import Toolbar from '../toolbar/Toolbar';
import SideDrawer from '../side-drawer/SideDrawer';
import Backdrop from '../backdrop/Backdrop';

const Nav = () => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const burgerClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const linkClickHandler = () => {
    setSideDrawerOpen(false);
  };

  const backdropClickHandler = () => {
    setSideDrawerOpen(false);
  };

  return (
    <>
      <Toolbar burgerClickHandler={burgerClickHandler} />
      <SideDrawer show={sideDrawerOpen} click={linkClickHandler} />
      {sideDrawerOpen && <Backdrop click={backdropClickHandler} />}
    </>
  );
};

export default Nav;
