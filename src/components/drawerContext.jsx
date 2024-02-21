import { createContext, useState, useEffect } from "react";

import { useTheme } from "@emotion/react";

import { useMediaQuery } from "@mui/material";

export const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(() => {
    // Intenta recuperar el valor de localStorage, o usa !isSm si no existe
    const storedValue = localStorage.getItem("drawerOpen");
    return storedValue !== null ? JSON.parse(storedValue) : !isSm;
  });

  useEffect(() => {
    localStorage.setItem("drawerOpen", JSON.stringify(open));
  }, [open]);

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};
