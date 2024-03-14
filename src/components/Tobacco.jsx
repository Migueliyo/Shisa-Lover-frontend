import { useContext } from "react";
import styled from "@emotion/styled";

import { Box, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { DrawerContext } from "./drawerContext";

const FormatedBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  const commonStyles = {
    width: open ? "11.6%" : "9.1%",
    ".content-div-main": {
      width: "100%",
      border: 0,
      marginTop: 5,
      marginBottom: 30,
      padding: 0,
      verticalAlign: "baseline",
      display: "flex",
      flexWrap: "nowrap",
    },
    ".content-div-logo a img": {
      width: "100%",
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
    ".content-div-info a h3:hover": {
      color: theme.palette.section.a.hover,
    },
    ".content-div-info a h3, .content-div-info a p": {
      border: 0,
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
      verticalAlign: "baseline",
      lineHeight: 1.2,
    },
    ".content-div-info a h3": {
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
      fontSize: 12.5,
      marginTop: 5,
    },
    ".content-div-info-categories": {
      lineHeight: 1.5,
      display: "flex",
      flexWrap: "nowrap",
      gap: 5,
      marginTop: 8,
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
      width: open ? "13.4%" : "10.2%",
    },
    //@media (max-width: 1350px)
    [theme.breakpoints.down("1350")]: {
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

function Tobacco({ name, brand, url, categories }) {
  const { open } = useContext(DrawerContext);

  return (
    <FormatedBox open={open}>
      <Box className="content-div-logo">
        <a href="">
          <img src={url ? url : "src\\assets\\logo.png"} />
        </a>
      </Box>
      <Box className="content-div-main">
        <Box className="content-div-info">
          <Box className="content-div-info-details">
            <a href="">
              <h3>{name}</h3>
            </a>
            <a href="">
              <p>{brand}</p>
            </a>
          </Box>
          <Box className="content-div-info-categories">
            {categories.map((category) => (
              <a key={category} href="">
                <span>{category}</span>
              </a>
            ))}
          </Box>
        </Box>
        <Box className="content-div-settings">
          <IconButton>
            <MoreVertIcon color="primary" />
          </IconButton>
        </Box>
      </Box>
    </FormatedBox>
  );
}
export default Tobacco;
