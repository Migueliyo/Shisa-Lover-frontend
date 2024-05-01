import { useEffect, useState } from "react";

import styled from "@emotion/styled";

import { Box, Button, IconButton, MenuItem, TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const FormatedBox = styled(Box)(({ theme }) => {
  const commonStyles = {
    fontFamily: ' "Roobert", "Inter", Helvetica, Arial, sans-serif',
    position: "fixed",
    zIndex: 1,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.4)",

    ".popup-inner-register": {
      backgroundColor: theme.palette.drawer.main,
      color: theme.palette.primary.main,
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      padding: "30px",
      borderRadius: "5px",
      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
      width: "440px",
    },

    ".close-icon-register": {
      margin: 0,
      padding: 0,
      width: 30,
      height: 30,
      position: "absolute",
      right: 10,
      top: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    ".close-icon-register button": {
      color: "#fff",
      borderRadius: 4,
      padding: 0,
      width: "100%",
      height: "100%",
    },

    ".close-icon-register button:hover": {
      backgroundColor: theme.palette.appbar.login.hover,
    },

    ".close-icon-register svg": {
      width: "23px",
      height: "23px",
    },

    ".popup-inner-register-title": {
      marginTop: 10,
      width: "100%",
      height: "50px",
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },

    ".popup-inner-register-title h2": {
      marginLeft: 5,
      fontSize: 24,
      fontWeight: 600,
    },

    ".popup-inner-register-title-icon": {
      width: "50px",
      height: "50px",
      display: "inline-flex",
      alignItems: "center",
    },

    ".popup-inner-register-title-icon img": {
      margin: 0,
      padding: 0,
      width: "90%",
      height: "90%",
    },

    "& label": {
      color: theme.palette.primary.main,
      fontSize: 13.5,
    },

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
      fontSize: 14,
      "& .MuiOutlinedInput-input": {
        padding: "15px 14px",
      },
      "& fieldset": {
        borderColor: "#808080",
      },
      "&:hover fieldset": {
        borderColor: "#D3D3D3",
      },
      "&.Mui-focused fieldset": {
        borderWidth: 3,
        color: "#ff7400",
        borderColor: "#ff7400",
      },
      "&.Mui-focused label": {
        color: "#ff7400",
      },
      "& .MuiSvgIcon-root": {
        color: theme.palette.primary.main,
      },
    },

    ".popup-inner-register-form a": {
      textDecoration: "none",
    },

    ".date-text": {
      fontSize: 15,
      marginTop: 5,
      marginBottom: 5,
    },

    ".popup-inner-register-form-pass": {
      color: theme.palette.section.a.main,
      fontSize: 14,
    },

    ".popup-inner-register-form-pass:hover": {
      color: theme.palette.section.a.hover,
      textDecoration: "underline",
    },

    ".popup-inner-register-form-button": {
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

    ".popup-inner-register-form-button:hover": {
      backgroundColor: theme.palette.appbar.register.hover,
    },

    ".popup-inner-register-form-button span": {
      textTransform: "lowercase",
    },

    ".popup-inner-login-form-button": {
      width: "100%",
      fontSize: 13,
      color: theme.palette.section.button.main,
      fontWeight: 600,
    },
    ".popup-inner-login-form-button:hover": {
      backgroundColor: theme.palette.section.button.hover,
      color: theme.palette.primary.main,
    },
    ".popup-inner-login-form-button span": {
      textTransform: "lowercase",
    },
    ".popup-inner-register-form-date-div": {
      display: "flex",
      gap: 10,
    },
    ".username-info-text": {
      height: 0,
      overflow: "hidden",
      transition: "height .25s linear .1s",
    },
    ".username-info-text-clicked": {
      height: 10,
      marginTop: -18,
      marginBottom: 28,
      fontFamily: '"Inter", "Roobert",  Helvetica, Arial, sans-serif',
      fontSize: 12,
      color: "#BFBFBF",
      transition: "height .25s linear .1s",
    },
  };
  return {
    ...commonStyles,
    //@media (max-width: 1100px)
    [theme.breakpoints.down("1150")]: {
      ...commonStyles,
    },
  };
});

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState();
  const [isUsernameClicked, setIsUsernameClicked] = useState(false);
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const handleUsernameClick = () => {
    setIsUsernameClicked(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const registerBox = document.querySelector(".username-input");
      if (registerBox && !registerBox.contains(event.target)) {
        setIsUsernameClicked(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <FormatedBox>
      <Box className="popup-inner-register">
        <Box className="close-icon-register">
          <IconButton onClick={props.toggle}>
            <CloseIcon color="primary" />
          </IconButton>
        </Box>
        <Box className="popup-inner-register-title">
          <Box className="popup-inner-register-title-icon">
            <img src="vite.svg"></img>
          </Box>
          <h2>Únete a Shisha Lover hoy</h2>
        </Box>
        <Box
          className="popup-inner-register-form"
          component="form"
          sx={{
            "& .MuiTextField-root": { my: 1, width: "100%" },
          }}
        >
          <TextField
            required
            label="Email:"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            label="Contraseña:"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            required
            className="username-input"
            label="Nombre de usuario:"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onClick={handleUsernameClick}
          />
          <Box className={isUsernameClicked ? "username-info-text-clicked" : "username-info-text"}>
            <p>
              Este es el nombre con el que se te identificará en Shisa Lover.
              Puedes cambiarlo más tarde.
            </p>
          </Box>
          <p className="date-text">Fecha de nacimiento:</p>
          <Box className="popup-inner-register-form-date-div">
            <TextField
              sx={{ flexShrink: 2 }}
              required
              label="Día:"
              type="number"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              inputProps={{ min: 1, max: 31 }}
            />
            <TextField
              sx={{ flexShrink: 1 }}
              required
              label="Mes:"
              select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: {
                      maxHeight: 300,
                    },
                  },
                },
              }}
            >
              {meses.map((mes, index) => (
                <MenuItem
                  key={index}
                  sx={{ fontSize: 14, maxHeight: 25 }}
                  value={index + 1}
                >
                  {mes}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              sx={{ flexShrink: 2 }}
              required
              label="Año:"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </Box>

          <Button
            className="popup-inner-register-form-button"
            sx={{ my: 2, width: "100%" }}
          >
            R<span>egistrarse</span>
          </Button>

          <Button className="popup-inner-login-form-button">
            ¿Y<span>a tienes una cuenta?</span>&nbsp;I
            <span>niciar sesión aquí.</span>
          </Button>
        </Box>
      </Box>
    </FormatedBox>
  );
}

export default Register;
