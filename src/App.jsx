import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";

import { store } from "./app/store.js";
import { theme } from "./components/themeProvider.js";
import { DrawerProvider } from "./context/drawerContext";

import Drawer from "./components/Drawer";
import AppBar from "./components/AppBar";
import Main from "./components/Main";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppBar />
        <DrawerProvider>
          <Drawer />
          <Main />
        </DrawerProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
