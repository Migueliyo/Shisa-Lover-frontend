import { useEffect, useState } from "react";

import { Box, useMediaQuery } from "@mui/material";

import { fetchFlavours } from "../features/flavours/slice";
import { useAppDispatch } from "../hooks/store";
import { useFlavoursActions } from "../hooks/useFlavoursActions";
import { statusActions } from "../hooks/statusActions";

import FlavourCard from "../components/FlavourCard";
import NavSection from "../components/NavSection";
import LoadingFlavours from "../components/LoadingFlavours";

const categories = [
  { name: "Dulces", imgSrc: "/src/assets/pancakes.svg" },
  { name: "Afrutados", imgSrc: "/src/assets/amoras-fruit.svg" },
  { name: "Cítricos", imgSrc: "/src/assets/orange.svg" },
  { name: "Mentolados", imgSrc: "/src/assets/mint.svg" },
  { name: "Otros", imgSrc: "/src/assets/wind-face.svg" },
];

function Flavours() {
  const [flavoursToShow] = useState(30);
  const is700 = useMediaQuery("(max-width: 700px)");
  const dispatch = useAppDispatch();
  const { flavours, statusFlavours, errorFlavours } = useFlavoursActions();
  const { PENDING_STATUS, FULLFILLED_STATUS, REJECTED_STATUS } =
    statusActions();

  useEffect(() => {
    dispatch(fetchFlavours());
  }, [dispatch]);

  return (
    <>
      <NavSection title="Sabores" categories={categories} />
      {statusFlavours === PENDING_STATUS && <LoadingFlavours rowsToShow={3} />}
      {statusFlavours === REJECTED_STATUS && <p>Error: {errorFlavours}</p>}
      {statusFlavours === FULLFILLED_STATUS && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            paddingTop: "15px",
            gap: is700 ? "3%" : "1%",
          }}
        >
          {flavours.slice(0, flavoursToShow).map((flavour) => (
            <FlavourCard
              key={flavour.id}
              id={flavour.id}
              name={flavour.flavour_name}
              brand={flavour.brand_name}
              categories={flavour.categories}
            />
          ))}
        </Box>
      )}
    </>
  );
}

export default Flavours;
