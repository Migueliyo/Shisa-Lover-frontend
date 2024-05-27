import { createContext, useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

export const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("1450"));
  const [prevOpenState, setPrevOpenState] = useState(false);

  // Recupera el estado del cajón al inicio del componente
  const initialOpenState = localStorage.getItem("drawerOpen");
  const [open, setOpen] = useState(() => {
    return initialOpenState !== null ? JSON.parse(initialOpenState) : !isSm;
  });

  useEffect(() => {
    // Actualiza el estado en localStorage cuando cambia
    localStorage.setItem("drawerOpen", JSON.stringify(open));
  }, [open]);

  useEffect(() => {
    if (isSm) {
      setPrevOpenState(open);
      setOpen(false);
    } else {
      if (prevOpenState){
        setOpen(true)
      }
    }
  }, [isSm]);

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};
