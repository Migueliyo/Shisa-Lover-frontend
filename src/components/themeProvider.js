import { createTheme } from "@mui/material";

export const theme = createTheme({
    typography: {
      fontFamily: "\"Inter\", \"Roobert\", Helvetica, Arial, sans-serif"
    },
    palette: {
      primary: {
        main: '#fff',
      },
      secondary: {
        main: '#0f0e11',
      },
      appbar: {
        main: '#18181b'
      },
      drawer: {
        main: '#1f1f23'
      },
      avatar: {
        main: '#00c8af'
      },
      section: {
        a: {
          main: '#e06f10',
          hover: '#ff7400'
        }
      }
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
      MuiMenu: {
        styleOverrides: {
          paper: {
            color: '#fff',
            backgroundColor: '#18181b'
          }
        },
      },
    },
});