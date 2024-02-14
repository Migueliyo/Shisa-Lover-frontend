import { useState } from "react";

import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { Divider, IconButton, List, Toolbar } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { mainListItems, secondaryListItems } from "./ListItems";

const FormatedDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: theme.drawer.position,
    whiteSpace: theme.drawer.whiteSpace,
    width: theme.drawer.width,
    height: theme.drawer.height,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: theme.drawer.boxSizing,
    ...(!open && {
      overflowX: theme.drawer.overflowX,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(10),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(7),
      },
    }),
  },
  "@media (max-width: 1000px)": {
    "& .MuiDrawer-paper": {
        width: theme.spacing(7)
    },
  },
}));

function Drawer() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <FormatedDrawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon color="primary" />
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
