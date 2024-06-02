import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Avatar, Box, IconButton, styled, useMediaQuery } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import RedditIcon from "@mui/icons-material/Reddit";

import api from "../services/api";

import DonutChart from "../components/DonutChart";
import FlavourCard from "../components/FlavourCard";

const FormatedBox = styled(Box)(({ theme }) => {
  const commonStyles = {
    color: theme.palette.primary.main,
    width: "100%",
    height: "100%",
    ".title-div-section": {
      height: "65px",
      border: 0,
      paddingBottom: 20,
      font: "inherit",
      margin: 0,
      verticalAlign: "baseline",
    },
    ".title-div-section h2": {
      fontFamily: '"Roobert", "Inter", Helvetica, Arial, sans-serif',
      border: 0,
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
      verticalAlign: "baseline",
      fontSize: 54,
      lineHeight: 1.2,
    },
    ".div-section": {
      height: "calc(100% - 85px)",
      display: "flex",
      flexDirection: "row",
    },
    ".graph-div-section": {
      position: "relative",
      width: 480,
    },
    ".graph-div-section img": {
      position: "absolute",
      width: "430px",
      top: "2.5%",
      left: 20,
    },
    ".donut-chart": {
      position: "absolute",
      zIndex: 1,
      top: "4.5%",
      marginLeft: 52,
    },
    ".content-graph-div-section": {
      padding: 20,
      paddingTop: 445,
      height: "calc(100% - 487px)",
      backgroundColor: theme.palette.card.main,
      border: "1px transparent",
      borderRadius: "7px",
    },
    ".content-graph-avatar": {
      paddingTop: 5,
      marginRight: 12,
    },
    ".content-graph-info": {
      width: "100%",
      minWidth: 0,
    },
    ".content-graph-info-details": {
      marginBottom: "0.3rem",
      display: "inline-block",
    },
    ".content-graph-info a": {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },
    ".content-graph-info a h3:hover": {
      position: "relative",
    },
    ".content-graph-info a h3:hover::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "100%",
      height: "2px",
      backgroundColor: theme.palette.section.a.hover,
    },
    ".content-graph-info a h3": {
      display: "inline-block",
      color: theme.palette.mix.h3.main,
      fontWeight: 600,
      fontSize: 18,
      border: 0,
      margin: 0,
      padding: 0,
      paddingTop: 2,
    },
    ".content-graph-info a p": {
      color: theme.palette.mix.p.main,
      display: "inline-block",
      fontSize: 12.5,
      border: 0,
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
      verticalAlign: "baseline",
      lineHeight: 1.2,
    },
    ".content-graph-info-emoticons": {
      marginLeft: "auto",
    },
    ".content-graph-info-emoticons button": {
      border: 0,
      boxSizing: "border-box",
      margin: 0,
      padding: 3,
      borderRadius: "0.2rem",
    },
    ".content-graph-info-emoticons button:hover": {
      backgroundColor: theme.palette.button.main,
    },
    ".content-graph-info-categories": {
      width: "100%",
      lineHeight: 1.5,
      display: "flex",
      flexWrap: "nowrap",
      gap: 5,
      marginTop: 2,
      overflow: "hidden",
    },
    ".content-graph-info-categories a": {
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
    ".content-graph-info-categories a:hover": {
      backgroundColor: theme.palette.button.hover,
    },
    ".content-graph-info-category span": {
      display: "flex",
      webkitBoxAlign: "center",
      alignItems: "center",
    },
    ".content-graph-about": {
      marginTop: 20,
    },
    ".content-graph-about p": {
      display: "inline-block",
      color: theme.palette.mix.h3.main,
      border: 0,
      margin: 0,
      padding: 0,
    },
    ".content-graph-about-stack": {
      display: "flex",
      padding: 15,
      marginTop: 8,
      border: "1px solid rgba(83,83,95,.50)",
      borderRadius: "7px",
    },
    ".content-graph-about-text": {
      width: "75%",
    },
    ".content-graph-about-text p": {
      fontSize: 15,
    },
    ".content-graph-about-icons": {
      display: "flex",
      flexFlow: "column wrap",
      fontSize: 14,
      fontWeight: 600,
    },
    ".content-graph-about-icon": {
      display: "flex",
      flexWrap: "nowrap",
      alignItems: "center",
      paddingTop: 3,
      gap: 5,
      color: "#adadb8",
      position: "relative",
      transition: "color 0 ease",
    },
    
    ".content-graph-about-icon::after": {
      content: "'\u2197'",
      color: "blue",
      opacity: 0,
      transition: "opacity 0 ease, right 0 ease",
    },
    
    ".content-graph-about-icon:hover": {
      cursor: "pointer",
      color: "blue",
    },
    
    ".content-graph-about-icon:hover::after": {
      opacity: 1,
    },
    ".content-graph-section": {
      width: "calc(100% - 520px)",
      marginLeft: 40,
    },
  };

  return {
    ...commonStyles,
    //@media (max-width: 1200px)
    [theme.breakpoints.down("1200")]: {
      ...commonStyles,
    },
  };
});

