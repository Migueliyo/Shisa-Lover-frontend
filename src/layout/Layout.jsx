import { useContext } from "react";
import { Box, styled } from "@mui/material";

import { DrawerContext, DrawerProvider } from "../context/drawerContext";

import AppBar, { appBarHeight } from "../components/AppBar";
import Drawer from "../components/Drawer";

const FormatedBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: "100%",
  height: `calc(100% - ${appBarHeight + 25}px)`, // The height of the app bar and paddingTop
  overflowY: "auto",
  marginTop: appBarHeight,
  marginLeft: open ? "320px" : theme.spacing(7),
  backgroundColor: theme.palette.secondary.main,
  paddingTop: 25,
  paddingLeft: 25,
  paddingRight: 25,
}));

const Layout = ({ children }) => {
  return (
    <DrawerProvider>
      <AppBar />
      <Drawer />
      <DrawerContextConsumer>{children}</DrawerContextConsumer>
    </DrawerProvider>
  );
};

const DrawerContextConsumer = ({ children }) => {
  const { open } = useContext(DrawerContext);
  return <FormatedBox open={open}>{children}</FormatedBox>;
};

export default Layout;
