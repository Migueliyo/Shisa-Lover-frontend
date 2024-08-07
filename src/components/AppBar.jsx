import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { useTheme } from "@emotion/react";

import Cookies from "js-cookie";

import { Button, InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";

import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import GitHubIcon from "@mui/icons-material/GitHub";
import SearchIcon from "@mui/icons-material/Search";

import { useAppDispatch } from "../hooks/store";
import { useAuthActions } from "../hooks/useAuthActions";
import { uploadAvatar } from "../features/auth/slice";

import Login from "./Login";
import Register from "./Register";

const settings = ["Profile", "Account", "Dashboard"];

export const appBarHeight = 50;

const FormatedAppBar = styled(MuiAppBar)(({ theme }) => {
  const commonStyles = {
    height: appBarHeight,
    fontFamily: '"Roobert", "Inter", Helvetica, Arial, sans-serif',
    backgroundColor: theme.palette.appbar.main,
    boxShadow: "0 1px 2px rgba(0,0,0,.9) ,0 0px 2px rgba(0,0,0,.9)",
    "& .MuiToolbar-paper": {
      // Estilos específicos para el Toolbar dentro de la AppBar
      padding: 0,
      height: "100%",
      display: "flex",
      alignItems: "stretch",
      flexWrap: "nowrap",
    },
    ".menu-div": {
      width: "25%",
      justifyContent: "left",
    },
    ".search-bar": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    ".login-div": {
      width: "25%",
      display: "flex",
      alignItems: "center",
      justifyContent: "right",
      flexWrap: "nowrap",
    },
    ".login-button": {
      backgroundColor: theme.palette.appbar.login.main,
      display: "inline-flex",
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
      verticalAlign: "middle",
      overflow: "hidden",
      textDecoration: "none",
      whiteSpace: "nowrap",
      userSelect: "none",
      fontWeight: 600,
      borderRadius: "0.4 rem",
      fontSize: 13,
      height: "65%",
      marginRight: 10,
    },
    ".login-button:hover": {
      backgroundColor: theme.palette.appbar.login.hover,
    },
    ".register-button": {
      backgroundColor: theme.palette.appbar.register.main,
      color: "#fff",
      display: "inline-flex",
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
      verticalAlign: "middle",
      overflow: "hidden",
      textDecoration: "none",
      whiteSpace: "nowrap",
      userSelect: "none",
      fontWeight: 600,
      borderRadius: "0.4 rem",
      fontSize: 13,
      height: "65%",
    },
    ".register-button:hover": {
      backgroundColor: theme.palette.appbar.register.hover,
    },
    ".login-button span": {
      textTransform: "lowercase",
    },
    ".register-button span": {
      textTransform: "lowercase",
    },
  };

  return {
    ...commonStyles,
    //@media (max-width: 1100px)
    [theme.breakpoints.down("1100")]: {
      ...commonStyles,
    },
    //@media (max-width: 600px)
    [theme.breakpoints.down("sm")]: {
      ...commonStyles,
    },
  };
});

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  position: "relative",
  width: 380,
  height: "70%",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid",
  borderColor: theme.palette.mix.p.main,
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 5,
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.button.main,
  "&:hover": {
    cursor: "not-allowed",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.primary.main,
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: 10,
  },
}));

function AppBar() {
  //const theme = useTheme();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [clickedLogin, setClickedLogin] = useState(false);
  const [clickedRegister, setClickedRegister] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useAppDispatch();
  const { user } = useAuthActions();

  const handleClick = () => {
    navigate("/");
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleTogglePopLogin = () => {
    setClickedLogin(!clickedLogin);
    setClickedRegister(false);
  };

  const handleTogglePopRegister = () => {
    setClickedRegister(!clickedRegister);
    setClickedLogin(false);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadAvatar = async () => {
    if (!selectedFile) return;
    dispatch(uploadAvatar(selectedFile));
  };

  const handleLogout = async () => {
    if (Cookies.get("api_token")) {
      Cookies.remove("api_token", {
        path: "/",
        domain: window.location.hostname,
      });

      window.location.reload();
    } else {
      console.error("La cookie 'api_token' no existe");
    }
  };

  return (
    <FormatedAppBar variant="permanent">
      <Toolbar variant="paper">
        <Box className="menu-div">
          <Box
            sx={{
              width: 50,
            }}
          >
            <IconButton
              onClick={handleClick}
              sx={{ height: "100%", width: "100%" }}
            >
              <GitHubIcon color="primary" sx={{ height: 32, width: 32 }} />
            </IconButton>
          </Box>
        </Box>
        <Box className="search-bar">
          <Search>
            <StyledInputBase
              placeholder="Buscar"
              inputProps={{ "aria-label": "search" }}
            />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </Search>
        </Box>

        <Box className="login-div">
          {!user ? (
            <>
              <Box>
                <Button className="login-button" onClick={handleTogglePopLogin}>
                  I<span>niciar sesión</span>
                </Button>
                {clickedLogin ? (
                  <Login
                    toggle={handleTogglePopLogin}
                    switchToRegister={handleTogglePopRegister}
                  />
                ) : null}
              </Box>
              <Box>
                <Button
                  className="register-button"
                  onClick={handleTogglePopRegister}
                >
                  R<span>egistrarse</span>
                </Button>
                {clickedRegister ? (
                  <Register
                    toggle={handleTogglePopRegister}
                    switchToLogin={handleTogglePopLogin}
                  />
                ) : null}
              </Box>
            </>
          ) : null}
          <Box
            sx={{
              width: 50,
            }}
          >
            <Tooltip
              title="Open settings"
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -14],
                      },
                    },
                  ],
                },
              }}
            >
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ height: "100%", width: "100%" }}
              >
                {user && user.avatar ? (
                  <Avatar
                    sx={{ height: 30, width: 30 }}
                    alt={user.username}
                    src={user.avatar}
                  />
                ) : (
                  <Avatar sx={{ width: 30, height: 30 }} src="" />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "35px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              <MenuItem key={"logout"} onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
              <MenuItem key="update-avatar">
                <label htmlFor="avatar-upload">
                  <input
                    style={{ display: "none" }}
                    id="avatar-upload"
                    name="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <Typography sx={{ cursor: "pointer" }} component="span">
                    Actualizar avatar
                  </Typography>
                </label>
              </MenuItem>
              <MenuItem key="upload-avatar">
                <Typography onClick={handleUploadAvatar}>
                  Subir Avatar
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </FormatedAppBar>
  );
}

export default AppBar;