function Mix() {
  const { id } = useParams();
  const [mix, setMix] = useState(undefined);
  const [flavours, setFlavours] = useState([]);
  const is700 = useMediaQuery("(max-width: 700px)");

  const getMix = async (id) => {
    const response = await api.getMixById(id);
    if (!response.error) {
      setMix(response.data);
    } else {
      console.error(response.message);
    }
  };

  const getFlavours = async (flavours) => {
    try {
      const promises = flavours.map((flavour) =>
        api.getFlavourById(flavour.id)
      );
      const responses = await Promise.all(promises);
      const validResponses = responses
        .filter((response) => !response.error)
        .map((response) => response.data);
      setFlavours(validResponses);
    } catch (error) {
      console.error("Error fetching flavours:", error);
    }
  };

  useEffect(() => {
    getMix(id);
  }, [id]);

  useEffect(() => {
    if (mix?.flavours) {
      getFlavours(mix.flavours);
    }
  }, [mix]);

  const handleLikeMix = () => {};

  const handleShareMix = () => {};

  return (
    <FormatedBox>
      {mix && (
        <Box sx={{ height: "100%", width: "100%" }}>
          <Box className="title-div-section">
            <h2>{mix.mix_name}</h2>
          </Box>
          <Box className="div-section">
            <Box className="graph-div-section">
              <DonutChart className="donut-chart" flavours={mix.flavours} />
              <img src="/src/assets/cazoleta.png" />
              <Box className="content-graph-div-section">
                <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
                  <Box className="content-graph-avatar">
                    <a href="">
                      <Avatar sx={{ width: 64, height: 64 }} src="" />
                    </a>
                  </Box>
                  <Box className="content-graph-info">
                    <Box sx={{ display: "flex" }}>
                      <Box className="content-graph-info-details">
                        <a href="">
                          <h3>{mix.username}</h3>
                        </a>
                        <br />
                        <a href="">
                          <p>Le gusta a {mix.total_likes} personas</p>
                        </a>
                      </Box>
                      <Box className="content-graph-info-emoticons">
                        <IconButton onClick={handleLikeMix}>
                          <FavoriteBorderIcon color="primary" />
                        </IconButton>
                        <IconButton onClick={handleShareMix}>
                          <ShareIcon color="primary" />
                        </IconButton>
                        <IconButton>
                          <MoreVertIcon color="primary" />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box className="content-graph-info-categories">
                      {mix.categories.map((category) => (
                        <a key={category.id} href="">
                          <span>{category.name}</span>
                        </a>
                      ))}
                    </Box>
                  </Box>
                </Box>
                <Box className="content-graph-about">
                  <p>Acerca de {mix.username}</p>
                  <Box className="content-graph-about-stack">
                    <Box className="content-graph-about-text">
                      <p>TODO</p>
                    </Box>
                    <Box className="content-graph-about-icons">
                      <Box className="content-graph-about-icon">
                        <TwitterIcon />
                        Twitter
                      </Box>
                      <Box className="content-graph-about-icon">
                        <InstagramIcon />
                        Instagram
                      </Box>
                      <Box className="content-graph-about-icon">
                        <FacebookIcon />
                        Facebook
                      </Box>
                      <Box className="content-graph-about-icon">
                        <YouTubeIcon />
                        Youtube
                      </Box>
                      <Box className="content-graph-about-icon">
                        <RedditIcon />
                        Reddit
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className="content-graph-section">
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  paddingTop: "15px",
                  gap: is700 ? "3%" : "1%",
                }}
              >
                {flavours.map((flavour) => (
                  <FlavourCard
                    sx={{
                      width: "180px!important",
                    }}
                    key={flavour.id}
                    id={flavour.id}
                    name={flavour.flavour_name}
                    brand={flavour.brand_name}
                    categories={flavour.categories}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </FormatedBox>
  );
}

export default Mix;
