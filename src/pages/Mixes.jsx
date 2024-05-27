import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import { fetchMixes } from "../features/mixes/slice";
import { useAppDispatch } from "../hooks/store";
import { useMixesActions } from "../hooks/useMixesActions";
import { statusActions } from "../hooks/statusActions";

import MixCard from "../components/MixCard";
import NavSection from "../components/NavSection";
import LoadingMixes from "../components/LoadingMixes";

const categories = [
  { name: "Dulces", imgSrc: "/src/assets/donut.svg" },
  { name: "Afrutadas", imgSrc: "/src/assets/fruit.svg" },
  { name: "Cítricas", imgSrc: "/src/assets/lemon.svg" },
  { name: "Mentoladas", imgSrc: "/src/assets/mint.svg" },
  { name: "Otras", imgSrc: "/src/assets/wind-face.svg" },
];

function Mixes() {
  const [mixesToShow] = useState(30);
  const dispatch = useAppDispatch();
  const { mixes, statusMixes, errorMixes } = useMixesActions();
  const { PENDING_STATUS, FULLFILLED_STATUS, REJECTED_STATUS } =
    statusActions();

  useEffect(() => {
    dispatch(fetchMixes());
  }, [dispatch]);

  return (
    <>
      <NavSection title="Mezclas" categories={categories} />
      {statusMixes === PENDING_STATUS && <LoadingMixes rowsToShow={6} />}
      {statusMixes === REJECTED_STATUS && <p>Error: {errorMixes}</p>}
      {statusMixes === FULLFILLED_STATUS && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            paddingTop: "15px",
            gap: "2%",
          }}
        >
          {mixes.slice(0, mixesToShow).map((mix) => (
            <MixCard
              key={mix.id}
              id={mix.id}
              username={mix.username}
              name={mix.mix_name}
              categories={mix.categories}
            />
          ))}
        </Box>
      )}
    </>
  );
}

export default Mixes;
