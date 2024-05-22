import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import { fetchMixes } from "../features/mixes/slice";
import { useAppDispatch } from "../hooks/store";
import { useMixesActions } from "../hooks/useMixesActions";

import Mix from "../components/Mix";
import NavSection from "../components/NavSection";

const categories = [
  { name: "Dulces", imgSrc: "src/assets/donut.svg" },
  { name: "Afrutadas", imgSrc: "src/assets/fruit.svg" },
  { name: "Cítricas", imgSrc: "src/assets/lemon.svg" },
  { name: "Mentoladas", imgSrc: "src/assets/mint.svg" },
  { name: "Otras", imgSrc: "src/assets/wind-face.svg" },
];

function Mixes() {
  const [mixesToShow] = useState(30);
  const dispatch = useAppDispatch();
  const { mixes } = useMixesActions();

  useEffect(() => {
    dispatch(fetchMixes());
  }, [dispatch]);

  return (
    <>
      <NavSection title="Mezclas" categories={categories} />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          paddingTop: "15px",
          gap: "2%",
        }}
      >
        {mixes.slice(0, mixesToShow).map((mix) => (
          <Mix
            key={mix.id}
            username={mix.username}
            name={mix.mix_name}
            categories={mix.categories}
          />
        ))}
      </Box>
    </>
  );
}

export default Mixes;
