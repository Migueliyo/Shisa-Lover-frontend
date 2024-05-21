import { useEffect, useState } from "react";
import { Box, Typography, styled } from "@mui/material";
import { fetchMixes } from "../features/mixes/slice";
import { useAppDispatch } from "../hooks/store";
import { useMixesActions } from "../hooks/useMixesActions";
import Mix from "../components/Mix";

const FormatedBox = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  width: "100%",
  ".title-div-section": {
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
  ".explorer-div-section": {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    marginBottom: 20,
    gap: 10,
  },
  ".explorer-div-section-category": {
    border: "0.1px solid transparent",
    borderRadius: "4px",
    color: "#ffffff",
    backgroundPosition: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundColor: theme.palette.appbar.register.main,
  },
  ".explorer-div-section-category a": {
    textDecoration: "none",
    color: "inherit",
    width: "100%",
    display: "block",
  },
  ".explorer-div-section-category a:hover": {
    backgroundColor: theme.palette.appbar.register.hover,
  },
  ".explorer-div-section-category-content": {
    height: "45px",
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  ".explorer-div-section-category-content-text":{
    marginLeft: 10
  },
  ".explorer-div-section-category-content-image":{
    marginRight: 5
  },
  ".content-div-section": {
    display: "flex",
    flexWrap: "wrap",
    paddingTop: 10,
  },
}));

const categories = [
  { name: "Dulces", imgSrc: "src/assets/wind-face.svg" },
  { name: "Afrutadas", imgSrc: "src/assets/wind-face.svg" },
  { name: "Cítricas", imgSrc: "src/assets/wind-face.svg" },
  { name: "Mentoladas", imgSrc: "src/assets/wind-face.svg" },
  { name: "Otras", imgSrc: "src/assets/wind-face.svg" },
];

const Category = ({ name, imgSrc }) => (
  <Box className="explorer-div-section-category">
    <a href="">
      <Box className="explorer-div-section-category-content">
        <Box className="explorer-div-section-category-content-text">
          <Typography sx={{ fontSize: "24px", lineHeight: "22px", fontWeight: "bolder" }}>
            {name}
          </Typography>
        </Box>
        <Box className="explorer-div-section-category-content-image">
          <img style={{ width: 60, height: 60 }} src={imgSrc} alt={name} />
        </Box>
      </Box>
    </a>
  </Box>
);

function Mixes() {
  const [mixesToShow] = useState(30);
  const dispatch = useAppDispatch();
  const { mixes } = useMixesActions();

  useEffect(() => {
    dispatch(fetchMixes());
  }, [dispatch]);

  return (
    <FormatedBox>
      <Box className="title-div-section">
        <h2>Mezclas</h2>
      </Box>
      <Box className="explorer-div-section">
        {categories.map((category) => (
          <Category key={category.name} {...category} />
        ))}
      </Box>
      <Box className="content-div-section" style={{ gap: "2%" }}>
        {mixes.slice(0, mixesToShow).map((mix) => (
          <Mix key={mix.id} username={mix.username} name={mix.mix_name} categories={mix.categories} />
        ))}
      </Box>
    </FormatedBox>
  );
}

export default Mixes;
