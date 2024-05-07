import { useEffect, useState } from "react";

import styled from "@emotion/styled";

import { Box, Button, IconButton, MenuItem, TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { useAppDispatch } from "../hooks/store";
import { register } from "../features/auth/slice";

import PasswordChecker from "./PasswordChecker";
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

    ".popup-inner-register": {
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

    "& label.Mui-error": {
      fontSize: 14.5,
      color: "#ff4a47",
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
      "&.Mui-error fieldset": {
        borderWidth: 3,
        color: "#d32f2f",
        borderColor: "#d32f2f",
      },
      "&.Mui-error:hover fieldset": {
        borderColor: "#ff4a47",
      },
      "&.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ff4a47",
      },
      "&.Mui-focused label": {
        color: "#ff7400",
      },
      "& .MuiSvgIcon-root": {
        color: theme.palette.primary.main,
      },
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

    ".email-info-text-error, .date-info-text-error": {
      height: 0,
      overflow: "hidden",
      fontFamily: '"Inter", "Roobert",  Helvetica, Arial, sans-serif',
      fontSize: 12,
      color: "#ff4a47",
      transition: "height .25s linear .1s",
    },

    ".email-info-text-error-clicked, .username-info-text-error-clicked, .date-info-text-error-clicked":
      {
        height: 15,
        marginBottom: 5,
        fontFamily: '"Inter", "Roobert",  Helvetica, Arial, sans-serif',
        fontSize: 12,
        color: "#ff4a47",
        overflow: "hidden",
        transition: "height .25s linear .1s",
      },

    ".username-info-text": {
      height: 0,
      overflow: "hidden",
      fontFamily: '"Inter", "Roobert",  Helvetica, Arial, sans-serif',
      fontSize: 12,
      color: "#BFBFBF",
      transition: "height .25s linear .1s",
    },

    ".username-info-text-clicked": {
      height: 30,
      marginBottom: 10,
      fontFamily: '"Inter", "Roobert",  Helvetica, Arial, sans-serif',
      fontSize: 12,
      color: "#BFBFBF",
      overflow: "hidden",
      transition: "height .25s linear .1s",
    },

    ".password-info-text": {
      height: 0,
      overflow: "hidden",
      transition: "height .25s linear .1s",
    },

    ".password-info-text-clicked": {
      height: 145,
      marginBottom: 5,
      overflow: "hidden",
      transition: "height .25s linear .1s",
    },

    "input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button":
      {
        display: "none",
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

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isUsernameClicked, setIsUsernameClicked] = useState(false);
  const [isPasswordClicked, setIsPasswordClicked] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);
  const [usernameError, setUsernameError] = useState("");
  const [dayValid, setDayValid] = useState(true);
  const [yearValid, setYearValid] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [dayTouched, setDayTouched] = useState(false);
  const [yearTouched, setYearTouched] = useState(false);
  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const dispatch = useAppDispatch();
  const [errorRegister, setErrorRegister] = useState(false);
  const [messageError, setMessageError] = useState("");

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

  const handlePasswordClick = () => {
    setIsPasswordClicked(true);
  };

  const validateEmail = () => {
    setEmailValid(
      email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    );
  };

  const validateUsername = () => {
    const isValid = /[a-zA-Z0-9]+$/;
    if (username.length < 4 || username.length > 25) {
      setUsernameValid(false);
      setUsernameError(
        "* Los nombres de usuario deben tener entre 4 y 25 caracteres."
      );
    } else if (!username.match(isValid)) {
      setUsernameValid(false);
      setUsernameError(
        "* Los nombres de usuario solo pueden contener caracteres alfanuméricos."
      );
    } else setUsernameValid(true);
  };

  const validateDay = () => {
    setDayValid(day >= 1 && day <= 31);
  };

  const validateYear = () => {
    setYearValid(year >= 1900 && year <= new Date().getFullYear());
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (emailTouched) validateEmail();
      if (usernameTouched) validateUsername();
      if (dayTouched) validateDay();
      if (yearTouched) validateYear();
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [email, username, day, year, emailTouched, usernameTouched, dayTouched, yearTouched]);

  useEffect(() => {
    const handleFieldBlur = (event) => {
      const targetClassList = event.target.classList;
      if (
        !targetClassList.contains("username-input") &&
        !targetClassList.contains("password-input")
      ) {
        setIsUsernameClicked(false);
        setIsPasswordClicked(false);
      }
    };

    document.body.addEventListener("focusout", handleFieldBlur);

    return () => {
      document.body.removeEventListener("focusout", handleFieldBlur);
    };
  }, []);

  useEffect(() => {
    const anyFieldEmpty = !email || !password || !username || !day || !year;
  
    setAllFieldsValid(!(anyFieldEmpty || !emailValid || !passwordValid || !usernameValid || !dayValid || !yearValid));
  }, [email, password, username, day, year, emailValid, passwordValid, usernameValid, dayValid, yearValid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (allFieldsValid) {
      const birthDate = new Date(year, month, day);
      const currentDate = new Date();
      
      let age = currentDate.getFullYear() - birthDate.getFullYear();
      const monthDifference = currentDate.getMonth() - birthDate.getMonth();
      
      if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age >= 18) {
        const userData = { username, email, password, date_of_birth: birthDate, first_name: "", last_name: "",  };
        const res = await dispatch(register(userData));
        if (res.payload === true) {
          setErrorRegister(false);
          props.toggle();
        } else {
          setMessageError("Ha ocurrido un error durante el registro.")
          setErrorRegister(true);
          setAllFieldsValid(false);
        }
      } else {
        setMessageError("Debes ser mayor de edad para unirte a Shisha Lover.")
        setErrorRegister(true);
        setAllFieldsValid(false);
      }
    }
  }

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
        {errorRegister ? (
          <ErrorCard text={messageError} />
        ) : null}
        <Box
          id="popup-inner-register-form"
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
              setEmailTouched(true);
              setErrorRegister(false);
            }}
            error={!emailValid && emailTouched}
          />
          <Box
            className={
              emailValid
                ? "email-info-text-error"
                : "email-info-text-error-clicked"
            }
          >
            <p style={{ marginTop: -2 }}>
              * Introduce una dirección de correo electrónico válida
            </p>
          </Box>
          <TextField
            className="password-input"
            label="Contraseña:"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordTouched(true);
              setErrorRegister(false);
            }}
            error={!passwordValid && passwordTouched}
            onClick={handlePasswordClick}
            onSelect={handlePasswordClick}
          />
          <Box
            className={
              isPasswordClicked
                ? "password-info-text-clicked"
                : "password-info-text"
            }
          >
            <PasswordChecker password={password} setPasswordValid={setPasswordValid} />
          </Box>
          <TextField
            className="username-input"
            label="Nombre de usuario:"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameTouched(true);
              setErrorRegister(false);
            }}
            error={!usernameValid && usernameTouched}
            onClick={handleUsernameClick}
            onSelect={handleUsernameClick}
          />
          <Box
            className={
              usernameValid
                ? isUsernameClicked
                  ? "username-info-text-clicked"
                  : "username-info-text"
                : "username-info-text-error-clicked"
            }
          >
            {usernameValid ? (
              isUsernameClicked ? (
                <p style={{ marginTop: -2 }}>
                  Este es el nombre con el que se te identificará en Shisa
                  Lover. Puedes cambiarlo más tarde.
                </p>
              ) : (
                <></>
              )
            ) : (
              <p style={{ marginTop: -2 }}>{usernameError}</p>
            )}
          </Box>
          <p className="date-text">Fecha de nacimiento:</p>
          <Box className="popup-inner-register-form-date-div">
            <TextField
              sx={{ flexShrink: 2 }}
              className="password-input"
              label="Día:"
              type="number"
              value={day}
              onChange={(e) => {
                setDay(e.target.value);
                setDayTouched(true);
                setErrorRegister(false);
              }}
              error={!dayValid && dayTouched}
            />
            <TextField
              sx={{ flexShrink: 1 }}
              label="Mes:"
              select
              value={month}
              onChange={(e) => {
                setMonth(e.target.value);
                setErrorRegister(false);
              }}
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
                  value={index}
                >
                  {mes}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              sx={{ flexShrink: 2 }}
              label="Año:"
              type="number"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setYearTouched(true);
                setErrorRegister(false);
              }}
              error={!yearValid && yearTouched}
            />
          </Box>
          <Box
            className={
              dayValid && yearValid
                ? "date-info-text-error"
                : "date-info-text-error-clicked"
            }
          >
            <p style={{ marginTop: -2 }}>
              * Introduce una fecha de nacimiento válida
            </p>
          </Box>
          <Box sx={{ height: 20 }}></Box>
          <Box className="button-hover-disabled">
            <Button
              disabled={!allFieldsValid}
              onClick={handleSubmit}
              className="popup-inner-register-form-button"
              sx={{
                width: "100%",
              }}
            >
              R<span>egistrarse</span>
            </Button>
          </Box>

          <Button sx={{ mt: 2 }} className="popup-inner-login-form-button">
            ¿Y<span>a tienes una cuenta?</span>&nbsp;I
            <span>niciar sesión aquí.</span>
          </Button>
        </Box>
      </Box>
    </FormatedBox>
  );
}

export default Register;
