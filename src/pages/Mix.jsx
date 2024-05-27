import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, styled } from "@mui/material";

import api from "../services/api";
import DonutChart from "../components/DonutChart";

const FormatedBox = styled(Box)(({ theme }) => {
  const commonStyles = {
    color: theme.palette.primary.main,
    width: "100%",
    height: "100%",
    // ".title-div-section": {
    //   height: "65px",
    //   border: 0,
    //   paddingBottom: 20,
    //   font: "inherit",
    //   margin: 0,
    //   verticalAlign: "baseline",
    // },
    // ".title-div-section h2": {
    //   fontFamily: '"Roobert", "Inter", Helvetica, Arial, sans-serif',
    //   border: 0,
    //   boxSizing: "border-box",
    //   margin: 0,
    //   padding: 0,
    //   verticalAlign: "baseline",
    //   fontSize: 54,
    //   lineHeight: 1.2,
    // },
    ".div-section": {
      height: "100%",
      display: "flex",
      flexDirection: "row",
    },
    ".graph-div-section": {
      position: "relative",
      width: 480,
    },
    ".graph-div-section img": {
      position: "absolute",
      width: "430px",
      top: "23.5%",
      left: 20,
    },
    ".graph-div-section svg": {
      position: "absolute",
      zIndex: 1,
      top: "25.3%",
      marginLeft: 52,
    },
    ".content-div-section": {
      width: "calc(100% - 480px)",
    },
  };

  return {
    ...commonStyles,
    //@media (max-width: 1200px)
    [theme.breakpoints.down("1200")]: {
      ...commonStyles,
      ".div-section": {
        flexDirection: "column",
      },
      ".graph-div-section": {
        width: "100%",
        height: 420,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      ".graph-div-section img": {
        position: "relative",
        width: "430px",
        top: 10,
      },
      ".graph-div-section svg": {
        position: "absolute",
        zIndex: 1,
        left: "47%",
        top: 36,
        transform: "translateX(-50%)",
      },
      ".content-div-section": {
        marginTop: 10,
        width: "100%",
      },
    },
    //@media (max-width: 1050px)
    [theme.breakpoints.down("1050")]: {
      ".graph-div-section svg": {
        left: "46.5%",
      },
    },
    //@media (max-width: 900px)
    [theme.breakpoints.down("900")]: {
      ".graph-div-section svg": {
        left: "46%",
      },
    },
    //@media (max-width: 700px)
    [theme.breakpoints.down("700")]: {
      ".graph-div-section svg": {
        left: "44.5%",
      },
    },
    //@media (max-width: 600px)
    [theme.breakpoints.down("600")]: {
      ".graph-div-section svg": {
        left: "39%",
        width: "84%",
      },
      ".graph-div-section img": {
        left: 0,
      },
    },
    //@media (max-width: 500px)
    [theme.breakpoints.down("500")]: {
      ".graph-div-section svg": {
        left: "36%",
      },
    },
    //@media (max-width: 450px)
    [theme.breakpoints.down("450")]: {
      ".graph-div-section svg": {
        left: "35%",
      },
    },
    //@media (max-width: 420px)
    [theme.breakpoints.down("420")]: {
      ".graph-div-section svg": {
        left: "33%",
      },
    },
    //@media (max-width: 375px)
    [theme.breakpoints.down("375")]: {
      ".graph-div-section svg": {
        left: "30%",
      },
    },
    //@media (max-width: 340px)
    [theme.breakpoints.down("340")]: {
      ".graph-div-section svg": {
        left: "28%",
        width: "90%",
      },
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
          <Box className="div-section">
            <Box className="graph-div-section">
              <DonutChart flavours={mix.flavours} />
              <img src="/src/assets/cazoleta.png" />
            </Box>
            <Box className="content-div-section">
              <h1>{mix.mix_name}</h1>
            </Box>
          </Box>
        </Box>
      )}
    </FormatedBox>
  );
}

export default Mix;
