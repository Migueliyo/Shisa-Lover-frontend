import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      secondary: {
        main: '#131213',
      },
    },
    drawer: {
      height: "98vh",
      width: "20%",
      whiteSpace: "nowrap",
      position: "relative",
      boxSizing: "border-box",
      overflowX: "hidden",
    }
});