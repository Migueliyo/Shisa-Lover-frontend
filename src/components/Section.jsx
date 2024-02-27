import styled from "@emotion/styled";

import { Box } from "@mui/material";

import Mix from "./Mix";

const FormatedBox = styled(Box)(({ theme }) => {
  const commonStyles = {
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
      fontFamily: "\"Roobert\", \"Inter\", Helvetica, Arial, sans-serif",
      border: 0,
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
      verticalAlign: "baseline",
      fontWeight: 600,
      fontSize: 20,
      lineHeight: 1.2,
    },
    ".a-section": {
      color: theme.palette.section.a.main,
      textDecoration: "none",
    },
    ".a-section: hover": {
      color: theme.palette.section.a.hover,
      textDecoration: "underline",
    },
    ".content-div-section": {
      display: "flex",
      flexWrap: "nowrap"
    },
  };

  return {
    ...commonStyles,
    //@media (max-width: 1100px)
    [theme.breakpoints.down("1100")]: {
      ...commonStyles,
    },
    //@media (max-width: 600px)
    [theme.breakpoints.down("sm")]: {
      ...commonStyles,
    },
  };
});

let categories = ["Afrutada" , "Dulce"]

function Section() {
  return (
    <FormatedBox>
      <Box className="title-div-section">
        <h2>
          <a className="a-section" href="/mezclas">
            Mezclas
          </a>{" "}
          interesantes
        </h2>
      </Box>
      <Box className="content-div-section">
        <Mix username="migueliyo" description="Mezcla afrutada y muy dulce" categories={categories}/>
      </Box>
    </FormatedBox>
  );
}
export default Section;
