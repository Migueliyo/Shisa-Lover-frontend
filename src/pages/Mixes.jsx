import { useEffect, useState } from "react";

import { Box, styled } from "@mui/material";

import { fetchMixes } from "../features/mixes/slice";
import { useAppDispatch } from "../hooks/store";
import { useMixesActions } from "../hooks/useMixesActions";

import Mix from "../components/Mix";

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

function Mixes() {
  const [mixesToShow, ] = useState(30);
  const dispatch = useAppDispatch();
  const { mixes, } = useMixesActions();

  useEffect(() => {
    dispatch(fetchMixes());
  }, [dispatch]);

  return (
    <FormatedBox>
      <Box className="title-div-section">
        <h2>Mezclas</h2>
      </Box>
      <Box
        className="content-div-section"
        style={{
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
    </FormatedBox>
  );
}

export default Mixes;
