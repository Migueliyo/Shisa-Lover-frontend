import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, styled } from "@mui/material";

import api from "../services/api";
import RingChart from "../components/RingChart";

const FormatedBox = styled(Box)(({ theme }) => {
  const commonStyles = {
    color: theme.palette.primary.main,
    width: "100%",
    height: "100%",
    ".title-div-section": {
      height: "65px",
      border: 0,
      paddingBottom: 20,
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
      fontSize: 54,
      lineHeight: 1.2,
    },
    ".graph-div-section": {
      width: "30%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
  };

  return {
    ...commonStyles,
    //@media (max-width: 1600px)
    [theme.breakpoints.down("1350")]: {
      ...commonStyles,
    },
    //@media (max-width: 1000px)
    [theme.breakpoints.down("1000")]: {
      ...commonStyles,
    },
  };
});

function Mix() {
  const { id } = useParams();
  const [mix, setMix] = useState(undefined);

  const getMix = async (id) => {
    const response = await api.getMixById(id);
    if (!response.error) {
      setMix(response.data);
    } else {
      console.error(response.message);
    }
  };

  useEffect(() => {
    getMix(id);
  }, [id]);

  return (
    <FormatedBox>
      {mix && (
        <Box sx={{ height: "100%", width: "100%" }}>
          <Box sx={{ height: "100%", display: "flex", flexDirection: "row" }}>
            <Box className="graph-div-section">
              <RingChart flavours={mix.flavours}/>
            </Box>
            <Box className="content-div-section">
              {mix.mix_name}
            </Box>
          </Box>
        </Box>
      )}
    </FormatedBox>
  );
}

export default Mix;
