import { useEffect, useState } from "react";
import { passwordStrength } from "check-password-strength";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

// Componente reutilizable para mostrar cada mensaje de validación
const ValidationMessage = ({ condition, message }) => (
  <Grid container spacing={1} alignItems="center" sx={{ marginBottom: -1.5 }}>
    <Grid item>
      {condition ? (
        <DoneIcon sx={{ color: "#00f593", marginRight: "-5px" }} />
      ) : (
        <CloseIcon sx={{ color: "#f51905", marginRight: "-5px" }} />
      )}
    </Grid>
    <Grid item>
      <Typography
        style={{
          fontFamily:
            '"Inter", "Roobert",  Helvetica, Arial, sans-serif',
          fontSize: 12,
          lineHeight: 1.5,
          color: "#BFBFBF",
          paddingBottom: 5,
        }}
      >
        {message}
      </Typography>
    </Grid>
  </Grid>
);

const PasswordChecker = ({ password }) => {
  const testResult = passwordStrength(password);
  const num = ((testResult.id + 1) * 100) / 4;
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const funcProgressPassword = () => {
      switch (testResult.id) {
        case 0:
          setColor("#FF8280");
          setMessage("Contraseña demasiado débil");
          break;
        case 1:
          setColor("#FFAD00");
          setMessage("Contraseña débil");
          break;
        case 2:
          setColor("#9bc158");
          setMessage("Contraseña media");
          break;
        case 3:
          setColor("#00b500");
          setMessage("Contraseña segura");
          break;
        default:
          setColor("success");
          setMessage("Contraseña demasiado débil");
          break;
      }
    };

    funcProgressPassword();
  }, [testResult.id]);

  return (
    <Box>
      <Box style={{ width: "100%", height: "7px" }}>
        <LinearProgress
          variant="determinate"
          value={num}
          sx={{
            "& .MuiLinearProgress-bar": { backgroundColor: color },
            backgroundColor: "transparent",
          }}
        />
      </Box>
      <Typography
        style={{
          marginBottom: 10,
          fontFamily:
            '"Inter", "Roobert",  Helvetica, Arial, sans-serif',
          fontSize: 12,
          color: color,
        }}
      >
        {message}
        <ValidationMessage
          condition={testResult.length >= 10}
          message="Contiene mínimo 10 caracteres"
        />
        <ValidationMessage
          condition={testResult.contains.includes("uppercase")}
          message="Contiene una letra mayúscula"
        />
        <ValidationMessage
          condition={testResult.contains.includes("number")}
          message="Contiene un número"
        />
        <ValidationMessage
          condition={testResult.contains.includes("symbol")}
          message="Contiene un carácter especial"
        />
      </Typography>
    </Box>
  );
};

PasswordChecker.propTypes = {
  password: PropTypes.string.isRequired,
};

export default PasswordChecker;
