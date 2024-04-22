import { createTheme } from "@mui/material";

export const theme = createTheme({
    typography: {
      fontFamily: "\"Inter\", \"Roobert\", Helvetica, Arial, sans-serif"
    },
    palette: {
      primary: {
        main: '#EFEFF1',
      },
      secondary: {
        main: '#0f0e11',
      },
      tertiary: {
        main: '#ff7400',
      },
      appbar: {
        main: '#18181b',
        login: {
          main: 'rgba(83,83,95,.30)',
          hover: 'rgba(83,83,95,.45)'
        },
        register: {
          main: '#a1570b',
          hover: '#d1710d'
        }
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
        },
        divider: {
          main: 'rgba(83,83,95,.50)'
        },
        button:{
          main: '#ff7400',
          hover: 'rgba(83,83,95,.30)'
        }
      },
      button: {
        main: 'rgba(83,83,95,.38)',
        hover: 'rgba(83,83,95,.30)'
      },
      mix: {
        h3: {
          main: '#dedee3'
        },
        p: {
          main: '#adadb8'
        },
        a: {
          main: '#adadb8'
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