import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import { fetchEntries } from "../features/entries/slice";
import { useAppDispatch } from "../hooks/store";
import { useEntriesActions } from "../hooks/useEntriesActions";

import DiscussionEntry from "../components/DiscussionEntry";
import NavSection from "../components/NavSection";

const categories = [
  { name: "Consejos", imgSrc: "src/assets/writing.svg" },
  { name: "Limpieza", imgSrc: "src/assets/clean-hand.svg" },
  { name: "Mezclas", imgSrc: "src/assets/mixer.svg" },
  { name: "Lugares", imgSrc: "src/assets/world.svg" },
  { name: "Otras", imgSrc: "src/assets/wind-face.svg" },
];

function Entries() {
  const [entriesToShow] = useState(16);
  const dispatch = useAppDispatch();
  const { entries } = useEntriesActions();

  useEffect(() => {
    dispatch(fetchEntries());
  }, [dispatch]);

  return (
    <>
      <NavSection title="Entradas" categories={categories} />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          paddingTop: "15px",
          gap: "2%",
        }}
      >
        {entries.slice(0, entriesToShow).map((entry) => (
          <DiscussionEntry
            key={entry.id}
            username={entry.username}
            title={entry.entry_title}
            description={entry.description}
            categories={entry.categories}
          />
        ))}
      </Box>
    </>
  );
}

export default Entries;
