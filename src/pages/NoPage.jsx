import { Box, Typography } from "@mui/material";

const NoPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        style={{ width: 60, height: 60, marginRight: 10 }}
        src="vite.svg"
      ></img>
      <Typography sx={{ width: 300, fontSize: 20, color: "#ABABAB" }}>
        Lo sentimos. Este contenido no está disponible.
      </Typography>
    </Box>
  );
};

export default NoPage;
