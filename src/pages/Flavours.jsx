import { useEffect, useState } from "react";

import { Box, styled } from "@mui/material";

import { fetchFlavours } from "../features/flavours/slice";
import { useAppDispatch } from "../hooks/store";
import { useFlavoursActions } from "../hooks/useFlavoursActions";

import Flavour from "../components/Flavour";

const FormatedBox = styled(Box)(({ theme }) => {
  return {
    color: theme.palette.primary.main,
    width: "100%",
    ".title-div-section": {
      border: 0,
      paddingBottom: 10,
      font: "inherit",
      margin: 0,
      verticalAlign: "baseline",
    },
    ".title-div-section h2": {
      fontFamily: '"Roobert", "Inter", Helvetica, Arial, sans-serif',
      border: 0,
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
      verticalAlign: "baseline",
      fontWeight: 600,
      fontSize: 20,
      lineHeight: 1.2,
    },
    ".content-div-section": {
      display: "flex",
      flexWrap: "wrap",
      paddingTop: 10,
    },
  };
});

function Flavours() {
  const [flavoursToShow, ] = useState(30);
  const dispatch = useAppDispatch();
  const { flavours,  } = useFlavoursActions();

  useEffect(() => {
    dispatch(fetchFlavours());
  }, [dispatch]);

  return (
    <FormatedBox>
      <Box className="title-div-section">
        <h2>Tabacos</h2>
      </Box>
      <Box
        className="content-div-section"
        style={{
          gap: "1%",
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
    </FormatedBox>
  );
}

export default Flavours;
