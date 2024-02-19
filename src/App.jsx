import { ThemeProvider } from '@mui/material/styles';

import { theme } from './components/themeProvider';
import Drawer from './components/Drawer';
import AppBar from './components/AppBar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar />
      <Drawer />
    </ThemeProvider>
  )
}

export default App;
