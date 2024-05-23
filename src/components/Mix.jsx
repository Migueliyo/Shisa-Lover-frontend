import { useCallback, useContext, useEffect, useRef } from "react";

import styled from "@emotion/styled";

import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { DrawerContext } from "../context/drawerContext";

const FormatedCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  const commonStyles = {
    fontFamily: "inherit",
    border: 0,
    margin: 0,
    marginBottom: 30,
    padding: 0,
    verticalAlign: "baseline",
    width: open ? "23.5%" : "18.4%",
    backgroundColor: theme.palette.card.main,
    borderRadius: "7px",
    transition: "transform 0.2s ease, border-color 0.2s ease",
    position: "relative",
    "::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "7px",
      borderLeft: "5px solid transparent",
      borderBottom: "5px solid transparent",
      transition: "border-color 0.2s ease",
      pointerEvents: "none"
    },
    "&:hover": {
      transform: "translate(5px, -3px)",
      "::after": {
        borderLeftColor: "var(--random-color)",
        borderBottomColor: "var(--random-color)",
      },
    },
    "& .MuiCardContent-root": {
      fontFamily: '"Inter", "Roobert", Helvetica, Arial, sans-serif',
    },
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
    ".content-div-info a": {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },
    ".content-div-info a p:hover": {
      color: theme.palette.section.a.hover,
    },
    ".content-div-info h3, .content-div-info a p": {
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
      fontSize: 15,
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      paddingRight: 5,
    },
    ".content-div-info a p": {
      color: theme.palette.mix.p.main,
      display: "inline-block",
      fontSize: 12.5,
      marginTop: 5,
    },
    ".content-div-info-categories": {
      width: "108%",
      lineHeight: 1.5,
      display: "flex",
      flexWrap: "nowrap",
      gap: 5,
      marginTop: 8,
      overflow: "hidden",
    },
    ".content-div-info-categories a": {
      display: "inline-block",
      borderRadius: 9000,
      fontSize: 12.5,
      fontWeight: 600,
      color: theme.palette.mix.a.main,
      backgroundColor: theme.palette.button.main,
      border: "2px solid transparent",
      height: 18,
      maxWidth: "100%",
      padding: "0px 8px",
    },
    ".content-div-info-categories a:hover": {
      backgroundColor: theme.palette.button.hover,
    },
    ".content-div-info-category span": {
      display: "flex",
      webkitBoxAlign: "center",
      alignItems: "center",
    },
    ".content-div-settings button": {
      border: 0,
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
      borderRadius: "0.2rem",
    },
    ".content-div-settings button:hover": {
      backgroundColor: theme.palette.button.main,
    },
  };

  return {
    ...commonStyles,
    //@media (max-width: 1550px)
    [theme.breakpoints.down("1600")]: {
      ...commonStyles,
      width: open ? "32%" : "23.5%",
    },
    //@media (max-width: 1350px)
    [theme.breakpoints.down("1350")]: {
      ...commonStyles,
      width: "32%",
    },
    //@media (max-width: 1000px)
    [theme.breakpoints.down("1000")]: {
      ...commonStyles,
      width: "49%",
    },
    //@media (max-width: 700px)
    [theme.breakpoints.down("600")]: {
      ...commonStyles,
      width: "100%",
    },
  };
});

function Mix({ username, name, categories }) {
  const { open } = useContext(DrawerContext);
  const cardRef = useRef();

  const generateRandomColor = useCallback(() => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }, []);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.setProperty('--random-color', generateRandomColor());
    }
  }, [generateRandomColor]);

  return (
    <FormatedCard ref={cardRef} open={open}>
      <CardActionArea>
        <CardContent sx={{ display: 'flex', flexWrap: 'nowrap' }}>
          <Box className="content-div-avatar">
            <a href=""><Avatar src="" /></a>
          </Box>
          <Box className="content-div-info">
            <Box className="content-div-info-details">
              <h3>{name}</h3>
              <a href="">
                <p>{username}</p>
              </a>
            </Box>
            <Box className="content-div-info-categories">
              {categories.map((category) => (
                <a key={category.id} href="">
                  <span>{category.name}</span>
                </a>
              ))}
            </Box>
          </Box>
          <Box className="content-div-settings">
            <IconButton>
              <MoreVertIcon color="primary" />
            </IconButton>
          </Box>
        </CardContent>
      </CardActionArea>
    </FormatedCard>
  );
}

export default Mix;
