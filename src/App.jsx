import { ThemeProvider } from '@mui/material/styles';
import Drawer from './components/Drawer';

import './App.css'
import { theme } from './components/themeProvider';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Drawer />
    </ThemeProvider>
  )
}

export default App;
