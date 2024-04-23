import { ThemeProvider } from '@mui/material/styles';

import { theme } from './context/themeProvider';
import { DrawerProvider } from './context/drawerContext';

import Drawer from './components/Drawer';
import AppBar from './components/AppBar';
import Main from './components/Main';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar />
      <DrawerProvider>
        <Drawer />
        <Main />
      </DrawerProvider>
    </ThemeProvider>
  )
}

export default App;
