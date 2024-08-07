import { useContext, useEffect, useState } from "react";
import { useTheme } from "@emotion/react";

import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

import { DrawerContext } from "../context/drawerContext";
import { appBarHeight } from "./AppBar";
import { useAuthActions } from "../hooks/useAuthActions";
import { useMixesActions } from "../hooks/useMixesActions";
import { fetchMixes } from "../features/mixes/slice";
import { useAppDispatch } from "../hooks/store";

const FormatedDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  return {
    position: "fixed",
    boxSizing: "border-box",
    height: `calc(100% - ${appBarHeight}px)`,
    width: open ? "320px" : theme.spacing(7),
    marginTop: appBarHeight,
    zIndex: 1,
    backgroundColor: theme.palette.secondary.main,
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
        width: theme.spacing(7),
      }),
    },
    ...(!open && {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    }),
    "& .MuiToolbar-root": {
      height: "42px",
      padding: "8px 8px 0 12px",
    },
    "& .MuiToolbar-root h3": {
      marginRight: "auto",
      fontFamily: '"Roobert", "Inter", Helvetica, Arial, sans-serif',
    },
    "& .MuiList-root": {
      padding: 0,
    },
    ".content-list-tittle": {
      height: 45,
      display: "flex",
      alignItems: "center",
      padding: "8px 8px 8px 12px",
    },
    ".content-list-tittle span": {
      fontSize: 13,
      fontWeight: 600,
      lineHeight: 1.2,
      textTransform: "uppercase",
    },
    "& .MuiListItemIcon-root": {
      minWidth: "30px",
      paddingRight: "15px",
    },
    ".content-list-icon": {
      paddingLeft: "3px",
    },
    ".content-list-button": {
      height: "42px",
      padding: "5px 10px 5px 10px",
    },
    ".content-list-button:hover": {
      backgroundColor: theme.palette.section.button.hover,
    },
    ".toolbar-icon": {
      padding: 5,
      marginRight: -5,
    },
    ".toolbar-icon:hover": {
      borderRadius: 4,
      backgroundColor: theme.palette.section.button.hover,
    },
  };
});

const FormatedBox = styled(Box)(({ theme }) => {
  const commonStyles = {
    border: 0,
    margin: 0,
    padding: 0,
    verticalAlign: "baseline",
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "nowrap",
    ".content-div-avatar": {
      marginRight: 12,
    },
    ".content-div-info": {
      width: "100%",
      minWidth: 0,
    },
    ".content-div-info-details": {
      marginBottom: "0.3rem",
    },
    ".content-div-info h3, .content-div-info p": {
      border: 0,
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
      verticalAlign: "baseline",
      lineHeight: 1.2,
    },
    ".content-div-info h3": {
      color: theme.palette.mix.h3.main,
      fontWeight: 600,
      fontSize: 14,
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      paddingTop: 4,
    },
    ".content-div-info p": {
      color: theme.palette.mix.p.main,
      fontSize: 12.5,
      marginTop: 1,
    },
    ".content-div-liked": {
      display: "flex",
      flexWrap: "column",
      marginLeft: 10,
      paddingTop: 4,
    },
    ".content-div-liked svg": {
      width: "13px",
      height: "13px",
      marginTop: 3,
    },
    ".content-div-liked span": {
      fontSize: 13,
      marginLeft: 2,
    },
  };

  return {
    ...commonStyles,
  };
});

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap de elementos
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function Drawer() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("1450"));
  const { open, setOpen } = useContext(DrawerContext);

  const dispatch = useAppDispatch();

  const { user } = useAuthActions();
  const { mixes } = useMixesActions();
  const [favoriteMixList, setFavoriteMixList] = useState([]);
  const [recommendMixList, setRecommendMixList] = useState([]);

  const getFavouriteMixList = () => {
    setFavoriteMixList(
      mixes.filter(mix => mix.likes && mix.likes.some(like => like.username === user.username))
    );
  };

  useEffect(() => {
    dispatch(fetchMixes());
  }, [dispatch]);

  useEffect(() => {
    if (user && mixes) {
      getFavouriteMixList();
      setRecommendMixList(shuffle([...mixes]));
    }
  }, [user, mixes]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <FormatedDrawer variant="permanent" open={open}>
      {!isSm && (
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
          {open ? <h3>Tu feed</h3> : <></>}
          <IconButton onClick={toggleDrawer}>
            {open ? (
              <KeyboardReturnIcon color="primary" className="toolbar-icon" />
            ) : (
              <KeyboardTabIcon color="primary" className="toolbar-icon" />
            )}
          </IconButton>
        </Toolbar>
      )}
      <List component="nav">
        <ListItem className="content-list-tittle">
          {open ? (
            <ListItemText primary="Mezclas favoritas" />
          ) : (
            <Tooltip title="Mezclas favoritas" placement="right">
              <StarBorderIcon sx={{ paddingLeft: 0.5 }} />
            </Tooltip>
          )}
        </ListItem>
        {favoriteMixList.length > 0 ? (
          favoriteMixList.map((mix, index) => (
            <ListItemButton key={index} className="content-list-button">
              <ListItemIcon className="content-list-icon">
                <Avatar sx={{ width: 30, height: 30 }} />
              </ListItemIcon>
              <ListItemText>
                <FormatedBox>
                  <Box className="content-div-info">
                    <Box className="content-div-info-details">
                      <h3>{mix.mix_name}</h3>
                      <p>{mix.username}</p>
                    </Box>
                  </Box>
                  <Box className="content-div-liked">
                    <FavoriteIcon color="error" />
                    <span>{mix.likes.length}</span>
                  </Box>
                </FormatedBox>
              </ListItemText>
            </ListItemButton>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontStyle: "italic",
                fontSize: "13px",
                color: "#adadb8",
              }}
            >
              Todavía no se han añadido mezclas favoritas
            </p>
          </Box>
        )}
      </List>
      <List component="nav">
        <ListItem className="content-list-tittle">
          {open ? (
            <ListItemText primary="Mezclas recomendadas" />
          ) : (
            <Tooltip title="Mezclas recomendadas" placement="right">
              <TipsAndUpdatesIcon sx={{ paddingLeft: 0.5 }} />
            </Tooltip>
          )}
        </ListItem>
        {recommendMixList.map((mix, index) => (
          <ListItemButton key={index} className="content-list-button">
            <ListItemIcon className="content-list-icon">
              <Avatar sx={{ width: 30, height: 30 }} />
            </ListItemIcon>
            <ListItemText>
              <FormatedBox>
                <Box className="content-div-info">
                  <Box className="content-div-info-details">
                    <h3>{mix.mix_name}</h3>
                    <p>{mix.username}</p>
                  </Box>
                </Box>
                <Box className="content-div-liked">
                  <FavoriteIcon color="error" />
                  <span>{mix.likes && mix.likes.length ? mix.likes.length : 0}</span>
                </Box>
              </FormatedBox>
            </ListItemText>
          </ListItemButton>
        ))}
      </List>
    </FormatedDrawer>
  );
}

export default Drawer;
