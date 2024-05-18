import { useEffect, useState } from "react";

import styled from "@emotion/styled";

import { Box, Button, IconButton, TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { useAppDispatch } from "../hooks/store";
// import { useAuthActions } from "../hooks/useAuthActions";
// import { statusActions } from "../hooks/statusActions";
import { login } from "../features/auth/slice";

import ErrorCard from "./ErrorCard";

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
      backgroundColor: theme.palette.popup.main,
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
    },

    ".popup-inner-form a": {
      textDecoration: "none",
    },

    ".popup-inner-form-pass": {
      color: theme.palette.section.a.main,
      fontSize: 14,
    },

    ".popup-inner-form-pass:hover": {
      color: theme.palette.section.a.hover,
      textDecoration: "underline",
    },

    ".form-login-button": {
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

    ".form-login-button:hover": {
      backgroundColor: theme.palette.appbar.register.hover,
    },

    ".form-login-button span": {
      textTransform: "lowercase",
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

    ".button-hover-disabled": {
      cursor: "not-allowed",
    },

    "& .MuiButtonBase-root:disabled": {
      color: "#fff",
      opacity: 0.7,
    },
  };
  return {
    ...commonStyles,
    //@media (max-width: 520px)
    [theme.breakpoints.down("520")]: {
      ...commonStyles,
      ".popup-inner": {
        width: "340px",
      },
    },
  };
});

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const areFieldsNotEmpty = email.trim() !== "" && password.trim() !== "";
    setAllFieldsValid(areFieldsNotEmpty);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (allFieldsValid) {
      const credentials = { email, password };
      const res = await dispatch(login(credentials));
      if (!res.payload.error) {
        setErrorLogin(false);
        props.toggle();
      } else {
        setErrorLogin(true);
        setAllFieldsValid(false);
      }
    }
  };

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
        {errorLogin ? (
          <ErrorCard text={"Usuario o contraseña incorrectos."} />
        ) : null}
        <Box
          className="popup-inner-form"
          component="form"
          noValidate
          sx={{
            "& .MuiTextField-root": { my: 1, width: "100%" },
          }}
        >
          <TextField
            label="Email:"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorLogin(false);
            }}
          />
          <TextField
            label="Contraseña:"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorLogin(false);
            }}
          />

          <a className="popup-inner-form-pass" href="">
            ¿Olvidaste tu contraseña?
          </a>

          <Box sx={{ height: 20 }}></Box>
          <Box className="button-hover-disabled">
            <Button
              type="submit"
              disabled={!allFieldsValid}
              onClick={handleSubmit}
              className="form-login-button"
              sx={{
                width: "100%",
              }}
            >
              I<span>niciar sesión</span>
            </Button>
          </Box>

          <Button
            sx={{ mt: 2 }}
            className="form-register-button"
            onClick={props.switchToRegister}
          >
            ¿N<span>o tienes una cuenta?</span>&nbsp;R
            <span>egístrate aquí.</span>
          </Button>
        </Box>
      </Box>
    </FormatedBox>
  );
}

export default Login;
