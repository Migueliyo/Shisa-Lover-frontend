import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import EntryCard from "../components/EntryCard";

function Entry() {
  const { id } = useParams();
  const [entry, setEntry] = useState(undefined);

  const getEntry = async (id) => {
    const response = await api.getEntriesById(id);
    if (!response.error) {
      setEntry(response.data);
    } else {
      console.error(response.message);
    }
  };

  useEffect(() => {
    getEntry(id);
  }, [id]);

  return (
    <Box>
      {entry && (
        <EntryCard
          key={entry.id}
          id={entry.id}
          username={entry.username}
          title={entry.entry_title}
          description={entry.description}
          categories={entry.categories}
        />
      )}
    </Box>
  );
}

export default Entry;
