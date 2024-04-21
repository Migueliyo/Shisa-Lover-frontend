import { useContext } from "react";

import styled from "@emotion/styled";

import { Avatar, Box, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { DrawerContext } from "./drawerContext";

const FormatedBox = styled(Box)(({ theme }) => {
  const commonStyles = {
    border: 0,
    margin: 0,
    marginBottom: 30,
    padding: 0,
    verticalAlign: "baseline",
    width: "49%",
    display: "flex",
    flexWrap: "nowrap",
    ".content-div-avatar": {
      marginRight: 15,
    },
    ".content-div-info": {
      width: "100%",
      minWidth: 0,
    },
    ".content-div-info-details-top": {
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
      fontSize: 18,
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
    ".content-div-info-details-lower": {
      marginTop: 10,
      border: "1px solid",
      borderColor: theme.palette.section.divider.main,
      borderRadius: theme.shape.borderRadius,
      padding: "0px 7px 10px 7px",
    },
    ".content-div-info-description": {
      color: theme.palette.mix.h3.main,
      fontSize: 14,
      marginTop: 5,
      overflow: "hidden",
      height: 90,
      maskImage: "linear-gradient(to top, transparent, white 40%)",
    },
    ".content-div-info-categories": {
      lineHeight: 1.5,
      display: "flex",
      flexWrap: "nowrap",
      gap: 5,
      marginTop: -10,
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
    //@media (max-width: 1100px)
    [theme.breakpoints.down("1150")]: {
      ...commonStyles,
      width: "100%",
    },
  };
});

function DiscussionEntry({ username, description, title, categories }) {
  const { open } = useContext(DrawerContext);

  return (
    <FormatedBox open={open}>
      <Box className="content-div-avatar">
        <Avatar src="" />
      </Box>
      <Box className="content-div-info">
        <Box className="content-div-info-details-top">
          <a href="">
            <h3>{title}</h3>
          </a>
          <a href="">
            <p>{username}</p>
          </a>
        </Box>
        <Box className="content-div-info-details-lower">
          <p className="content-div-info-description">{description}</p>
          <Box className="content-div-info-categories">
            {categories.map((category) => (
              <a key={category.id} href="">
                <span>{category.name}</span>
              </a>
            ))}
          </Box>
        </Box>
      </Box>
      <Box className="content-div-settings">
        <IconButton>
          <MoreVertIcon color="primary" />
        </IconButton>
      </Box>
    </FormatedBox>
  );
}
export default DiscussionEntry;
