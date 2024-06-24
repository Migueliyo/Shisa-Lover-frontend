import { useCallback, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import styled from "@emotion/styled";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { DrawerContext } from "../context/drawerContext";

const FormatedCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  const commonStyles = {
    width: open ? "11.6%" : "9.1%",
    fontFamily: "inherit",
    border: 0,
    margin: 0,
    marginBottom: 30,
    padding: 0,
    verticalAlign: "baseline",
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
      pointerEvents: "none",
    },
    "&:hover, &.active": {
      transform: "translate(5px, -3px)",
      "::after": {
        borderLeftColor: "var(--random-color)",
        borderBottomColor: "var(--random-color)",
      },
    },
    "& .MuiCardContent-root": {
      fontFamily: '"Inter", "Roobert", Helvetica, Arial, sans-serif',
    },
    ".content-div-main": {
      width: "100%",
      border: 0,
      padding: 0,
      verticalAlign: "baseline",
      display: "flex",
      flexWrap: "nowrap",
    },
    ".content-div-logo-new": {
      position: "absolute",
      top: 5,
      right: 5,
      width: 30,
      height: 30,
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
      width: "125%",
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
    ".content-div-settings div": {
      border: 0,
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
      borderRadius: "0.2rem",
    },
    ".content-div-settings div:hover": {
      backgroundColor: theme.palette.button.main,
    },
  };

  return {
    ...commonStyles,
    //@media (max-width: 1550px)
    [theme.breakpoints.down("1600")]: {
      ...commonStyles,
      width: open ? "13.4%" : "10.2%",
    },
    //@media (max-width: 1450px)
    [theme.breakpoints.down("1450")]: {
      ...commonStyles,
      width: "13.4%",
    },
    //@media (max-width: 1150px)
    [theme.breakpoints.down("1150")]: {
      ...commonStyles,
      width: "15.8%",
    },
    //@media (max-width: 1000px)
    [theme.breakpoints.down("1000")]: {
      ...commonStyles,
      width: "19.2%",
    },
    //@media (max-width: 850px)
    [theme.breakpoints.down("850")]: {
      ...commonStyles,
      width: "24.2%",
    },
    //@media (max-width: 700px)
    [theme.breakpoints.down("700")]: {
      ...commonStyles,
      width: "31.3%",
    },
    //@media (max-width: 550px)
    [theme.breakpoints.down("550")]: {
      ...commonStyles,
      width: "48.5%",
    },
  };
});

function FlavourCard({ sx, id, name, brand, url, categories, activeSegment, index }) {
  const { open } = useContext(DrawerContext);
  const cardRef = useRef();
  const navigate = useNavigate();

  const generateRandomColor = useCallback(() => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }, []);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.setProperty(
        "--random-color",
        generateRandomColor()
      );
    }
  }, [generateRandomColor]);

  const handleClickedMix = () => {
    navigate(`/sabores/${id}`);
  };

  return (
    <FormatedCard
      sx={{ ...sx }}
      ref={cardRef}
      open={open}
      className={activeSegment === index ? "active" : ""}
    >
      <CardActionArea onClick={handleClickedMix}>
        <CardMedia
          component="img"
          image={url ? url : "/src/assets/logo.png"}
          alt={name}
        />
        <img className="content-div-logo-new" src="/src/assets/new.png"></img>
        <CardContent>
          <Box className="content-div-main">
            <Box className="content-div-info">
              <Box className="content-div-info-details">
                <h3>{name}</h3>
                <a href="">
                  <p>{brand}</p>
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
              <Box>
                <MoreVertIcon color="primary" />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </FormatedCard>
  );
}
export default FlavourCard;
