import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Avatar,
  Box,
  IconButton,
  TextField,
  styled,
  useMediaQuery,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import SendIcon from "@mui/icons-material/Send";

import { useAuthActions } from "../hooks/useAuthActions";

import api from "../services/api";

import DonutChart from "../components/DonutChart";
import FlavourCard from "../components/FlavourCard";
import UserSocialMedia from "../components/UserSocialMedia";
import Comment from "../components/Comment";
import Login from "../components/Login";
import Register from "../components/Register";

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
    ".cazoleta-img": {
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
    ".content-graph-avatar img": {
      width: 64,
      height: 64,
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
      marginRight: 20,
    },
    ".content-graph-about-text p": {
      fontSize: 15,
    },
    "@keyframes like": {
      "0%": { transform: "scale(1)" },
      "25%": { transform: "scale(1.5)" },
      "50%": { transform: "scale(1.2)" },
      "75%": { transform: "scale(1.5)" },
      "100%": { transform: "scale(1)" },
    },
    ".MuiIconButton-root svg": {
      transition: "color 0.3s",
    },
    ".MuiIconButton-root:active svg": {
      animation: "like 0.6s ease-in-out",
    },
    ".content-graph-section": {
      width: "calc(100% - 520px)",
      marginLeft: 40,
    },
    ".content-graph-section h2": {
      fontFamily: '"Roobert", "Inter", Helvetica, Arial, sans-serif',
      border: 0,
      boxSizing: "border-box",
      margin: 0,
      marginBottom: 5,
      padding: 0,
      verticalAlign: "baseline",
      fontSize: 36,
      lineHeight: 1,
    },
    ".content-graph-section-comments": {
      display: "flex",
      flexWrap: "wrap",
      gap: "1%",
      height: "100px",
      overflow: "hidden",
      maskImage: "linear-gradient(to top, transparent, white 10%)",
    },
    ".content-graph-section-comments-paragraph": {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: theme.palette.mix.p.main,
      fontSize: 13,
      fontStyle: "italic",
    },
    ".content-graph-section-comments-button": {
      width: "100%",
      display: "flex",
      marginTop: 10,

      "& label.Mui-focused": {
        color: "#ff7400",
        fontSize: 15,
        fontWeight: 600,
      },

      "& .MuiInputLabel-shrink": {
        fontSize: 15,
      },

      "& .MuiOutlinedInput-root": {
        color: theme.palette.primary.main,
        fontSize: 12.5,
        "& .MuiOutlinedInput-input": {
          padding: "16.5px 56px",
        },
        "& fieldset": {
          borderColor: "rgba(83,83,95,.50)",
        },
        "&:hover fieldset": {
          borderColor: "#ababab",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#ababab",
        },
      },
    },
  };

  return {
    ...commonStyles,
    //@media (max-width: 1200px)
    [theme.breakpoints.down("1200")]: {},
  };
});

