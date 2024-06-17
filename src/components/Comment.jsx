import { useContext } from "react";

import styled from "@emotion/styled";

import { Avatar, Box } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { DrawerContext } from "../context/drawerContext";

const FormatedBox = styled(Box)(({ theme }) => {
  const commonStyles = {
    border: 0,
    margin: 0,
    padding: "10px 0 10px 8px",
    verticalAlign: "baseline",
    width: "48%",
    backgroundColor: "transparent",
    "& .MuiCardContent-root": {
      fontFamily: '"Inter", "Roobert", Helvetica, Arial, sans-serif',
    },
    ".content-div-avatar": {
      marginRight: 15,
    },
    ".content-div-info": {
      width: "100%",
      minWidth: 0,
    },
    ".content-div-info-details-top": {
      marginTop: -3,
      marginBottom: "0.3rem",
    },
    ".content-div-info a": {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },
    ".content-div-info a p:hover": {
      color: theme.palette.section.a.hover,
    },
    ".content-div-info a p": {
      border: 0,
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
      verticalAlign: "baseline",
      color: theme.palette.mix.h3.main,
      display: "inline-block",
      fontSize: 12.5,
    },
    ".content-div-info-description": {
      color: theme.palette.mix.p.main,
      fontSize: 12.5,
      marginTop: 3,
      overflow: "hidden",
    },
    ".content-div-settings div": {
      border: 0,
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
      borderRadius: "0.2rem",
      cursor: "pointer",
    },
    ".content-div-settings div:hover": {
      backgroundColor: theme.palette.button.main,
    },
  };

  return {
    ...commonStyles,
    //@media (max-width: 1100px)
    [theme.breakpoints.down("1150")]: {
      ...commonStyles,
      width: "100%",
    },
  };
});

function Comment({ username, avatar, text }) {
  const { open } = useContext(DrawerContext);

  return (
    <FormatedBox open={open}>
      <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
        <Box className="content-div-avatar">
          <a href={`/usuarios/${username}`}>
            {avatar ? (
              <Avatar alt={username} src={avatar} />
            ) : (
              <Avatar src="" />
            )}
          </a>
        </Box>
        <Box className="content-div-info">
          <Box className="content-div-info-details-top">
            <a href={`/usuarios/${username}`}>
              <p>{username}</p>
            </a>
          </Box>
          <Box className="content-div-info-details-lower">
            <p className="content-div-info-description">{text}</p>
          </Box>
        </Box>
        <Box className="content-div-settings">
          <Box>
            <MoreVertIcon color="primary" />
          </Box>
        </Box>
      </Box>
    </FormatedBox>
  );
}
export default Comment;
