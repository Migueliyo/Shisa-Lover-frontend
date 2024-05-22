import { Box, Typography, styled } from "@mui/material";

const FormatedBox = styled(Box)(({ theme }) => {
  const commonStyles = {
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
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      marginBottom: 20,
      gap: 10,
    },
    ".explorer-div-section-category": {
      width: "100%",
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
    ".explorer-div-section-category-content-text": {
      marginLeft: 10,
    },
    ".explorer-div-section-category-content-image": {
      marginRight: 5,
      width: 75,
      height: 75,
    },
    ".explorer-div-section-category-content-image img": {
      width: "100%",
      height: "100%",
      display: "block",
      filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))",
    },
    ".content-div-section": {
      display: "flex",
      flexWrap: "wrap",
      paddingTop: 10,
    },
  };

  return {
    ...commonStyles,
    //@media (max-width: 1600px)
    [theme.breakpoints.down("1350")]: {
      ...commonStyles,
      ".explorer-div-section": {
        gridTemplateColumns: "repeat(4, 1fr)",
      },
    },
    //@media (max-width: 1000px)
    [theme.breakpoints.down("1000")]: {
      ...commonStyles,
      ".explorer-div-section": {
        gridTemplateColumns: "repeat(3, 1fr)",
      },
    },
    //@media (max-width: 800px)
    [theme.breakpoints.down("800")]: {
      ...commonStyles,
      ".explorer-div-section": {
        gridTemplateColumns: "repeat(2, 1fr)",
      },
    },
    //@media (max-width: 600px)
    [theme.breakpoints.down("600")]: {
      ...commonStyles,
      ".explorer-div-section": {
        gridTemplateColumns: "repeat(1, 1fr)",
      },
    },
  };
});

const Category = ({ name, imgSrc }) => (
  <Box className="explorer-div-section-category">
    <a href="">
      <Box className="explorer-div-section-category-content">
        <Box className="explorer-div-section-category-content-text">
          <Typography
            sx={{ fontSize: "24px", lineHeight: "22px", fontWeight: "bolder" }}
          >
            {name}
          </Typography>
        </Box>
        <Box className="explorer-div-section-category-content-image">
          <img src={imgSrc} alt={name} />
        </Box>
      </Box>
    </a>
  </Box>
);

const NavSection = ({ title, categories }) => (
  <FormatedBox>
    <Box className="title-div-section">
      <h2>{title}</h2>
    </Box>
    <Box className="explorer-div-section">
      {categories.map((category) => (
        <Category key={category.name} {...category} />
      ))}
    </Box>
  </FormatedBox>
);

export default NavSection;