function Mix() {
  const { id } = useParams();
  const [mix, setMix] = useState(undefined);
  const [flavours, setFlavours] = useState([]);
  const [userMix, setUserMix] = useState(undefined);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [mixComments, setMixComments] = useState([]);
  const [mixLikes, setMixLikes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const is700 = useMediaQuery("(max-width: 700px)");
  const [activeSegment, setActiveSegment] = useState(null);

  const { user } = useAuthActions();

  const getMix = async (id) => {
    const response = await api.getMixById(id);
    if (!response.error) {
      setMix(response.data);
    } else {
      console.error(response.message);
    }
  };

  const getUser = async (username) => {
    const response = await api.getUserByUsername(username);
    if (!response.error) {
      setUserMix(response.data);
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

  const checkIfLiked = async (mixId) => {
    const response = await api.checkIfLikedMix(mixId);
    if (!response.error) {
      setLiked(response.data.hasLiked);
    } else {
      console.error(response.message);
    }
  };

  useEffect(() => {
    setIsLoggedIn(user !== undefined);
  });

  useEffect(() => {
    getMix(id);
  }, [id]);

  useEffect(() => {
    if (mix?.flavours) {
      getFlavours(mix.flavours);
    }
  }, [mix]);

  useEffect(() => {
    if (mix?.username) {
      getUser(mix.username);
    }
  }, [mix]);

  useEffect(() => {
    if (mix?.id && user) {
      checkIfLiked(mix.id);
    }
  }, [mix, user]);

  useEffect(() => {
    if (mix?.comments) {
      const reversedComments = [...mix.comments].reverse();
      setMixComments(reversedComments);
    }
  }, [mix]);

  useEffect(() => {
    if (mix?.likes) {
      setMixLikes(mix.likes);
    }
  }, [mix]);

  const handleLikeMix = async () => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }
    if (liked) {
      const response = await api.removeLike(mix.id);
      if (!response.error) {
        setLiked(false);
        setMixLikes((prevLikes) => prevLikes.filter(like => like.username !== user.username));
        setMix((prevMix) => ({
          ...prevMix,
          likes: prevMix.likes.filter(like => like.username !== user.username)
        }));
      } else {
        console.error(response.message);
      }
    } else {
      const response = await api.addLike(mix.id);
      if (!response.error) {
        setLiked(true);
        if (response.data && response.data.id) {
          const newLike = { id: response.data.id, username: user.username };
          setMixLikes((prevLikes) => [...prevLikes, newLike]);
          setMix((prevMix) => ({
            ...prevMix,
            likes: prevMix.likes ? [...prevMix.likes, newLike] : [newLike]
          }));
        } else {
          console.error("No se pudo obtener el id del like");
        }
      } else {
        console.error(response.message);
      }
    }
  };

  const handleShareMix = () => {};

  const handleCommentMix = async () => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }
    if (comment !== "") {
      const data = { content: comment };
      const response = await api.addComment(mix.id, data);
      if (!response.error) {
        window.location.reload();
      } else {
        console.error(response.message);
      }
    } else {
      console.log("El comentario está vacio");
    }
  };

  const handleTogglePopLogin = () => {
    setShowLogin(!showLogin);
    setShowRegister(false);
  };

  const handleTogglePopRegister = () => {
    setShowRegister(!showRegister);
    setShowLogin(false);
  };

  return (
    <FormatedBox>
      {showLogin ? (
        <Login
          toggle={handleTogglePopLogin}
          switchToRegister={handleTogglePopRegister}
        />
      ) : null}
      {showRegister ? (
        <Register
          toggle={handleTogglePopRegister}
          switchToLogin={handleTogglePopLogin}
        />
      ) : null}
      {mix && (
        <Box sx={{ height: "100%", width: "100%" }}>
          <Box className="title-div-section">
            <h2>{mix.mix_name}</h2>
          </Box>
          <Box className="div-section">
            <Box className="graph-div-section">
              <DonutChart
                className="donut-chart"
                flavours={mix.flavours}
                activeSegment={activeSegment}
                setActiveSegment={setActiveSegment}
              />
              <img className="cazoleta-img" src="/src/assets/cazoleta.png" />
              <Box className="content-graph-div-section">
                <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
                  <Box className="content-graph-avatar">
                    {userMix && userMix.username && (
                      <a href={`/usuarios/${userMix.username}`}>
                        {userMix && userMix.avatar ? (
                          <Avatar
                            sx={{ height: 64, width: 64, borderRadius: "50%" }}
                            alt={userMix.username}
                            src={userMix.avatar}
                          />
                        ) : (
                          <Avatar sx={{ width: 64, height: 64 }} src="" />
                        )}
                      </a>
                    )}
                  </Box>
                  <Box className="content-graph-info">
                    <Box sx={{ display: "flex" }}>
                      <Box className="content-graph-info-details">
                        {userMix && userMix.username && (
                          <a href={`/usuarios/${userMix.username}`}>
                            <h3>{mix.username}</h3>
                          </a>
                        )}
                        <br />
                        <a href="">
                          {mixLikes && <p>Le gusta a {mixLikes.length ? mixLikes.length : 0} personas</p>}
                        </a>
                      </Box>
                      <Box className="content-graph-info-emoticons">
                        <IconButton onClick={handleLikeMix}>
                          {liked ? (
                            <FavoriteSharpIcon color="error" />
                          ) : (
                            <FavoriteBorderIcon color="primary" />
                          )}
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
                  {userMix && (
                    <Box className="content-graph-about-stack">
                      <Box className="content-graph-about-text">
                        <p>{userMix.description}</p>
                      </Box>
                      <UserSocialMedia user={userMix} />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
            <Box className="content-graph-section">
              <Box>
                <h2>Preparación</h2>
                <Box
                  sx={{ height: 70, mb: 2 }}
                  className="content-graph-about-stack"
                ></Box>
              </Box>
              <Box>
                <h2>Sabores de la mezcla</h2>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    paddingTop: "15px",
                    gap: is700 ? "3%" : "1.5%",
                  }}
                >
                  {flavours.map((flavour, index) => (
                    <FlavourCard
                      sx={{
                        width: "180px!important",
                        margin: "0!important",
                        marginBottom: "20px!important",
                      }}
                      key={index}
                      id={flavour.id}
                      name={flavour.flavour_name}
                      brand={flavour.brand_name}
                      categories={flavour.categories}
                      activeSegment={activeSegment}
                      index={index}
                    />
                  ))}
                </Box>
              </Box>
              <Box>
                <h2>Comentarios</h2>
                <Box className="content-graph-section-comments">
                  {mixComments.length !== 0 ? (
                    mixComments
                      .slice(0, 2)
                      .map((comment) => (
                        <Comment
                          key={comment.id}
                          username={comment.username}
                          avatar={comment.avatar}
                          text={comment.content}
                        />
                      ))
                  ) : (
                    <Box className="content-graph-section-comments-paragraph">
                      <p>Todavía no se ha añadido ningún comentario</p>
                    </Box>
                  )}
                </Box>
                <Box className="content-graph-section-comments-button">
                  <Box
                    sx={{
                      position: "absolute",
                      padding: "6px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {user && user.avatar ? (
                      <Avatar
                        sx={{ height: 40, width: 40, borderRadius: "50%" }}
                        alt={user.username}
                        src={user.avatar}
                      />
                    ) : (
                      <Avatar sx={{ width: 40, height: 40 }} src="" />
                    )}
                  </Box>
                  <TextField
                    sx={{ width: "100%", mr: "1.5%" }}
                    type="text"
                    placeholder={`Añade un comentario para ${mix.mix_name}`}
                    value={comment}
                    autoComplete="off"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  ></TextField>
                  <Box
                    className="content-graph-info-emoticons"
                    sx={{
                      height: "40px",
                      position: "absolute",
                      padding: "5px 2px",
                      right: "2.5%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton onClick={handleCommentMix}>
                      <SendIcon color="primary" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </FormatedBox>
  );
}

export default Mix;
