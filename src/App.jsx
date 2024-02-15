import { ThemeProvider } from '@mui/material/styles';

import { theme } from './components/themeProvider';
import Drawer from './components/Drawer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Drawer />
    </ThemeProvider>
  )
}

export default App;
