import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { store } from "./app/store.js";
import { theme } from "./components/themeProvider.js";

import Layout from "./layout/Layout.jsx";

import Main from "./pages/Main.jsx";
import Mixes from "./pages/Mixes.jsx";
import Flavours from "./pages/Flavours.jsx";
import Entries from "./pages/Entries.jsx";
import NoPage from "./pages/NoPage.jsx";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route index element={<Main />} />
              <Route path="/mezclas" element={<Mixes />} />
              <Route path="/sabores" element={<Flavours />} />
              <Route path="/entradas" element={<Entries />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </BrowserRouter>
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
