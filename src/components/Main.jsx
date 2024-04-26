import { useContext, useEffect } from "react";

import styled from "@emotion/styled";

import { Box } from "@mui/material";

import { DrawerContext } from "../context/drawerContext";
import { appBarHeight } from "./AppBar";
import Section from "./Section";

import { useAppDispatch } from "../hooks/store";
import { fetchMixes } from "../store/mixes/slice";
import { fetchFlavours } from "../store/flavours/slice";
import { fetchEntries } from "../store/entries/slice";
import { useMixesActions } from "../hooks/useMixesActions";
import { useFlavoursActions } from "../hooks/useFlavoursActions";
import { useEntriesActions } from "../hooks/useEntriesActions";

const FormatedBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  return {
    width: "100%",
    height: `calc(100% - ${appBarHeight + 25}px)`, // El resultado de la altura del appbar y el paddingTop
    overflowY: "auto",
    marginTop: appBarHeight,
    marginLeft: open ? "320px" : theme.spacing(7),
    backgroundColor: theme.palette.secondary.main,
    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 25,
  };
});

function Main() {
  const { open } = useContext(DrawerContext);
  const dispatch = useAppDispatch();
  const { mixes, statusMixes, errorMixes } = useMixesActions();
  const { flavours, statusFlavours, errorFlavours } = useFlavoursActions();
  const { entries, statusEntries, errorEntries } = useEntriesActions();

  useEffect(() => {
    dispatch(fetchMixes());
    dispatch(fetchFlavours());
    dispatch(fetchEntries());
  }, [dispatch]);

  return (
    <FormatedBox open={open}>
      {statusMixes === "loading" && <h1>Loading...</h1>}
      {statusMixes === "failed" && <p>Error: {errorMixes}</p>}
      {statusMixes === "succeeded" && (
        <Section
          featuredWordTittle="Mezclas"
          tittle="destacadas"
          content="mix"
          data={mixes}
        />
      )}
      {statusFlavours === "loading" && <h1>Loading...</h1>}
      {statusFlavours === "failed" && <p>Error: {errorFlavours}</p>}
      {statusFlavours === "succeeded" && (
        <Section
          featuredWordTittle="Sabores"
          tittle="recien traídos al mercado"
          content="flavour"
          data={flavours}
        />
      )}
      {statusEntries === "loading" && <h1>Loading...</h1>}
      {statusEntries === "failed" && <p>Error: {errorEntries}</p>}
      {statusEntries === "succeeded" && (
        <Section
          featuredWordTittle="Entradas"
          tittle="destacadas de nuestro foro de debate"
          content="discussionEntry"
          data={entries}
        />
      )}
    </FormatedBox>
  );
}
export default Main;
