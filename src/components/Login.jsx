import { useState } from "react";

import styled from "@emotion/styled";

import { Box, Button, IconButton, TextField } from "@mui/material";

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

    ".popup-inner": {
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
      height: "340px",
    },

    ".close-icon": {
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

    ".close-icon button": {
      color: "#fff",
      borderRadius: 4,
      padding: 0,
      width: "100%",
      height: "100%",
    },

    ".close-icon button:hover": {
      backgroundColor: theme.palette.appbar.login.hover,
    },

    ".close-icon svg": {
      width: "23px",
      height: "23px",
    },

    ".popup-inner-title": {
      marginTop: 10,
      width: "100%",
      height: "50px",
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },

    ".popup-inner-title h2": {
      marginLeft: 5,
      fontSize: 24,
      fontWeight: 600,
    },

    ".popup-inner-title-icon": {
      width: "50px",
      height: "50px",
      display: "inline-flex",
      alignItems: "center",
    },

    ".popup-inner-title-icon img": {
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
      "& .MuiOutlinedInput-input":{
        padding: "15px 14px"
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
    },

    ".popup-inner-form a": {
      textDecoration: "none",
    },

    ".popup-inner-form-pass" : {
      color: theme.palette.section.a.main,
      fontSize: 14
    },

    ".popup-inner-form-pass:hover" : {
      color: theme.palette.section.a.hover,
      textDecoration: "underline",
    },

    ".form-register-button": {
      width: "100%",
      fontSize: 13,
      color: theme.palette.section.button.main,
      fontWeight: 600,
    },
    ".form-register-button:hover": {
      backgroundColor: theme.palette.section.button.hover,
      color: theme.palette.primary.main,
    },
    ".form-register-button span": {
      textTransform: "lowercase",
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

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <FormatedBox>
      <Box className="popup-inner">
        <Box className="close-icon">
          <IconButton onClick={props.toggle}>
            <CloseIcon color="primary" />
          </IconButton>
        </Box>
        <Box className="popup-inner-title">
          <Box className="popup-inner-title-icon">
            <img src="vite.svg"></img>
          </Box>
          <h2>Iniciar sesión en Shisha Lover</h2>
        </Box>
        <Box
          className="popup-inner-form"
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

          <a className="popup-inner-form-pass" href="">¿Olvidaste tu contraseña?</a>

          <Button className="register-button" 
            sx={{ my: 2, width: "100%" }}
          >
            I<span>niciar sesión</span>
          </Button>

          <Button className="form-register-button">
            ¿N<span>o tienes una cuenta?</span>&nbsp;R<span>egístrate aquí.</span>
          </Button>
        </Box>
      </Box>
    </FormatedBox>
  );
}

export default Login;