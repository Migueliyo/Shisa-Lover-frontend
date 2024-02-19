import { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";

import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  Divider,
  IconButton,
  List,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";

import { mainListItems, secondaryListItems } from "./ListItems";
import { appBarHeight } from "./AppBar";

const FormatedDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  const commonStyles = {
    boxSizing: "border-box",
    height: `calc(100% - ${appBarHeight}px)`,
    width: "20%",
    marginTop: appBarHeight,
    zIndex: 1,
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: "99.99%", // Definido al 99.99% para que la animación se realice correctamente
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.drawer.main,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
      }),
    },
  };

  return {
    ...commonStyles,
    //@media (max-width: 1100px)
    [theme.breakpoints.down("1100")]: {
      ...commonStyles,
      width: "35%",
    },
    //@media (max-width: 600px)
    [theme.breakpoints.down("sm")]: {
      ...commonStyles,
      width: "100%",
    },
  };
});

function Drawer() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(() => !isSm); // Invertir el valor si estamos en la media query "sm"

  useEffect(() => {
    if (isSm) {
      setOpen(false);
    }
  }, [isSm]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <FormatedDrawer variant="permanent" open={open}>
      <Toolbar
        variant="personalized"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
          pt: 1,
        }}
      >
        <IconButton onClick={toggleDrawer}>
          {open ? (
            <KeyboardReturnIcon color="primary" />
          ) : (
            <KeyboardTabIcon color="primary" />
          )}
        </IconButton>
      </Toolbar>
      <List component="nav">
        {mainListItems}
        <Divider sx={{ my: 1 }} color="white" />
        {secondaryListItems}
      </List>
    </FormatedDrawer>
  );
}

export default Drawer;
