import { useCallback, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import styled from "@emotion/styled";

import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { DrawerContext } from "../context/drawerContext";

const FormatedCard = styled(Card)(({ theme }) => {
  const commonStyles = {
    border: 0,
    margin: 0,
    marginBottom: 30,
    padding: 0,
    verticalAlign: "baseline",
    width: "49%",
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
      fontSize: 18,
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
    //@media (max-width: 1100px)
    [theme.breakpoints.down("1150")]: {
      ...commonStyles,
      width: "100%",
    },
  };
});

function EntryCard({ id, username, description, title, categories }) {
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

  const handleClickedEntry = () => {
    navigate(`/entradas/${id}`);
  }

  return (
    <FormatedCard ref={cardRef} open={open}>
      <CardActionArea onClick={handleClickedEntry}>
        <CardContent sx={{ display: "flex", flexWrap: "nowrap" }}>
          <Box className="content-div-avatar">
            <a href="">
              <Avatar src="" />
            </a>
          </Box>
          <Box className="content-div-info">
            <Box className="content-div-info-details-top">
              <h3>{title}</h3>
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
            <Box>
              <MoreVertIcon color="primary" />
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </FormatedCard>
  );
}
export default EntryCard;
