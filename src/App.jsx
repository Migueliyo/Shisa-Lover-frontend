import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";

import { decodedUser } from "./features/auth/slice.js";
import { useAppDispatch } from "./hooks/store.js";
import { theme } from "./components/themeProvider.js";

import api from "./services/api.js";

import Layout from "./layout/Layout.jsx";

import Main from "./pages/Main.jsx";
import Mixes from "./pages/Mixes.jsx";
import Mix from "./pages/Mix.jsx";
import Flavours from "./pages/Flavours.jsx";
import Flavour from "./pages/Flavour.jsx";
import Entries from "./pages/Entries.jsx";
import Entry from "./pages/Entry.jsx";
import NoPage from "./pages/NoPage.jsx";

function App() {
  const dispatch = useAppDispatch();
  const token = api.getCookie("api_token");

  useEffect(() => {
    if (token) {
      dispatch(decodedUser(token));
    }
  }, [token]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index element={<Main />} />
            <Route path="/mezclas" element={<Mixes />} />
            <Route path="/mezclas/:id" element={<Mix />} />
            <Route path="/sabores" element={<Flavours />} />
            <Route path="/sabores/:id" element={<Flavour />} />
            <Route path="/entradas" element={<Entries />} />
            <Route path="/entradas/:id" element={<Entry />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
