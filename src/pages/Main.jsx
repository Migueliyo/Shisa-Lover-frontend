import { useEffect } from "react";

import Section from "../components/Section";

import { useAppDispatch } from "../hooks/store";
import { useMixesActions } from "../hooks/useMixesActions";
import { useFlavoursActions } from "../hooks/useFlavoursActions";
import { useEntriesActions } from "../hooks/useEntriesActions";
import { statusActions } from "../hooks/statusActions";
import { fetchMixes } from "../features/mixes/slice";
import { fetchFlavours } from "../features/flavours/slice";
import { fetchEntries } from "../features/entries/slice";

import LoadingMixes from "../components/LoadingMixes";
import LoadingFlavours from "../components/LoadingFlavours";
import LoadingEntries from "../components/LoadingEntries";

function Main() {
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
    <>
      {statusMixes === PENDING_STATUS && <LoadingMixes rowsToShow={2} />}
      {statusMixes === REJECTED_STATUS && <p>Error: {errorMixes}</p>}
      {statusMixes === FULLFILLED_STATUS && (
        <Section
          featuredWordTittle="Mezclas"
          tittle="destacadas"
          content="mix"
          data={mixes}
        />
      )}
      {statusFlavours === PENDING_STATUS && <LoadingFlavours rowsToShow={1} />}
      {statusFlavours === REJECTED_STATUS && <p>Error: {errorFlavours}</p>}
      {statusFlavours === FULLFILLED_STATUS && (
        <Section
          featuredWordTittle="Sabores"
          tittle="recien traídos al mercado"
          content="flavour"
          data={flavours}
        />
      )}
      {statusEntries === PENDING_STATUS && <LoadingEntries rowsToShow={1} />}
      {statusEntries === REJECTED_STATUS && <p>Error: {errorEntries}</p>}
      {statusEntries === FULLFILLED_STATUS && (
        <Section
          featuredWordTittle="Entradas"
          tittle="destacadas de nuestro foro de debate"
          content="discussionEntry"
          data={entries}
        />
      )}
    </>
  );
}
export default Main;
