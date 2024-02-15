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
    components: {
      MuiToolbar: {
          styleOverrides: {
              personalized: {
                  height: 36,
                  minHeight: 36
              }
          }
      },
    },
});