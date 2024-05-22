import { useEffect, useState } from "react";

import { Box, useMediaQuery } from "@mui/material";

import { fetchFlavours } from "../features/flavours/slice";
import { useAppDispatch } from "../hooks/store";
import { useFlavoursActions } from "../hooks/useFlavoursActions";

import Flavour from "../components/Flavour";
import NavSection from "../components/NavSection";

const categories = [
  { name: "Dulces", imgSrc: "src/assets/pancakes.svg" },
  { name: "Afrutados", imgSrc: "src/assets/amoras-fruit.svg" },
  { name: "Cítricos", imgSrc: "src/assets/orange.svg" },
  { name: "Mentolados", imgSrc: "src/assets/mint.svg" },
  { name: "Otros", imgSrc: "src/assets/wind-face.svg" },
];

function Flavours() {
  const [flavoursToShow] = useState(30);
  const is700 = useMediaQuery("(max-width: 700px)");
  const dispatch = useAppDispatch();
  const { flavours } = useFlavoursActions();

  useEffect(() => {
    dispatch(fetchFlavours());
  }, [dispatch]);

  return (
    <>
      <NavSection title="Sabores" categories={categories} />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          paddingTop: "15px",
          gap: is700 ? "3%" : "1%",
        }}
      >
        {flavours.slice(0, flavoursToShow).map((flavour) => (
          <Flavour
            key={flavour.id}
            name={flavour.flavour_name}
            brand={flavour.brand_name}
            categories={flavour.categories}
          />
        ))}
      </Box>
    </>
  );
}

export default Flavours;
