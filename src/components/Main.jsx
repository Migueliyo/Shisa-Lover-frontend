import { useContext, useEffect } from "react";

import styled from "@emotion/styled";

import { Box } from "@mui/material";

import { DrawerContext } from "../context/drawerContext";
import { appBarHeight } from "./AppBar";
import Section from "./Section";

import { useAppDispatch } from "../hooks/store";
import { useMixesActions } from "../hooks/useMixesActions";
import { useFlavoursActions } from "../hooks/useFlavoursActions";
import { useEntriesActions } from "../hooks/useEntriesActions";
import { statusActions } from "../hooks/statusActions";
import { fetchMixes } from "../features/mixes/slice";
import { fetchFlavours } from "../features/flavours/slice";
import { fetchEntries } from "../features/entries/slice";

import LoadingMixes from "./LoadingMixes";
import LoadingFlavours from "./LoadingFlavours";
import LoadingEntries from "./LoadingEntries";

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
  const { PENDING_STATUS, FULLFILLED_STATUS, REJECTED_STATUS } = statusActions();

  useEffect(() => {
    dispatch(fetchMixes());
    dispatch(fetchFlavours());
    dispatch(fetchEntries());
  }, [dispatch]);

  return (
    <FormatedBox open={open}>
      {statusMixes === PENDING_STATUS && <LoadingMixes open={open} />}
      {statusMixes === REJECTED_STATUS && <p>Error: {errorMixes}</p>}
      {statusMixes === FULLFILLED_STATUS && (
        <Section
          featuredWordTittle="Mezclas"
          tittle="destacadas"
          content="mix"
          data={mixes}
        />
      )}
      {statusFlavours === PENDING_STATUS && <LoadingFlavours open={open} />}
      {statusFlavours === REJECTED_STATUS && <p>Error: {errorFlavours}</p>}
      {statusFlavours === FULLFILLED_STATUS && (
        <Section
          featuredWordTittle="Sabores"
          tittle="recien traídos al mercado"
          content="flavour"
          data={flavours}
        />
      )}
      {statusEntries === PENDING_STATUS && <LoadingEntries />}
      {statusEntries === REJECTED_STATUS && <p>Error: {errorEntries}</p>}
      {statusEntries === FULLFILLED_STATUS && (
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
