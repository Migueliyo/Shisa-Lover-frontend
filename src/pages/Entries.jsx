import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import { fetchEntries } from "../features/entries/slice";
import { useAppDispatch } from "../hooks/store";
import { useEntriesActions } from "../hooks/useEntriesActions";
import { statusActions } from "../hooks/statusActions";

import EntryCard from "../components/EntryCard";
import NavSection from "../components/NavSection";
import LoadingEntries from "../components/LoadingEntries";

const categories = [
  { name: "Consejos", imgSrc: "/src/assets/writing.svg" },
  { name: "Limpieza", imgSrc: "/src/assets/clean-hand.svg" },
  { name: "Mezclas", imgSrc: "/src/assets/mixer.svg" },
  { name: "Lugares", imgSrc: "/src/assets/world.svg" },
  { name: "Otras", imgSrc: "/src/assets/wind-face.svg" },
];

function Entries() {
  const [entriesToShow] = useState(16);
  const dispatch = useAppDispatch();
  const { entries, statusEntries, errorEntries } = useEntriesActions();
  const { PENDING_STATUS, FULLFILLED_STATUS, REJECTED_STATUS } =
    statusActions();

  useEffect(() => {
    dispatch(fetchEntries());
  }, [dispatch]);

  return (
    <>
      <NavSection title="Entradas" categories={categories} />
      {statusEntries === PENDING_STATUS && <LoadingEntries rowsToShow={3} />}
      {statusEntries === REJECTED_STATUS && <p>Error: {errorEntries}</p>}
      {statusEntries === FULLFILLED_STATUS && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            paddingTop: "15px",
            gap: "2%",
          }}
        >
          {entries.slice(0, entriesToShow).map((entry) => (
            <EntryCard
              key={entry.id}
              id={entry.id}
              username={entry.username}
              title={entry.entry_title}
              description={entry.description}
              categories={entry.categories}
            />
          ))}
        </Box>
      )}
    </>
  );
}

export default Entries;
