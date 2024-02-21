import { useContext } from "react";
import styled from "@emotion/styled";

import { Box } from "@mui/material";

import { DrawerContext } from "./drawerContext";
import { appBarHeight } from "./AppBar";
import Section from "./Section";

const FormatedBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  const commonStyles = {
    width: "100%",
    height: `calc(100% - ${appBarHeight}px)`,
    marginTop: appBarHeight,
    marginLeft: open ? "20%" : theme.spacing(7),
    backgroundColor: theme.palette.secondary.main,
    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 25,
  };

  return {
    ...commonStyles,
    //@media (max-width: 1100px)
    [theme.breakpoints.down("1100")]: {
      ...commonStyles,
      marginLeft: open ? "35%" : theme.spacing(7),
    },
    //@media (max-width: 600px)
    [theme.breakpoints.down("sm")]: {
      ...commonStyles,
      marginLeft: open ? 0 : theme.spacing(7),
    },
  };
});

function Main() {
  const { open } = useContext(DrawerContext);
  
  return (
    <FormatedBox open={open}>
      <Section />
    </FormatedBox>
  );
}
export default Main;
