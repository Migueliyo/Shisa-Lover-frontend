import { useContext } from "react";
import styled from "@emotion/styled";

import { Box } from "@mui/material";

import { DrawerContext } from "./drawerContext";
import { appBarHeight } from "./AppBar";
import Section from "./Section";

const FormatedBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  return {
    width: "100%",
    height: `calc(100% - ${appBarHeight + 25}px)`, // El resultado de la altura del appbar y el paddingTop
    overflowY: "auto",
    marginTop: appBarHeight,
    marginLeft: open ? "20%" : theme.spacing(7),
    backgroundColor: theme.palette.secondary.main,
    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 25,
  };
});

function Main() {
  const { open } = useContext(DrawerContext);

  return (
    <FormatedBox open={open}>
      <Section 
        featuredWordTittle="Mezclas" 
        tittle="destacadas" 
        content="mix" />
      <Section
        featuredWordTittle="Sabores"
        tittle="recien traídos al mercado"
        content="tobacco" />
      <Section
        featuredWordTittle="Entradas"
        tittle="destacadas de nuestro foro de debate"
        content="discussionEntry" />
    </FormatedBox>
  );
}
export default Main;
